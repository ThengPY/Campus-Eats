import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AiMealPlanner.css';
import mealplanner from '../img/mealplanner.png'

const AiMealPlanner = ({ isOpen, onClose, cafeterias, foodItems, onAddToCart }) => {
  if (!isOpen) return null;

  const [cafeteria, setCafeteria] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [preferences, setPreferences] = useState("");
  const [mealPlan, setMealPlan] = useState(null);

  const parsePriceRange = (priceRange) => {
    if (priceRange === "") return [0, Infinity];
    const [minPrice, maxPrice] = priceRange.split("-").map(parseFloat);
    return [minPrice, maxPrice];
  };

  const generateMealPlan = () => {
    const plan = {};
    const cafeteriaId = cafeteria === "" ? null : parseInt(cafeteria, 10);

    const [minPrice, maxPrice] = parsePriceRange(priceRange);
    console.log("Selected Price Range:", minPrice, maxPrice);

    const matchesPreference = (item) => {
      if (preferences === "Vege") {
        return item.type === "Vege";
      } else if (preferences === "Nonvege" || preferences === "NonVege") {
        return item.type === "NonVege";
      }
      return true; // Return all if no preference selected
    };

    if (cafeteriaId === null) {
      cafeterias.forEach((cafeteria) => {
        const cafeteriaId = cafeteria.id;
        const filteredFood = foodItems[cafeteriaId].food.filter(
          (food) =>
            food.price >= minPrice &&
            food.price <= maxPrice &&
            matchesPreference(food)
        );
        const filteredDrinks = foodItems[cafeteriaId].drinks.filter(
          (drink) => drink.price >= minPrice && drink.price <= maxPrice
        );

        const selectedFood =
          filteredFood.length > 0
            ? filteredFood[Math.floor(Math.random() * filteredFood.length)]
            : { name: "No available food" };
        const selectedDrink =
          filteredDrinks.length > 0
            ? filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)]
            : { name: "No available drink" };
        plan[cafeteriaId] = {
          name: cafeteria.name,
          food: selectedFood,
          drink: selectedDrink,
        };
      });
    } else {
      if (!foodItems[cafeteriaId]) return;

      const filteredFood = foodItems[cafeteriaId].food.filter(
        (food) =>
          food.price >= minPrice &&
          food.price <= maxPrice &&
          matchesPreference(food)
      );
      const filteredDrinks = foodItems[cafeteriaId].drinks.filter(
        (drink) => drink.price >= minPrice && drink.price <= maxPrice
      );

      const selectedFood =
        filteredFood.length > 0
          ? filteredFood[Math.floor(Math.random() * filteredFood.length)]
          : { name: "No available food" };
      const selectedDrink =
        filteredDrinks.length > 0
          ? filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)]
          : { name: "No available drink" };
      plan[cafeteriaId] = {
        name: cafeterias.find((c) => c.id === cafeteriaId).name,
        food: selectedFood,
        drink: selectedDrink,
      };
    }

    setMealPlan(plan);
  };

  const handleAddToCartLocal = (item, cafeteriaId) => {
    const numericCafeteriaId = parseInt(cafeteriaId, 10); // Convert to number
    const cafeteria = cafeterias.find(c => c.id === numericCafeteriaId);
  
    if (!cafeteria) {
      console.log("Cafeteria not found for ID:", cafeteriaId);
      return;
    }

    // Check if the item is available
    if (item.name === "No available food" || item.name === "No available drink") {
      toast.error(`${item.name}`, {
        position: "top-left",
        autoClose: 1500,
      });
      return;
    }
  
    onAddToCart(item, numericCafeteriaId);
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
        <p style = {{fontSize : "15px", color : "black"}}>Don't know what to eat? <br /> Let our AI Meal Planner decide for you!</p>
        
        <div className = "mealplanner-div">
          <label>
            Select Cafeteria:
            <select
              value={cafeteria}
              onChange={(e) => setCafeteria(Number(e.target.value))} // Convert to number here
              className = "select"
            >
              <option value="">Any</option>
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

        <label style={{marginTop: "10px"}}>
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

        <button className = "generate-meal-plan-btn"
          style={{ marginBottom: "20px", marginTop: "20px", backgroundColor : "#FFCB59", width : "100%" }}
          onClick={generateMealPlan}
        >
          GENERATE MEAL PLAN
        </button>
        <div className = "subcontent" style = {{maxHeight : "300px"}}>
          {mealPlan && (
            <div className="meal-plan">
              {Object.keys(mealPlan).map((cafeteriaId) => (
                <div key={cafeteriaId}>
                  <h2 style={{ paddingTop: "15px", borderTop: "1px solid #e0e0e0" }}>{mealPlan[cafeteriaId].name} Recommended Meal</h2>
                  <ul>
                    <li>
                      <span className="meals-generated">
                        <span> Food: {mealPlan[cafeteriaId].food.name}</span>
                      </span>
                      {mealPlan[cafeteriaId].food.price && (
                        <div className="right-icons" style={{gap : "3px"}}>
                          <span>RM {(mealPlan[cafeteriaId].food.price).toFixed(2)}</span>
                          <span class="material-symbols-rounded" onClick={() => handleAddToCartLocal(mealPlan[cafeteriaId].food, cafeteriaId)} style={{ fontSize: "25px" }}>add</span>
                        </div>
                      )}
                    </li>
                    <li>
                      <span className="meals-generated"><span> Drink: {mealPlan[cafeteriaId].drink.name}</span></span>
                      {mealPlan[cafeteriaId].drink.price && (
                        <div className="right-icons" style={{gap : "3px"}}>
                          <span> RM {mealPlan[cafeteriaId].drink.price.toFixed(2)}</span>
                          <span className="material-symbols-rounded" onClick={() => handleAddToCartLocal(mealPlan[cafeteriaId].drink, cafeteriaId)} style={{ fontSize: "25px" }}>add</span>
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
