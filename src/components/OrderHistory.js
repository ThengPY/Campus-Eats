import React, { useState, useEffect } from 'react';

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

    // Function to convert SQLite TIMESTAMP to ISO 8601 format
    const convertTimestampToISO = (timestamp) => {
        if (!timestamp) return null; // Handle undefined or null
        return timestamp.replace(' ', 'T') + 'Z'; // Convert to ISO format
    };

    // Function to format the date
    const formatDate = (dateString) => {
        const isoDateString = convertTimestampToISO(dateString);
        const date = new Date(isoDateString);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid date'; // Handle invalid date
        }

        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return `${formattedDate} at ${formattedTime}`;
    };

    // Function to format pickup date and time
    const formatPickupDateTime = (pickupDate, pickupTime) => {
        if (!pickupDate || !pickupTime) return null; // Return null if either is missing

        const formattedDate = formatDate(pickupDate);
        const time = new Date(`1970-01-01T${pickupTime}`); // Create a date object for the time

        // Check if the time is valid
        if (isNaN(time.getTime())) {
            return 'Invalid time'; // Handle invalid time
        }

        const formattedTime = time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        return `${formattedDate} at ${formattedTime}`;
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
                            <p className="order-date"><strong>Date:</strong> {formatDate(order.date)}</p>
                            {order.pickup_date && order.pickup_time && (
                                <p className="pickup-info">
                                    <strong>Pickup:</strong> {formatPickupDateTime(order.pickup_date, order.pickup_time)}
                                </p>
                            )}
                            <hr/>
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
