import React from 'react';
import '../styles.css';
import './Checkout.css';
import './PickUp.js';
import qrcode from '../img/qrcode.jpg';

const handlesubmit = (e) => {
    e.preventDefault();
    onClose();
}

const Payment = ({ paymentMethod, onClose, onSubmit }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className = "modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="close-btn">
                    <span class="material-symbols-rounded" onClick={onClose}>close</span>
                    {paymentMethod === 'creditCard' ? (
                        <div>
                            <h3>Credit Card Payment</h3>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <label>Card Number:</label>
                                    <input type="text" required/>
                                </div>
                                <div>
                                    <label>Expiration Date:</label>
                                    <input type="text" placeholdert="MM/YY" required/>
                                </div>
                                <div>
                                    <label>CVV:</label>
                                    <input type="text" required/>
                                </div>
                                <button type="submit" className="pay-btn" onClick={onClose}>Pay</button>
                            </form>
                        </div>
                    ):(
                        <div className="qr-code-container">
                            <h3>Touch N Go Payment</h3>
                            <form onSubmit={onSubmit}>
                                <img src={qrcode} alt="Touch N Go QR Code"/>
                                <p>Scan the QR code to complete your payment.</p>
                                <button type="submit" className="pay-btn" onClick={onClose}>Submit</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Payment;