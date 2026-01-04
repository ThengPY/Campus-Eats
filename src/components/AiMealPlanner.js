import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AiMealPlanner.css';

const AiMealPlanner = ({ isOpen, onClose, cafeterias, foodItems, onAddToCart }) => {
  if (!isOpen) return null;

  const [cafeteria, setCafeteria] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [preferences, setPreferences] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [userHistory, setUserHistory] = useState([]);

  // Fetch user order history
  useEffect(() => {
    if (isOpen) {
      const username = localStorage.getItem('username');
      if (username) {
        fetch(`http://localhost:5000/orders/${username}`)
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              setUserHistory(data.orders);
            }
          })
          .catch(error => console.error('Error:', error));
      }
    }
  }, [isOpen]);

  const parsePriceRange = (priceRange) => {
    if (priceRange === "") return [0, Infinity];
    const [minPrice, maxPrice] = priceRange.split("-").map(parseFloat);
    return [minPrice, maxPrice];
  };

  // Analyze order history to find favorite food/drink TYPES
  const analyzeFoodPreferences = () => {
    if (userHistory.length === 0) return { foodTypes: [], drinkTypes: [], hasHistory: false };
    
    const foodTypeFrequency = {};
    const drinkTypeFrequency = {};
    
    userHistory.forEach(order => {
      if (order.order_item) {
        const items = order.order_item.split(', ');
        items.forEach(item => {
          // Clean up the item name - get the base food type
          const cleanItem = item.split(' (')[0].trim().toLowerCase();
          
          // Check if it's likely a drink or food
          const isDrink = cleanItem.includes('tea') || 
                          cleanItem.includes('kopi') || 
                          cleanItem.includes('milo') || 
                          cleanItem.includes('juice') || 
                          cleanItem.includes('air') || 
                          cleanItem.includes('sirap') || 
                          cleanItem.includes('limau') || 
                          cleanItem.includes('ais') ||
                          cleanItem.includes('latte') ||
                          cleanItem.includes('mocha') ||
                          cleanItem.includes('cappuccino');
          
          // Remove common words to get base type
          const baseType = cleanItem
            .replace('nasi ', '')
            .replace('mee ', '')
            .replace('maggie ', '')
            .replace('roti ', '')
            .replace('teh ', '')
            .replace('kopi ', '')
            .replace('milo ', '')
            .replace('air ', '')
            .replace('sirap ', '')
            .trim();
          
          if (isDrink) {
            drinkTypeFrequency[baseType] = (drinkTypeFrequency[baseType] || 0) + 1;
          } else {
            foodTypeFrequency[baseType] = (foodTypeFrequency[baseType] || 0) + 1;
          }
        });
      }
    });
    
    // Get top food types (remove empty strings and get unique types)
    const foodTypes = Object.entries(foodTypeFrequency)
      .filter(([type]) => type.length > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type]) => type);
    
    // Get top drink types
    const drinkTypes = Object.entries(drinkTypeFrequency)
      .filter(([type]) => type.length > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type]) => type);
    
    return { 
      foodTypes: [...new Set(foodTypes)], // Remove duplicates
      drinkTypes: [...new Set(drinkTypes)],
      hasHistory: userHistory.length > 0 
    };
  };

  // Find items of similar type across different cafeterias
  const findSimilarItems = (preferredTypes, itemsList, cafeteriaId, minPrice, maxPrice, preferenceFilter) => {
    // First, try to find exact matches of preferred types
    for (const type of preferredTypes) {
      const matchingItems = itemsList.filter(item => 
        item.name.toLowerCase().includes(type) &&
        item.price >= minPrice &&
        item.price <= maxPrice &&
        (preferenceFilter === "" || 
         (preferenceFilter === "Vege" && item.type === "Vege") ||
         (preferenceFilter === "Nonvege" && item.type === "NonVege") ||
         item.type === preferenceFilter)
      );
      
      if (matchingItems.length > 0) {
        return matchingItems[Math.floor(Math.random() * matchingItems.length)];
      }
    }
    
    // If no exact matches, try partial matches
    for (const type of preferredTypes) {
      const partialMatches = itemsList.filter(item => 
        type.includes(item.name.toLowerCase().split(' ')[0]) || // Check if type starts with item name
        item.name.toLowerCase().split(' ').some(word => type.includes(word)) &&
        item.price >= minPrice &&
        item.price <= maxPrice &&
        (preferenceFilter === "" || 
         (preferenceFilter === "Vege" && item.type === "Vege") ||
         (preferenceFilter === "Nonvege" && item.type === "NonVege") ||
         item.type === preferenceFilter)
      );
      
      if (partialMatches.length > 0) {
        return partialMatches[Math.floor(Math.random() * partialMatches.length)];
      }
    }
    
    // If no matches found, return random item
    const filteredItems = itemsList.filter(item => 
      item.price >= minPrice &&
      item.price <= maxPrice &&
      (preferenceFilter === "" || 
       (preferenceFilter === "Vege" && item.type === "Vege") ||
       (preferenceFilter === "Nonvege" && item.type === "NonVege") ||
       item.type === preferenceFilter)
    );
    
    return filteredItems.length > 0 
      ? filteredItems[Math.floor(Math.random() * filteredItems.length)]
      : { name: `No available ${itemsList[0]?.type === "NonVege" || itemsList[0]?.type === "Vege" ? "food" : "drink"}` };
  };

  const generateMealPlan = () => {
    const plan = {};
    const cafeteriaId = cafeteria === "" ? null : parseInt(cafeteria, 10);
    const [minPrice, maxPrice] = parsePriceRange(priceRange);
    
    // Get user's preferred food/drink types
    const { foodTypes, drinkTypes, hasHistory } = analyzeFoodPreferences();
    
    console.log("User's preferred food types:", foodTypes);
    console.log("User's preferred drink types:", drinkTypes);

    if (cafeteriaId === null) {
      // Recommend from ALL cafeterias
      cafeterias.forEach((cafeteria) => {
        const currentCafeteriaId = cafeteria.id;
        const cafeteriaData = foodItems[currentCafeteriaId];
        
        if (!cafeteriaData) return;
        
        // Find food based on preferred types
        const recommendedFood = findSimilarItems(
          foodTypes,
          cafeteriaData.food,
          currentCafeteriaId,
          minPrice,
          maxPrice,
          preferences
        );
        
        // Find drink based on preferred types
        const recommendedDrink = findSimilarItems(
          drinkTypes,
          cafeteriaData.drinks,
          currentCafeteriaId,
          minPrice,
          maxPrice,
          "" // No dietary preference for drinks
        );
        
        plan[currentCafeteriaId] = {
          name: cafeteria.name,
          food: recommendedFood,
          drink: recommendedDrink,
          isBasedOnHistory: hasHistory && 
            (foodTypes.some(type => recommendedFood.name.toLowerCase().includes(type)) ||
             drinkTypes.some(type => recommendedDrink.name.toLowerCase().includes(type)))
        };
      });
    } else {
      // Specific cafeteria selected
      const cafeteriaData = foodItems[cafeteriaId];
      if (!cafeteriaData) return;
      
      const cafeteriaName = cafeterias.find((c) => c.id === cafeteriaId).name;
      
      // Find food based on preferred types
      const recommendedFood = findSimilarItems(
        foodTypes,
        cafeteriaData.food,
        cafeteriaId,
        minPrice,
        maxPrice,
        preferences
      );
      
      // Find drink based on preferred types
      const recommendedDrink = findSimilarItems(
        drinkTypes,
        cafeteriaData.drinks,
        cafeteriaId,
        minPrice,
        maxPrice,
        ""
      );
      
      plan[cafeteriaId] = {
        name: cafeteriaName,
        food: recommendedFood,
        drink: recommendedDrink,
        isBasedOnHistory: hasHistory && 
          (foodTypes.some(type => recommendedFood.name.toLowerCase().includes(type)) ||
           drinkTypes.some(type => recommendedDrink.name.toLowerCase().includes(type)))
      };
    }
    
    console.log("Generated Meal Plan:", plan);
    setMealPlan(plan);
  };

  const handleAddToCartLocal = (item, cafeteriaId) => {
    const numericCafeteriaId = parseInt(cafeteriaId, 10);
    const cafeteria = cafeterias.find(c => c.id === numericCafeteriaId);

    if (!cafeteria) {
      console.log("Cafeteria not found for ID:", cafeteriaId);
      return;
    }

    if (item.name === "No available food" || item.name === "No available drink") {
      toast.error(`${item.name}`, {
        position: "top-left",
        autoClose: 1500,
      });
      return;
    }

    onAddToCart(item, numericCafeteriaId);
  };

  // Get user preferences
  const { foodTypes, drinkTypes, hasHistory } = analyzeFoodPreferences();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn">
          <span className="material-symbols-rounded" onClick={onClose}>
            close
          </span>
        </div>
        <h2>AI Meal Planner</h2>
        
        <div className="mealplanner-div">
          {/* Show user's food/drink preferences */}
          {hasHistory && (foodTypes.length > 0 || drinkTypes.length > 0) && (
            <div style={{ 
              backgroundColor: "#f0f8ff", 
              padding: "10px", 
              borderRadius: "8px", 
              marginBottom: "15px",
              fontSize: "13px"
            }}>
              <p style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "#2E7D32" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "16px", verticalAlign: "middle", marginRight: "5px" }}>
                  restaurant
                </span>
                We've analyzed your {userHistory.length} past orders!
              </p>
              
              {foodTypes.length > 0 && (
                <p style={{ margin: "0 0 5px 0", color: "#555" }}>
                  <b>Favorite food types:</b> {foodTypes.slice(0, 3).map(type => 
                    <span key={type} style={{ 
                      backgroundColor: "#FFCB59", 
                      padding: "2px 6px", 
                      borderRadius: "10px", 
                      margin: "0 5px 0 0",
                      fontSize: "12px",
                      display: "inline-block"
                    }}>
                      {type}
                    </span>
                  )}
                </p>
              )}
              
              {drinkTypes.length > 0 && (
                <p style={{ margin: 0, color: "#555" }}>
                  <b>Favorite drink types:</b> {drinkTypes.slice(0, 3).map(type => 
                    <span key={type} style={{ 
                      backgroundColor: "#4FC3F7", 
                      padding: "2px 6px", 
                      borderRadius: "10px", 
                      margin: "0 5px 0 0",
                      fontSize: "12px",
                      color: "white",
                      display: "inline-block"
                    }}>
                      {type}
                    </span>
                  )}
                </p>
              )}
            </div>
          )}

          <p style={{ fontSize: "15px", color: "black", marginBottom: "20px" }}>
            {hasHistory 
              ? "We'll recommend your favorite types of food/drinks from different cafeterias!"
              : "Don't know what to eat? Let our AI Meal Planner decide for you!"}
          </p>

          <label>
            Select Cafeteria:
            <select
              value={cafeteria}
              onChange={(e) => setCafeteria(e.target.value)}
              className="select"
            >
              <option value="">Any (Explore all cafeterias)</option>
              {cafeterias.map((cafeteria) => (
                <option key={cafeteria.id} value={cafeteria.id}>
                  {cafeteria.name}
                </option>
              ))}
            </select>
          </label>

          <label style={{ marginTop: "10px" }}>
            Food & Drinks Price Range:
            <select className="select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Any</option>
              <option value="0-3">Affordable (RM 0 - RM 3)</option>
              <option value="0-5">Budget (RM 0 - RM 5)</option>
              <option value="0-8">Mid-range (RM 0 - RM 8)</option>
              <option value="0-10">Premium (RM 0 - RM 10)</option>
            </select>
          </label>

          <label style={{ marginTop: "10px" }}>
            Dietary Preferences:
            <select className="select"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Vege">Vegetarian</option>
              <option value="Nonvege">Non-Vegetarian</option>
            </select>
          </label>

          <button className="generate-meal-plan-btn"
            style={{ 
              marginBottom: "20px", 
              marginTop: "20px", 
              backgroundColor: hasHistory ? "#2E7D32" : "#FFCB59", 
              width: "100%" 
            }}
            onClick={generateMealPlan}
          >
            <b>
              {hasHistory ? "GET PERSONALIZED RECOMMENDATIONS" : "GENERATE MEAL PLAN"}
              {hasHistory && <span style={{ marginLeft: "5px" }}>🎯</span>}
            </b>
          </button>
          
          <div className="subcontent" style={{ maxHeight: "300px" }}>
            {mealPlan && (
              <div className="meal-plan">
                {Object.keys(mealPlan).map((cafeteriaId) => (
                  <div key={cafeteriaId}>
                    <h2 style={{ 
                      paddingTop: "15px", 
                      borderTop: "1px solid #e0e0e0",
                      color: mealPlan[cafeteriaId].isBasedOnHistory ? "#2E7D32" : "inherit"
                    }}>
                      {mealPlan[cafeteriaId].name} 
                      {mealPlan[cafeteriaId].isBasedOnHistory && (
                        <span style={{ 
                          fontSize: "14px", 
                          color: "#2E7D32", 
                          marginLeft: "10px",
                          fontWeight: "normal"
                        }}>
                          ✓ Based on your preferences
                        </span>
                      )}
                    </h2>
                    
                    <ul>
                      <li>
                        <span className="meals-generated">
                          <span>
                            Food: {mealPlan[cafeteriaId].food.name}
                            {hasHistory && foodTypes.some(type => 
                              mealPlan[cafeteriaId].food.name.toLowerCase().includes(type)
                            ) && (
                              <span style={{ 
                                color: "#FF6B00", 
                                marginLeft: "5px",
                                fontSize: "12px"
                              }}>
                                (Your favorite type!)
                              </span>
                            )}
                          </span>
                        </span>
                        {mealPlan[cafeteriaId].food.price && (
                          <div className="right-icons" style={{ gap: "3px" }}>
                            <span>RM {(mealPlan[cafeteriaId].food.price).toFixed(2)}</span>
                            <span 
                              className="material-symbols-rounded" 
                              onClick={() => handleAddToCartLocal(mealPlan[cafeteriaId].food, cafeteriaId)} 
                              style={{ fontSize: "25px" }}
                            >
                              add
                            </span>
                          </div>
                        )}
                      </li>
                      <li>
                        <span className="meals-generated">
                          <span>
                            Drink: {mealPlan[cafeteriaId].drink.name}
                            {hasHistory && drinkTypes.some(type => 
                              mealPlan[cafeteriaId].drink.name.toLowerCase().includes(type)
                            ) && (
                              <span style={{ 
                                color: "#2196F3", 
                                marginLeft: "5px",
                                fontSize: "12px"
                              }}>
                                (Your favorite type!)
                              </span>
                            )}
                          </span>
                        </span>
                        {mealPlan[cafeteriaId].drink.price && (
                          <div className="right-icons" style={{ gap: "3px" }}>
                            <span> RM {mealPlan[cafeteriaId].drink.price.toFixed(2)}</span>
                            <span 
                              className="material-symbols-rounded" 
                              onClick={() => handleAddToCartLocal(mealPlan[cafeteriaId].drink, cafeteriaId)} 
                              style={{ fontSize: "25px" }}
                            >
                              add
                            </span>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMealPlanner;