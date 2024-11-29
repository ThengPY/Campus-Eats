import React, { useState } from 'react';
import './Modal.css';

const MenuModal = ({ isOpen, onClose, foodItems, onAddToCart ,cafeteria}) => {

  if (!isOpen) return null; // Don't render the modal if it's not open

  const { food = [], drinks = [] } = foodItems || {}; // Ensure food and drinks are defined

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className = "close-btn">
          <span class="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>Menu</h2>

        <div className = "subcontent">
          {/* Food Section */}
          {food.length > 0 && (
            <div className="menu-section">
              <h4>Food</h4>
              <ul>
                {food.map((item) => (
                  <li key={item.id}>
                    {`- ${item.name}  (RM ${item.price.toFixed(2)})`}
                    <span class="material-symbols-rounded" onClick={() => onAddToCart(item)} style={{ fontSize: "30px" }}>add</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Drinks Section */}
          {drinks.length > 0 && (
            <div className="menu-section" style={{borderTop: "1px solid #e0e0e0"}}>
              <h4>Drinks</h4>
              <ul>
                {drinks.map((item) => (
                  <li key={item.id}>
                    {`- ${item.name}  (RM ${item.price.toFixed(2)})`}
                    <span class="material-symbols-rounded" onClick={() => onAddToCart(item)} style={{ fontSize: "30px" }}>add</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <hr />
      
          </div>
        </div>
        </div>
  );
};

export default MenuModal;
