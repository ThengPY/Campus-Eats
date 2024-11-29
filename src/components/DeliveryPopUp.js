import React from 'react';
import './DeliveryPopUp.css';
import './Modal.css';

const DeliveryPopUp = ({ message, onClose }) => {
    return (
        <div className="pop-up-notification">
            <div className="pop-up-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default DeliveryPopUp;