import React, { useState } from 'react';
import './Checkout.css'; // Make sure to create a CSS file for styling

const Delivery = ({ cartItems, totalPrice, isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kkLocation, setKkLocation] = useState('');
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const [isOwnTableware, setIsOwnTableware] = useState(false);


  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleEcoFriendlyChange = () => {
    setIsEcoFriendly(!isEcoFriendly);
  };
  const handleOwnTablewareChange = () => {
    setIsOwnTableware(!isEcoFriendly);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log('Payment Method:', paymentMethod);
    console.log('Card Number:', cardNumber);
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('KK Location:', kkLocation);
    onClose(); // Close the modal after payment
  };

  // Calculate the total price including the eco-friendly package
  const updatedTotalPrice = isEcoFriendly ? totalPrice + 1 : totalPrice;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Checkout (Delivery)</h2>
        
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {`${item.name} (${item.cafeteria}) [ x${item.quantity} ]  - RM${(item.price * item.quantity).toFixed(2)} `}
              </li>
            ))}
          </ul>
          {/* Eco-friendly package option */}
          <div style={{ marginTop: '15px', fontSize: '14px' }}>
                  <label >
                    <input 
                      type="checkbox"
                      checked={isEcoFriendly}
                      onChange={handleEcoFriendlyChange}
                      className="reserve-checkbox"
                    />
                    <span >Choose eco-friendly package (+RM 1.00)</span>
                  </label>
                </div>
          <div>-------------------------------------------------------</div>
          <b>Total Price: RM{updatedTotalPrice.toFixed(2)} </b>
          <div>-------------------------------------------------------</div>
        </div>    

        <form onSubmit={handleSubmit}>
          {/* Delivery Information */}
          <h3>Delivery Information</h3>
          
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Phone Number:</label>
            <input 
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Deliver To:</label>
            <select style={{marginBottom: "15px"}}
              value={kkLocation}
              onChange={(e) => setKkLocation(e.target.value)}
              required
            >
              <option value="">Select KK Location</option>
              <option value="kk1">KK1</option>
              <option value="kk2">KK2</option>
              <option value="kk3">KK3</option>
              <option value="kk4">KK4</option>
              <option value="kk5">KK5</option>
              <option value="kk6">KK6</option>
              <option value="kk7">KK7</option>
              <option value="kk8">KK8</option>
              <option value="kk9">KK9</option>
              <option value="kk10">KK10</option>
              <option value="kk11">KK11</option>
              <option value="kk12">KK12</option>
              <option value="kk13">KK13</option>
            </select>
          </div>
          {/* Payment Method Section */}
          <div>-------------------------------------------------------</div>

          <h3>Choose Payment Methods</h3>
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
          <button type="submit" className="pay-btn">Checkout</button>
        </form>
      </div>
    </div>
  );
};

export default Delivery;
