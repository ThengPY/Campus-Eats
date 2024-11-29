import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";

const OrderHistory = ({ isOpen, onClose, username}) => {
    if (!isOpen) return null;

    // State to manage orders
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders when the component mounts
    useEffect(() => {
        if (username) {
            fetchOrders(username);
        }
    }, [username]);

    // Function to fetch orders from the server
    const fetchOrders = (username) => {
        setLoading(true);
        setError(null);
        fetch(`http://localhost:5000/orders/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setOrders(data.orders);
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setError('An error occurred while fetching orders.');
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn">
                <span class="material-symbols-rounded" onClick={onClose}>close</span>
            </div>
            <h2>Order History</h2>

            {loading && <p>Loading orders...</p>}
            {error && <p>{error}</p>}

            <div className="orders-list">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="order-item">
                            <p className="order-id"><strong>Order ID:</strong> {order.id}</p>
                            <p className="order-product"><strong>Product:</strong> {order.order_item}</p>
                            <p className="order-price"><strong>Price:</strong> RM{order.price}</p>
                            <p className="order-date"><strong>Date:</strong> {order.formatted_order_date}</p>
                            {/* Conditional rendering for pickup info */}
                            {order.formatted_pickup_date!=null && order.pickup_time!=null && (
                                <p className="pickup-info">
                                    <strong>Pickup:</strong>
                                    {order.formatted_pickup_date}, {order.pickup_time}
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
      </div>
    );
};

export default OrderHistory;
