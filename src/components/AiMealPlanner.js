import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AiMealPlanner.css';

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
  

  const handleAddToCart = (item, cafeteriaId) => {
    const cafeteria = cafeterias.find((c) => c.id === cafeteriaId);
    if (!cafeteria) return;

    const cartItem = { ...item, cafeteria: cafeteria.name, quantity: 1 };
    onAddToCart(cartItem);

    toast.success(`${item.name} (${cafeteria.name}) added successfully!`, {
      position: "top-left",
      autoClose: 1500,
    });
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
        <h3>Don't know what to eat?</h3>
        <p>Let our AI Meal Planner decide for you...</p>
        <label>
          Select Cafeteria:
          <select
            style={{ marginLeft: "7px", cursor: "pointer" }}
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

        <label style={{marginTop: "10px"}}>
          Food & Drinks Price Range:
          <select
            style={{ marginLeft: "7px", cursor: "pointer" }}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Any</option>
            <option value="0-3">RM 0 - RM 3</option>
            <option value="3-5">RM 3 - RM 5</option>
            <option value="5-8">RM 5 - RM 8</option>
            <option value="8-10">RM 8 - RM 10</option>
          </select>
        </label>

        <label style={{marginTop: "10px"}}>
          Dietary Preferences:
          <select
            style={{ marginLeft: "7px", cursor: "pointer" }}
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Vege">Vegetarian</option>
            <option value="Nonvege">Non-Vegetarian</option>
          </select>
        </label>

        <button
          style={{ marginBottom: "20px", marginTop: "20px" }}
          onClick={generateMealPlan}
          className="generate-btn"
        >
          Generate Meal Plan
        </button>

        {mealPlan && (
          <div className="meal-plan">
            <h2 style={{ paddingTop: "15px", borderTop: "1px solid #e0e0e0" }}>Recommended Meals</h2>
            {Object.keys(mealPlan).map((cafeteriaId) => (
              <div key={cafeteriaId}>
              <h4>{mealPlan[cafeteriaId].name}</h4>
              <h5 className="meals-generated">
                Food: {mealPlan[cafeteriaId].food.name}
                <span 
                  className="material-symbols-rounded"
                  onClick={() => handleAddToCart(mealPlan[cafeteriaId].food, cafeteriaId)}
                  style={{ fontSize: "30px", cursor: "pointer"}}
                >
                  add
                </span>
              </h5>
              <h5 className="meals-generated" style={{display: "flex"}}>
                Drink: {mealPlan[cafeteriaId].drink.name}
                <span
                  className="material-symbols-rounded"
                  onClick={() => handleAddToCart(mealPlan[cafeteriaId].drink, cafeteriaId)}
                  style={{ fontSize: "30px", cursor: "pointer" }}
                >
                  add
                </span>
              </h5>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiMealPlanner;