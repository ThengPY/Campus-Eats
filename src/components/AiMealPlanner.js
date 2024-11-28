import React, { useState } from "react";

const AiMealPlanner = ({ isOpen, onClose, cafeterias, foodItems }) => {
  if (!isOpen) return null;

  const [cafeteria, setCafeteria] = useState("");
  const [priceRange, setPriceRange] = useState("");
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
          (food) => food.price >= minPrice && food.price <= maxPrice
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
        (food) => food.price >= minPrice && food.price <= maxPrice
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
        <h3>Don't know what to eat?</h3>
        <p>Let our AI Meal Planner decide for you...</p>
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
            <option value="0-3">RM 0 - RM 3</option>
            <option value="3-5">RM 3 - RM 5</option>
            <option value="5-8">RM 5 - RM 8</option>
            <option value="8-10">RM 8 - RM 10</option>
          </select>
        </label>

        <button style={{ marginBottom: "20px", marginTop: "20px" }} onClick={generateMealPlan}>Generate Meal Plan</button>

        {mealPlan && (
          <div className="meal-plan">
            <h2 style={{ paddingTop: "15px", borderTop: "1px solid #e0e0e0" }}>Recommended Meals</h2>
            {Object.keys(mealPlan).map((cafeteriaId) => (
              <div key={cafeteriaId}>
                <h4>{mealPlan[cafeteriaId].name}</h4>
                <h5>Food: {mealPlan[cafeteriaId].food.name}</h5>
                <h5>Drink: {mealPlan[cafeteriaId].drink.name}</h5>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiMealPlanner;