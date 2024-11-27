import React, { useState } from 'react';
import './Modal.css';

import {toast} from "react-toastify";

const MenuModal = ({ isOpen, onClose, foodItems, onAddToCart ,cafeteria}) => {
  const [selectedReservations, setSelectedReservations] = useState([]); // State for reservations
  const [tableBooking, setTableBooking] = useState({ numPeople: '', tableNumber: '',location: ''}); // State for table booking

  if (!isOpen) return null; // Don't render the modal if it's not open

  const { food = [], drinks = [] } = foodItems || {}; // Ensure food and drinks are defined

  const handleCheckboxChange = (item) => {
    setSelectedReservations((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item); // Remove if already selected
      }
      return [...prev, item]; // Add if not already selected
    });
  };

  const handleReserveTable = () => {
    if(localStorage.getItem('username')===''){
      alert('Please log in before reserving');
      return;
    }
    else if (!tableBooking.numPeople || !tableBooking.tableNumber) {
      alert('Please fill in table booking details.');
      return;
    }
    const reservationData = {
      pax: tableBooking.numPeople,
      table_number: tableBooking.tableNumber,
      reservation_time: new Date().toISOString(), // Example: current time
      location: cafeteria.name, // You can replace this with the actual location if needed
    };

    fetch(`http://localhost:5000/reservation/create/${localStorage.getItem('username')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text(); // Assuming your server responds with JSON
        })
        .then(data => {
          toast.success(`Reservation successful: ${localStorage.getItem('username')}`);
          setTableBooking({ numPeople: '', tableNumber: '',location: ''}); // Reset table booking details
          onClose(); // Close the modal after successful reservation
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          toast.success('Reservation failed. Please try again.');
        });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className = "close-btn">
          <span class="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>Menu</h2>

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
          <div className="menu-section">
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
  );
};

export default MenuModal;
