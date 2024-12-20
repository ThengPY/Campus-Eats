import React, { useState } from 'react';
import './Checkout.css';

const DineIn = ({ cartItems, totalPrice, isOpen, onClose, clearCart }) => {
  const [tableBooking, setTableBooking] = useState({ numPeople: '', tableNumber: '', location: '' }); // State for table booking
  const [isOwnTableware, setIsOwnTableware] = useState(false);

  const handleOwnTablewareChange = () => {
    setIsOwnTableware(!isOwnTableware);
  };

  // Calculate the total price including the eco-friendly package
  const updatedTotalPrice = isOwnTableware ? totalPrice * 90 / 100 : totalPrice;

  const handleReserveTable = () => {
    const username = localStorage.getItem('username');
    if (username === '') {
      alert('Please log in before reserving');
      return;
    } else if (!tableBooking.numPeople || !tableBooking.tableNumber) {
      alert('Please fill in table booking details.');
      return;
    }

    // Get the cafeteria name from cartItems (assuming all items have the same cafeteria)
    const cafeteriaName = cartItems[0].cafeteria; // Get cafeteria name from the first item

    // Create an array of order names from cartItems
    const order_itemArray = cartItems.map(item => item.name);

    // Join the order names into a single string
    const order_item = order_itemArray.join(', ');

    const reservationData = {
      option: 'Dine-In',
      order_item: order_item,
      own_tableware: isOwnTableware,
      price: updatedTotalPrice,
      pax: tableBooking.numPeople,
      table_number: tableBooking.tableNumber,
      location: cafeteriaName
    };

    fetch(`http://localhost:5000/order/create/${username}`, {
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
        return response.text(); // Assuming your server responds with text (or you can change it to JSON)
      })
      .then(data => {
        alert(`Reservation successful: ${localStorage.getItem('username')}`);
        setTableBooking({ numPeople: '', tableNumber: '', location: '' }); // Reset table booking details
        clearCart();
        onClose(); // Close the modal after successful reservation
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Reservation failed. Please try again.');
      });
  };

  if (!isOpen) return null; // If the modal isn't open, don't render anything

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn">
          <span className="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>Dine-In Checkout</h2>

        {/* Order Summary */}
        <div className = "subcontent" style = {{maxHeight : "250px"}}>
          <div className="order-summary">
            <h3>Order Summary {`(${cartItems[0].cafeteria})`}</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <span>{`[ x${item.quantity} ] ${item.name}`}</span>
                  <span>{`RM${(item.price * item.quantity ).toFixed(2)} `}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/*Bring own tableware option */}
        <div style={{ marginTop: '15px', fontSize: '14px' }}>
          <label style={{paddingBottom: "5px"}}>
            <input type="checkbox" checked={isOwnTableware} onChange={handleOwnTablewareChange} className="reserve-checkbox" />
            <span> Bring your own tableware (get 10% discount)</span>
          </label>
        </div>
        <h4 className = "total-price">Total Price: RM{updatedTotalPrice.toFixed(2)} </h4>

         {/* Dine-In Reservations Section */}
         <div className="reservation-section">
          <h3>Reserve A Seat:</h3>
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
            <div style = {{marginBottom : "10px"}}>
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
          <button className="reserve-btn" onClick={handleReserveTable}><b>RESERVE</b></button>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default DineIn;
