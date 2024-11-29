import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Checkout.css'; // Make sure to create a CSS file for styling
import '../styles.css';
import Payment from './Payment';
import qrcode from '../img/qrcode.jpg';

const Delivery = ({ cartItems, totalPrice, isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration_date, setExpiration_date] = useState('');
  const [csv, setCsv] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kkLocation, setKkLocation] = useState('');
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);


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

    if (!username) {
      toast.error('Invalid user. Please log in again.');
    }

    console.log('Payment Method:', paymentMethod);
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('KK Location:', kkLocation);
    // Create an array of order names from cartItems
    const order_itemArray = cartItems.map(item => item.name);

    // Join the order names into a single string
    const order_item = order_itemArray.join(', ');

    const paymentData = {
      option: 'Delivery',
      order_item: order_item,
      eco_package: isEcoFriendly,
      price: updatedTotalPrice,
      delivery_name: name,
      phone_num: phoneNumber,
      card_number: cardNumber,
      expiration_date: expiration_date,
      csv: csv
    }

    fetch(`http://localhost:5000/payment/${username}`, {
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
        toast.success(`${data.message}`);
      } else {
        toast.error('Payment failed.')
      }
    })
    .catch(error => {
      console.error('Payment error:', error);
      toast.error('An error occured while processing your payment.');
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

        <form onSubmit={handlePaymentSubmit}>
          {/* Delivery Information */}
          <h3>Delivery Information</h3>
          
          <div style = {{marginBottom : "15px"}}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style = {{marginBottom : "15px"}}>
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

          {paymentMethod === 'TouchNGo' && (
            <div className="qr-code-container">
            <div>
              <img src={qrcode} alt="Touch N Go QR Code"/>
            </div>        
          </div>
          )}

          {paymentMethod === 'creditCard' && (
            <div className="credit-card-details" style = {{marginTop : "10px"}}>
              <div>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter Card Number"
                  required
                />
                <label>Expiration Date:</label>
                <input
                    type="text"
                    value={expiration_date}
                    onChange={(e) => setExpiration_date(e.target.value)}
                    required
                />
                <label>CVV:</label>
                <input
                    type="text"
                    value={csv}
                    onChange={(e) => setCsv(e.target.value)}
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
    </div>
  );
};

export default Delivery;