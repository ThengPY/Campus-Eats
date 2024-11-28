import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Checkout.css'; // Make sure to create a CSS file for styling
import '../styles.css';
import Payment from './Payment';

const Delivery = ({ cartItems, totalPrice, isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kkLocation, setKkLocation] = useState('');
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const [isPayment, setIsPayment] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleEcoFriendlyChange = () => {
    setIsEcoFriendly(!isEcoFriendly);
  };
 
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    const username = localStorage.getItem('username');
    console.log('Username from localStorage', username);

    if (!username) {
      toast.error('Invalid user. Please log in again.');
      return;
    }

    console.log('Payment Method:', paymentMethod);
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('KK Location:', kkLocation);
    
    const paymentData = {
      amount: updatedTotalPrice,
      currency: 'RM',
      username: username,
    };
    console.log('Payment Data:', paymentData);
    
    fetch('http://localhost:5000/user/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Payment response:', data);
      if (data.success) {
        toast.success(`Payment successful. ${data.message}`);
      } else {
        toast.error('Payment failed.')
      }
    })
    .catch(error => {
      console.error('Payment error:', error);
      toast.error('An error occured while processing your payment.');
      setIsPayment(false);
    });
  };


  // Calculate the total price including both eco-friendly package and bring own container
  const updatedTotalPrice = isEcoFriendly ? totalPrice + 1: totalPrice;


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

        <form onSubmit={handlePaymentSubmit}>
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

          {/* Submit Button */}
          <button type="submit" className="pay-btn">Checkout</button>
        </form>
        {isPayment && (
          <Payment
            paymentMethod={paymentMethod}
            onClose={() => setIsPayment(false)}
            onSubmit={handlePaymentSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Delivery;
