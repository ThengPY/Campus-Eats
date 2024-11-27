import React, { useState } from 'react';
import './Checkout.css'; // Make sure to create a CSS file for styling

const PickUp = ({ cartItems, totalPrice, isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log('Payment Method:', paymentMethod);
    console.log('Card Number:', cardNumber);
    console.log('Pick-Up Date:', pickupDate);
    console.log('Pick-Up Time:', pickupTime);
    onClose(); // Close the modal after payment
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
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Checkout (Pick-Up)</h2>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {`${item.name} (${item.cafeteria}) [ x${item.quantity} ]  - RM${(
                  item.price * item.quantity
                ).toFixed(2)} `}
              </li>
            ))}
          </ul>
        </div>
        <div>--------------------------------------------------------------------------</div>
        <b>Total Price: RM{totalPrice.toFixed(2)} </b>
        <div>--------------------------------------------------------------------------</div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          {/* Pick-Up Time Section */}
          <h3 className="pick-up-time">Select Pick-Up Date and Time</h3>
          <div className="pickup-time-selector">
            <div className="pickup-time-container">
              {/* Date Picker */}
              <label htmlFor="pickup-date">Date:</label>
              <input
                type="date"
                id="pickup-date"
                value={pickupDate}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="pickup-time-container">
              {/* Time Dropdown */}
              <label htmlFor="pickup-time">Time:</label>
              <select
                id="pickup-time"
                value={pickupTime}
                onChange={handleTimeChange}
                required
              >
                <option value="">Select a time</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
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
        <div>--------------------------------------------------------------------------</div>
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

          {/* Credit Card Details */}
          {paymentMethod === 'creditCard' && (
            <div className="credit-card-details">
              <div>
                <label>Card Number:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="pay-btn">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default PickUp;