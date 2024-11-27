import React from 'react';

const OrderHistory = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn">
                <span class="material-symbols-rounded" onClick={onClose}>close</span>
            </div>
            <h2>Order History</h2>
        </div>
      </div>
    );
  };

export default OrderHistory;
