import React, { useState, useEffect } from 'react';
import './Checkout.css'; // Make sure to create a CSS file for styling
import '../styles.css';
import qrcode from '../img/qrcode.jpg';

const PickUp = ({ cartItems, totalPrice, isOpen, onClose, clearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration_date, setExpiration_date] = useState('');
  const [csv, setCsv] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isOwnContainer, setIsOwnContainer] = useState(false);
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);

  useEffect(() => {
    if (paymentMethod === 'TouchNGo') {
      setCardNumber(null);
      setExpiration_date(null);
      setCsv(null);
    }
  }, [paymentMethod]);

  const handleEcoFriendlyChange = () => {
    if (isOwnContainer) {
      setIsOwnContainer(false); // Uncheck the "Own Container" option if "Eco-Friendly" is selected
    }
    setIsEcoFriendly(!isEcoFriendly);
  };

  const handleOwnContainerChange = () => {
    if (isEcoFriendly) {
      setIsEcoFriendly(false); // Uncheck the "Eco-Friendly" option if "Own Container" is selected
    }
    setIsOwnContainer(!isOwnContainer);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  // Calculate the total price including both eco-friendly package and bring own container
  // Function to calculate the total price based on eco-friendly and own container options
  const calculateTotalPrice = (totalPrice, isEcoFriendly, isOwnContainer) => {
    let updatedTotalPrice = totalPrice;
  
    if (isEcoFriendly) {
      updatedTotalPrice = updatedTotalPrice + 1; // Add RM 1 for eco-friendly
    } 
    else if (isOwnContainer) {
      updatedTotalPrice = updatedTotalPrice * 0.9; // Apply 10% discount for own container
    }

  return updatedTotalPrice;
};

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    const username = localStorage.getItem('username');
    const updatedTotalPrice = calculateTotalPrice(totalPrice, isEcoFriendly, isOwnContainer);

    if (!username) {
      alert('Invalid user. Please log in again.');
    }

    console.log('Payment Method:', paymentMethod);
    console.log('Pick-Up Date:', pickupDate);
    console.log('Pick-Up Time:', pickupTime);

    // Create an array of order names from cartItems
    const order_itemArray = cartItems.map(item => item.name);

    // Join the order names into a single string
    const order_item = order_itemArray.join(', ');

    const paymentData = {
      option: 'Pick-Up',
      order_item: order_item,
      eco_package: isEcoFriendly,
      bring_container: isOwnContainer,
      price: updatedTotalPrice,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      payment_method: paymentMethod,
      card_number: cardNumber,
      expiration_date: expiration_date,
      csv: csv
    }

    fetch(`http://localhost:5000/order/create/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Payment response:', data);
      if (data.success) {
        alert(`${data.message}\nOrder received`);
        clearCart();
      } else {
        alert('Payment failed.');
      }
    })
    .catch(error => {
      console.error('Payment error:', error);
    })
  };

  const handleDateChange = (e) => {
    setPickupDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setPickupTime(e.target.value);
  };

  if (!isOpen) return null; // If the modal isn't open, don't render anything

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className = "close-btn">
          <span class="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>Pick-Up Checkout</h2>
        <div className = "subcontent">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <span>{`[ x${item.quantity} ] ${item.name} (${item.cafeteria})`}</span>
                  <span>{`RM${(item.price * item.quantity).toFixed(2)} `}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Eco-friendly package option */}
          <div style={{ marginTop: '15px', fontSize: '14px' }}>
                    <label >
                      <input 
                        type="checkbox"
                        checked={isEcoFriendly}
                        onChange={handleEcoFriendlyChange}
                        className="reserve-checkbox"
                      />
                      <span> Choose eco-friendly packaging (+RM 1.00)</span>
                    </label>
            </div>
            {/*Bring own tableware option */}
          <div style={{ marginTop: '15px', fontSize: '14px' }}>
                    <label style={{paddingBottom: "5px"}}>
                      <input type="checkbox" checked={isOwnContainer} onChange={handleOwnContainerChange} className="reserve-checkbox" />
                      <span> Bring your own container (Get 10% discount!)</span>
                    </label>
                  </div>
          <h4 className = "total-price">Total Price: RM{calculateTotalPrice(totalPrice, isEcoFriendly, isOwnContainer).toFixed(2)} </h4>


          {/* Form Section */}
          <form onSubmit={handlePaymentSubmit}>
            {/* Pick-Up Time Section */}
            <h3 className="pick-up-time">Select Pick-Up Date and Time</h3>
            <div className="pickup-time-selector">
              <div className="pickup-time-container">
                {/* Date Picker */}
                <label htmlFor="pickup-date">Date: &nbsp;
                  <input
                    type="date"
                    id="pickup-date"
                    value={pickupDate}
                    onChange={handleDateChange}
                    required
                  />
                </label>
              </div>

              <div className="pickup-time-container">
                {/* Time Dropdown */}
                <label htmlFor="pickup-time">Time: &nbsp;
                  <select
                      id="pickup-time"
                      value={pickupTime}
                      onChange={handleTimeChange}
                      required
                  >
                    <option value="">Select a time</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </label>
              </div>

              {/* Display Selected Date and Time */}
              {pickupDate && pickupTime && (
                  <p>
                    Selected Pick-Up: <strong>{pickupDate}</strong> at{' '}
                    <strong>{pickupTime}</strong>
                  </p>
              )}
            </div>

            {/* Payment Method Section */}
            <h3 className="payment-method">Choose Payment Method</h3>
            <div>
              <label>
                <input
                  type="radio"
                  value="TouchNGo"
                  checked={paymentMethod === 'TouchNGo'}
                  onChange={handlePaymentMethodChange}
                />
                TouchNGo
              </label>
              <label>
                <input
                  type="radio"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={handlePaymentMethodChange}
                />
                Credit Card
              </label>
            </div>

            {/* Payment details */}
            {paymentMethod === 'TouchNGo' && (
              <div className="qr-code-container">
              <div>
                <img src={qrcode} alt="Touch N Go QR Code"/>
              </div>        
            </div>
            )}

            {paymentMethod === 'creditCard' && (
              <div className="credit-card-details" style = {{marginTop : "10px"}}>
                <div style = {{marginBottom : "15px"}}>
                  <label style = {{borderTop : "1px solid #e0e0e0", paddingTop : "10px"}}>Card Number:</label>
                  <input
                    type="text"
                    value={cardNumber || ''}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder='XXXX XXXX XXXX'
                    required
                  />
                </div>
                <div  style = {{marginBottom : "15px"}}>
                  <label>Expiration Date:</label>
                  <input
                      type="text"
                      value={expiration_date || ''}
                      onChange={(e) => setExpiration_date(e.target.value)}
                      placeholder='MM/YY' required
                  />
                </div>
                <div  style = {{marginBottom : "15px"}}>
                  <label>CVV:</label>
                  <input
                      type="text"
                      value={csv || ''}
                      onChange={(e) => setCsv(e.target.value)}
                      placeholder='XXX' required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="pay-btn">CHECKOUT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PickUp;