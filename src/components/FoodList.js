import React, { useState } from 'react';

const FoodList = ({ foodItems, onSelect }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleAddToCart = () => {
    onSelect(selectedItems);
    setSelectedItems([]); // Clear selected items after adding to cart
  };

  return (
    <div className="food-list">
      <h2>Food Items</h2>
      <ul>
        {foodItems.map(item => (
          <li key={item.id} className="food-item">
            <label>
              <input
                type="checkbox"
                checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item.name} - ${item.price.toFixed(2)}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default FoodList;