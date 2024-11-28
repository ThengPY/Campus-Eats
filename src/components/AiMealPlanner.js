import React, { useState } from "react";

const AiMealPlanner = ({ isOpen, onClose, cafeterias,foodItems }) => {
  if (!isOpen) return null;

  const [preference, setPreference] = useState("");
  const [cafeteria, setCafeteria] = useState("");
  const [mealPlan, setMealPlan] = useState(null);

  const generateMealPlan = () => {
    const plan = {};
    Object.keys(foodItems).forEach((cafeteriaId) => {
      if (cafeteria === "" || cafeteria === cafeteriaId) {
        const filteredMeals = foodItems[cafeteriaId].food.filter(
          (food) => food.type === preference || preference === ""
        );
        const selectedMeal = filteredMeals[0] || { name: "No available meal" };
        plan[cafeteriaId] = selectedMeal;
      }
    });
    setMealPlan(plan);
  };


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
      <div className = "close-btn">
          <span class="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>AI Meal Planner</h2>
        <h3>Don't know what to eat? </h3>
        <p>Let our AI Meal Planner decide for you... </p>
        <label>
          Select Cafeteria:
          <select
            value={cafeteria}
            onChange={(e) => setCafeteria(e.target.value)}
          >
            <option value="">Any</option>
            {Object.keys(cafeterias).map((cafeteriaId) => (
              <option key={cafeteriaId} value={cafeteriaId}>
                {cafeterias[cafeteriaId].name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Dietary Preference: 
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </label>
        <button onClick={generateMealPlan}>Generate Meal Plan</button>
      </div>

      {mealPlan && (
        <div className="meal-plan">
          <h2>Your Meal Plan</h2>
          {Object.keys(mealPlan).map((cafeteriaId) => (
              <div key={cafeteriaId}>
                <h4>Cafeteria {cafeteriaId}</h4>
                <p>{mealPlan[cafeteriaId].name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AiMealPlanner;