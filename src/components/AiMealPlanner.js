import React from 'react';

const AiMealPlanner = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>AI Meal Planner</h2>
        <h3>Don't know what to eat? </h3>
        <p>Let our AI Meal Planner decide for you... </p>
      </div>
    </div>
  );
};

export default AiMealPlanner;