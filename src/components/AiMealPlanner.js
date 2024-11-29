import React, { useState } from "react";
import mealplanner from '../img/mealplanner.png'

const AiMealPlanner = ({ isOpen, onClose, cafeterias, foodItems, onAddToCart }) => {
  if (!isOpen) return null;

  const [cafeteria, setCafeteria] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [preference, setPreference] = useState("");
  const [mealPlan, setMealPlan] = useState(null);

  const parsePriceRange = (priceRange) => {
    if (priceRange === "") return [0, Infinity];
    const [minPrice, maxPrice] = priceRange.split("-").map(parseFloat);
    return [minPrice, maxPrice];
  };

  const generateMealPlan = () => {
    console.log("Button clicked, generating meal plan...");
    const plan = {};
    const cafeteriaId = cafeteria === "" ? null : parseInt(cafeteria, 10); // Ensure cafeteriaId is an integer or null

    console.log("Selected cafeteria ID:", cafeteriaId);

    const [minPrice, maxPrice] = parsePriceRange(priceRange);
    console.log("Price range:", minPrice, maxPrice);

    if (cafeteriaId === null) {
      // If no specific cafeteria is selected, generate a meal plan for all cafeterias
      cafeterias.forEach((cafeteria) => {
        const cafeteriaId = cafeteria.id;
        console.log("Processing cafeteria ID:", cafeteriaId);
        const filteredFood = foodItems[cafeteriaId].food.filter(
          (food) => food.price >= minPrice && food.price <= maxPrice && (preference === "" || food.type === preference)
        );
        const filteredDrinks = foodItems[cafeteriaId].drinks.filter(
          (drink) => drink.price >= minPrice && drink.price <= maxPrice
        );

        const selectedFood = filteredFood.length > 0 ? filteredFood[Math.floor(Math.random() * filteredFood.length)] : { name: "No available food" };
        const selectedDrink = filteredDrinks.length > 0 ? filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)] : { name: "No available drink" };
        plan[cafeteriaId] = { name: cafeteria.name, food: selectedFood, drink: selectedDrink };
      });
    } else {
      // If a specific cafeteria is selected, generate a meal plan for that cafeteria
      if (!foodItems[cafeteriaId]) {
        console.error(`Cafeteria ID ${cafeteriaId} does not exist in foodItems`);
        return;
      }
      console.log("Processing selected cafeteria ID:", cafeteriaId);
      const filteredFood = foodItems[cafeteriaId].food.filter(
        (food) => food.price >= minPrice && food.price <= maxPrice && (preference === "" || food.type === preference)
      );
      const filteredDrinks = foodItems[cafeteriaId].drinks.filter(
        (drink) => drink.price >= minPrice && drink.price <= maxPrice
      );

      const selectedFood = filteredFood.length > 0 ? filteredFood[Math.floor(Math.random() * filteredFood.length)] : { name: "No available food" };
      const selectedDrink = filteredDrinks.length > 0 ? filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)] : { name: "No available drink" };
      plan[cafeteriaId] = { name: cafeterias.find(c => c.id === cafeteriaId).name, food: selectedFood, drink: selectedDrink };
    }

    console.log("Generated meal plan:", plan);

    setMealPlan(plan); // This should trigger a re-render
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn">
          <span className="material-symbols-rounded" onClick={onClose}>
            close
          </span>
        </div>
        <h2>AI Meal Planner</h2>
        <p style = {{fontSize : "15px", color : "black"}}>Don't know what to eat? <br /> Let our AI Meal Planner decide for you...</p>
        
        <div className = "mealplanner-div">
          <label>
            Select Cafeteria:
            <select style={{marginLeft: "7px", cursor: "pointer"}}
              value={cafeteria}
              onChange={(e) => setCafeteria(e.target.value)}
            >
              <option value="">Any</option>
              {cafeterias.map((cafeteria) => (
                <option key={cafeteria.id} value={cafeteria.id}>
                  {cafeteria.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price Range:
            <select style={{marginLeft: "7px", cursor: "pointer"}}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Any</option>
              <option value="0-3">Below RM 3</option>
              <option value="0-5">Below RM 5</option>
              <option value="0-8">Below RM 8</option>
              <option value="0-10">Below RM 10</option>
            </select>
          </label>

          <label>
            Dietary Preference:
            <select style={{marginLeft: "7px", cursor: "pointer"}}
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Vege">Vegetarian</option>
              <option value="NonVege">Non-Vegetarian</option>
            </select>
          </label>
        </div>

        <button className = "generate-meal-plan-btn" style={{ marginBottom: "20px", marginTop: "20px", backgroundColor : "#FFCB59", width : "100%" }} onClick={generateMealPlan}>GENERATE MEAL PLAN</button>

        {mealPlan && (
          <div className="meal-plan">
            
            {Object.keys(mealPlan).map((cafeteriaId) => (
              <div key={cafeteriaId}>
                <h2 style={{ paddingTop: "15px", borderTop: "1px solid #e0e0e0" }}>{mealPlan[cafeteriaId].name} Recommended Meal</h2>
                <ul>
                  <li>
                    <span>Food: {mealPlan[cafeteriaId].food.name}</span>
                    <div className="right-icons" style={{gap : "3px"}}>
                      <span>RM {(mealPlan[cafeteriaId].food.price).toFixed(2)}</span>
                      <span class="material-symbols-rounded" onClick={() => onAddToCart(mealPlan[cafeteriaId].food)} style={{ fontSize: "25px" }}>add</span>
                    </div>
                  </li>
                  <li>
                    <span>Drink: {mealPlan[cafeteriaId].drink.name}</span>
                    <div className="right-icons" style={{gap : "3px"}}>
                      <span>RM {(mealPlan[cafeteriaId].drink.price).toFixed(2)}</span>
                      <span class="material-symbols-rounded" onClick={() => onAddToCart(mealPlan[cafeteriaId].drink)} style={{ fontSize: "25px" }}>add</span>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiMealPlanner;