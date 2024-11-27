import React, { useState } from 'react';
import './Checkout.css'; // Make sure to create a CSS file for styling

const DineIn = ({ cartItems, totalPrice, isOpen, onClose }) => {

const [tableBooking, setTableBooking] = useState({ numPeople: '', tableNumber: '',location: ''}); // State for table booking
const [isOwnTableware, setIsOwnTableware] = useState(false);
const handleOwnTablewareChange = () => {
  setIsOwnTableware(!isOwnTableware);
};

// Calculate the total price including the eco-friendly package
const updatedTotalPrice = isOwnTableware ? totalPrice * 90 / 100 : totalPrice;
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

  if (!isOpen) return null; // If the modal isn't open, don't render anything

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
     
        <h2>Dine-In Reservations</h2>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary {`(${cartItems[0].cafeteria})`}</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {`${item.name} [ x${item.quantity} ]  - RM${(
                  item.price * item.quantity
                ).toFixed(2)} `}
              </li>
            ))}
          </ul>
        </div>
         {/*Bring own tableware option */}
         <div style={{ marginTop: '15px', fontSize: '14px' }}>
                  <label style={{paddingBottom: "5px"}}>
                    <input 
                      type="checkbox"
                      checked={isOwnTableware}
                      onChange={handleOwnTablewareChange}
                      className="reserve-checkbox"
                    />
                    <span  >Bring your own tableware (get 10% discount)</span>
                  </label>
                </div>
        <b>Total Price: RM{updatedTotalPrice.toFixed(2)} </b>

         {/* Dine-In Reservations Section */}
         <div className="reservation-section">
          <div style={{marginTop: "10px", marginBottom: "0px"}}>--------------------------------------------------------</div>

          <h3 >Reserve A Seat:</h3>
          <p>  (Bring your own tableware for 10% discount!)</p>
          <form>
            <div>
              <label>
                Number of People:
                <select 
                  className='num-ppl-input' 
                  style={{ marginLeft: '3%' }} 
                  value={tableBooking.numPeople}
                  onChange={(e) =>
                    setTableBooking((prev) => ({ ...prev, numPeople: e.target.value }))
                  }
                  required
                >
                  <option value="">Select Number</option>
                  {/* Add options for number of people */}
                  {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                Table Number:
                <select 
                  className='table-input' 
                  style={{ marginLeft: '3%' }}
                  value={tableBooking.tableNumber}
                  onChange={(e) =>
                    setTableBooking((prev) => ({ ...prev, tableNumber: e.target.value }))
                  }
                  required
                >
                  <option value="">Select Table</option>
                  {/* Add options for table numbers */}
                  {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
                    <option key={num} value={num}>{`Table ${num}`}</option>
                  ))}
                </select>
              </label>
            </div>
          </form>
          <button className="reserve-btn" onClick={handleReserveTable}>
            Reserve
          </button>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default DineIn;