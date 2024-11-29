import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Checkout.css'; // Make sure to create a CSS file for styling
import '../styles.css';
import Payment from './Payment';

const Delivery = ({ cartItems, totalPrice, isOpen, onClose, isPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kkLocation, setKkLocation] = useState('');
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const [isOwnTableware, setIsOwnTableware] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);


  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleEcoFriendlyChange = () => {
    setIsEcoFriendly(!isEcoFriendly);
  };
  const handleOwnTablewareChange = () => {
    setIsOwnTableware(!isEcoFriendly);
  };
  
  const handlePayment = (e) => {
    e.preventDefault();
    console.log('Payment Method:', paymentMethod);
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('KK Location:', kkLocation);
    setIsPaymentOpen(true);
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    const username = localStorage.getItem('username');

    if (!username) {
      toast.error('Invalid user. Please log in again.');
    }

    console.log('Payment Method:', paymentMethod);
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('KK Location:', kkLocation);

    const paymentData = {
      price: updatedTotalPrice,
      username: username,
      card_number: card_number
    }

    fetch('http://localhost:5000/payment', {
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

  // Calculate the total price including the eco-friendly package
  const updatedTotalPrice = isEcoFriendly ? totalPrice + 1 : totalPrice;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className = "close-btn">
          <span class="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>Delivery Checkout</h2>
        
        <div className = "subcontent">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <span>{`[ x${item.quantity} ] ${item.name} (${item.cafeteria})`}</span>
                  <span>{`RM${(item.price * item.quantity).toFixed(2)} `}</span>
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
                      <span> Choose eco-friendly packaging (+RM 1.00)</span>
                    </label>
                  </div>
            <div className = "total-price"><b>Total Price: RM{updatedTotalPrice.toFixed(2)} </b></div>
          </div>    

          <form onSubmit={handlePayment}>
            {/* Delivery Information */}
            <h3>Delivery Information</h3>
            
            <div style = {{marginBottom: "15px"}}>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style = {{marginBottom: "15px"}}>
              <label>Phone Number:</label>
              <input 
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder = "XXX-XXXXXXX"
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

            <h3>Choose Payment Methods</h3>
            <div>
              <label style = {{marginBottom: "10px"}}>
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
                  style = {{marginBottom: "15px"}}

                />
                Credit Card
              </label>
            </div>

            {paymentMethod === 'creditCard' && (
              <div className="credit-card-details">
                <div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder = "Enter Card Number"
                    required
                  />
                </div>        
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="pay-btn">CHECKOUT</button>
          </form>
        </div>  
        {isPayment && (
          <Payment
            paymentMethod={paymentMethod}
            onClose={() => setIsPaymentOpen(false)}
            onSubmit={handlePaymentSubmit}
            cardNumber={setCardNumber}
            setCardNumber={setCardNumber}
          />
        )}
      </div>
    </div>
  );
};

export default Delivery;
