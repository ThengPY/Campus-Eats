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
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{overflow: "auto"}}>
            <div className="close-btn">
                <span class="material-symbols-rounded" onClick={onClose}>close</span>
            </div>
            <h2>Order History</h2>

            {loading && <p>Loading orders...</p>}
            {error && <p>{error}</p>}

            <div className="subcontent">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="order-item" style = {{borderBottom : "1px solid #e0e0e0"}}>
                            <h3 style = {{borderBottom : "none", marginBottom : "0px"}}>Order ID: {order.id}</h3>
                            <p className="order-product" style = {{color : "#333"}}><b>Product:</b> {order.order_item}</p>
                            <p className="order-price" style = {{color : "#333"}}><b>Total Price:</b> RM{order.price}</p>
                            <p className="order-date" style = {{color : "#333"}}><b>Order Date:</b> {order.formatted_order_date}</p>
                            {/* Conditional rendering for pickup info */}
                            {order.formatted_pickup_date!=null && order.pickup_time!=null && (
                                <p className="pickup-info" style = {{color : "#333"}}>
                                    <b>Pickup:</b> {order.formatted_pickup_date}, {order.pickup_time}
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
