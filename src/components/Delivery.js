import React, { useState, useEffect } from 'react';
import './Checkout.css'; // Make sure to create a CSS file for styling
import '../styles.css';
import qrcode from '../img/qrcode.jpg';

const kkDistances = {
  kk1: { kk2: 0.6, kk3: 1.6, kk4: 1.7, kk5: 2.3, kk6: 0.6, kk7: 1.7, kk8: 2.4, kk9: 3.2, kk10: 2.3, kk11: 2.5, kk12: 2.4, kk13: 3, he_and_she: 0.85, QBistro: 2 },
  kk2: { kk1: 2.7, kk3: 1.9, kk4: 2.0, kk5: 2.6, kk6: 0.35, kk7: 2, kk8: 2.7, kk9: 3.5, kk10: 2.6, kk11: 2.8, kk12: 2.7, kk13: 3.3, he_and_she: 1.2, QBistro: 2.3 },
  kk3: { kk1: 2.3, kk2: 2.6, kk4: 0.3, kk5: 2, kk6: 2.7, kk7: 0.29, kk8: 1.1, kk9: 1.5, kk10: 1.0, kk11: 2.8, kk12: 2.3, kk13: 3, he_and_she: 2.9, QBistro: 1.9 },
  kk4: { kk1: 2.4, kk2: 2.7, kk3: 0.3, kk5: 2.1, kk6: 2.8, kk7: 0.35, kk8: 1.3, kk9: 1.6, kk10: 1.1, kk11: 2.9, kk12: 2.4, kk13: 2.7, he_and_she: 3, QBistro: 2 },
  kk5: { kk1: 1.5, kk2: 1.8, kk3: 3, kk4: 1.8, kk6: 1.9, kk7: 3.1, kk8: 2.3, kk9: 3.5, kk10: 2.1, kk11: 0.35, kk12: 0.26, kk13: 5.7, he_and_she: 3.9, QBistro: 1.1 },
  kk6: { kk1: 2.7, kk2: 0.35, kk3: 1.9, kk4: 2.0, kk5: 2.5, kk7: 2, kk8: 2.7, kk9: 3.5, kk10: 2.6, kk11: 2.8, kk12: 2.7, kk13: 3.4, he_and_she: 1.2, QBistro: 2.3 },
  kk7: { kk1: 2.4, kk2: 2.7, kk3: 0.3, kk4: 0.35, kk5: 2.3, kk6: 2.8, kk8: 1.2, kk9: 1.6, kk10: 1.1, kk11: 2.9, kk12: 2.4, kk13: 3.1, he_and_she: 3, QBistro: 2.0 },
  kk8: { kk1: 3.0, kk2: 3.4, kk3: 1.1, kk4: 1.2, kk5: 2.5, kk6: 3.4, kk7: 1.2, kk9: 2.2, kk10: 0.25, kk11: 2, kk12: 2.4, kk13: 3.3, he_and_she: 3.6, QBistro: 2.6 },
  kk9: { kk1: 4.1, kk2: 4.4, kk3: 1.5, kk4: 1.7, kk5: 3, kk6: 4.5, kk7: 1.6, kk8: 2.4, kk10: 2.2, kk11: 3.2, kk12: 3.1, kk13: 1.7, he_and_she: 2, QBistro: 3.7 },
  kk10: { kk1: 3.0, kk2: 3.3, kk3: 1.0, kk4: 1.1, kk5: 2.3, kk6: 3.3, kk7: 1.1, kk8: 0.35, kk9: 2.1, kk11: 1.9, kk12: 2.3, kk13: 3.3, he_and_she: 3.6, QBistro: 2.6 },
  kk11: { kk1: 1.8, kk2: 2.2, kk3: 2.8, kk4: 2.9, kk5: 0.55, kk6: 2.2, kk7: 2.9, kk8: 2.1, kk9: 3.9, kk10: 1.9, kk12: 0.55, kk13: 4.6, he_and_she: 2.4, QBistro: 1.4 },
  kk12: { kk1: 1.6, kk2: 2.0, kk3: 3.2, kk4: 3.3, kk5: 0.45, kk6: 2.0, kk7: 3.3, kk8: 2.5, kk9: 4.4, kk10: 2.3, kk11: 0.55, kk13: 4.4, he_and_she: 2.2, QBistro: 1.2 },
  kk13: { kk1: 4.7, kk2: 5, kk3: 2.5, kk4: 2.6, kk5: 4.1, kk6: 5.1, kk7: 2.6, kk8: 3.3, kk9: 1.9, kk10: 3.2, kk11: 4.3, kk12: 4.2, he_and_she: 2.6, QBistro: 4.3 },
  he_shecoffee: { kk1: 1.8, kk2: 2.1, kk3: 0.75, kk4: 0.85, kk5: 1.5, kk6: 2.1, kk7: 0.85, kk8: 1.5, kk9: 1.5, kk10: 1.4, kk11: 1.9, kk12: 1.8, kk13: 2.6, QBistro: 1.4 },
  qbistro: { kk1: 0.5, kk2: 0.85, kk3: 1.8, kk4: 1.9, kk5: 2.6, kk6: 0.9, kk7: 1.9, kk8: 2.7, kk9: 3.4, kk10: 2.5, kk11: 2.7, kk12: 2.6, kk13: 3.3, he_and_she: 1.1},
};

const baseRatePerKm = 0.5; // Base rate per km for delivery fee

const Delivery = ({ cartItems, totalPrice, isOpen, onClose, isPayment, clearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration_date, setExpiration_date] = useState('');
  const [csv, setCsv] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kkLocation, setKkLocation] = useState('');
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);

  const normalizeLocation = (location) => {
    return location.toLowerCase().replace(/\s+/g, '').replace(/&/g, '_').split(' ')[0];
  };
  
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setKkLocation(normalizeLocation(selectedLocation));  // Normalize the selected KK location
};

  // Extract unique cafeterias (source KKs) from cart items
  const uniqueSourceKKs = [...new Set(cartItems.map(item => item.cafeteria))];

  useEffect(() => {
    console.log('Calculating total delivery fee...');
    console.log('Unique Source KKs:', uniqueSourceKKs);
    console.log('KK Location:', kkLocation);
    
    const newTotalDeliveryFee = uniqueSourceKKs.reduce((total, sourceKK) => {
        const normalizedSourceKK = normalizeLocation(sourceKK);
        const normalizedDestinationKK = normalizeLocation(kkLocation);

        console.log(`Calculating delivery fee from ${normalizedSourceKK} to ${normalizedDestinationKK}`);

        const fee = calculateDeliveryFee(normalizedSourceKK, normalizedDestinationKK);
        console.log(`Delivery fee from ${sourceKK} to ${kkLocation}: ${fee}`);
        return total + fee;
    }, 0);

    console.log(`New total delivery fee: ${newTotalDeliveryFee}`);
    setTotalDeliveryFee(newTotalDeliveryFee);
}, [cartItems, kkLocation]); // Recalculate when either `cartItems` or `kkLocation` changes


// Calculate the delivery fee based on distance
const calculateDeliveryFee = (normalizedSourceKK, normalizedDestinationKK) => {
  if (!normalizedDestinationKK) {
    console.log('Destination KK is not selected');
    return 0;
  }

  // Debugging: Log the normalized KK locations to ensure they are being correctly compared
  console.log(`Normalized Source KK: ${normalizedSourceKK}`);
  console.log(`Normalized Destination KK: ${normalizedDestinationKK}`);

  if (!kkDistances[normalizedSourceKK]) {
    console.log(`Source KK "${normalizedSourceKK}" is not valid.`);
    return 0;
  }

  if (!kkDistances[normalizedSourceKK][normalizedDestinationKK]) {
    console.log(`No distance found between "${normalizedSourceKK}" and "${normalizedDestinationKK}"`);
    return 0;
  }

  const distance = kkDistances[normalizedSourceKK][normalizedDestinationKK];
  console.log(`Distance from ${normalizedSourceKK} to ${normalizedDestinationKK}: ${distance}`);

  // Ensure the delivery fee is always calculated, even if the location is the same
  if (normalizedSourceKK === normalizedDestinationKK) {
    console.log(`Source and destination are the same. Applying a base fee.`);
    return baseRatePerKm;  // Apply the base rate fee if the locations are the same
  }

  // If the distance is non-zero, calculate based on the actual distance
  if (distance > 0) {
      console.log(`Calculated fee based on distance: ${distance * baseRatePerKm}`);
      return distance * baseRatePerKm;
  } else {
      console.log('Distance is zero, applying base rate fee');
      return baseRatePerKm; // If distance is zero, we still apply a base rate fee
  }
};


  // Calculate the updated total price
  const updatedTotalPrice = totalPrice + totalDeliveryFee + (isEcoFriendly ? 1 : 0);

  useEffect(() => {
    if (paymentMethod === 'TouchNGo') {
      setCardNumber(null);
      setExpiration_date(null);
      setCsv(null);
    }
  }, [paymentMethod]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleEcoFriendlyChange = () => {
      setIsEcoFriendly(!isEcoFriendly);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');

    if (!username) {
      alert('Invalid user. Please log in again.');
      return;
    }

    if (!kkLocation) {
      alert('Please select a KK location before proceeding to checkout.');
      return; // Prevent submission if KK location is not selected
    }

    console.log('Payment Method:', paymentMethod);
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('KK Location:', kkLocation);

    // Create an array of order names from cartItems
    const order_itemArray = cartItems.map(item => item.name);
    const order_item = order_itemArray.join(', ');

    const paymentData = {
      option: 'Delivery',
      order_item: order_item,
      eco_package: isEcoFriendly,
      price: updatedTotalPrice,
      delivery_name: name,
      phone_num: phoneNumber,
      payment_method: paymentMethod,
      card_number: cardNumber,
      expiration_date: expiration_date,
      csv: csv
    };

    fetch(`http://localhost:5000/order/create/${username}`, {
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
        alert(`${data.message}\nOrder received`);
        clearCart();
        onClose();
      } else {
        alert('Payment failed.');
      }
    })
    .catch(error => {
      console.error('Payment error:', error);
      alert('An error occurred while processing your payment.');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn">
          <span className="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
        <h2>Delivery Checkout</h2>

        <div className="subcontent">
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

            {/* Choose Delivery Location (KK) */}
              <span>Deliver To:</span>
              <select style={{ marginBottom: "8px", marginLeft: "10px"}}
                value={kkLocation}
                onChange={handleLocationChange} // Use the handler to normalize the selected value
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

            {/* Eco-friendly package option */}
            <div style={{  fontSize: '14px' }}>
              <label>
                <input  style={{marginBottom: "20px"}}
                  type="checkbox"
                  checked={isEcoFriendly}
                  onChange={handleEcoFriendlyChange}
                  className="reserve-checkbox"
                />
                <span> Choose eco-friendly packaging (+RM 1.00)</span>
              </label>
            </div>

            <div style={{borderTop: "1px solid #e0e0e0", fontSize: "16px", paddingBottom: "5px", paddingTop: "5px"}}>
              <b>Total Delivery Fee: RM{totalDeliveryFee.toFixed(2)}</b>
            </div>
            <div style={{borderBottom: "1px solid #e0e0e0", fontSize: "16px", paddingTop: "5px", paddingBottom: "5px"}}>
              <b>Total Price: RM{updatedTotalPrice.toFixed(2)}</b>
            </div>

          </div>    

          <form onSubmit={handlePaymentSubmit}>
            {/* Delivery Information */}
            <h3>Delivery Information</h3>

            <div style={{ marginBottom: "15px" }}>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Phone Number:</label>
              <input 
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
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
              <div>
                <div style={{ marginBottom: "15px" }}>
                  <label>Card Number:</label>
                  <input 
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder='XXXX XXXX XXXX'
                    required
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label>Expiration Date:</label>
                  <input 
                    type="text"
                    value={expiration_date}
                    placeholder='MM/YY' 
                    onChange={(e) => setExpiration_date(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label>CSV:</label>
                  <input
                    type="text"
                    value={csv}
                    placeholder='XXX' 
                    onChange={(e) => setCsv(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <button type="submit" className="pay-btn">Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Delivery;