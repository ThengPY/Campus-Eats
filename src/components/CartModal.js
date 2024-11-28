const CartModal = ({ isOpen, onClose, cartItems, onRemoveFromCart, onDineInClick, onDeliveryClick, onPickupClick}) => {
    if (!isOpen) return null; // Don't render the modal if it's not open
  
    // Function to calculate the total price
    const calculateTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    const updatedTotalPrice = calculateTotalPrice();

    // Disallow Dine In when food from different kk are ordered
    const isDineInAllowed = () => {
      const cafeterias = cartItems.map(item => item.cafeteria);
      // Check if all cafeterias are the same
      return cafeterias.every(cafeteria => cafeteria === cafeterias[0]);
    };
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className = "close-btn">
            <span class="material-symbols-rounded" onClick={onClose}>close</span>
          </div>
          <h2>My Cart</h2>
          
          {cartItems.length === 0 ? (
            <p style={{fontSize: "20px"}}>Your cart is empty!</p>
          ) : (
            <ul>
              <div className = "subcontent" style = {{height : "350px"}}>
              {cartItems.map(item => (
                <li key={item.id} style = {{alignItems : "center"}}>
                  <span>
                    {`[ x${item.quantity} ] ${item.name} (${item.cafeteria})  `}
                  </span>
                  <span className = "right-icons">
                    {`RM${(item.price * item.quantity).toFixed(2)}`}
                    <span class="material-symbols-rounded" style = {{fontSize : "22px"}} onClick={() => onRemoveFromCart(item.id)}>delete</span>
                  </span>
                </li>
              ))}
              </div>
              <h4 className = "total-price">Total Price: RM{updatedTotalPrice.toFixed(2)} </h4>
              <div>
                <h3 style={{ marginBottom: '5px' }}>Preferred Dining Method: </h3>
                <div className = "btn-group">
                  <button className={`DineInBtn ${isDineInAllowed() ? "yes" : "no"}`} onClick={onDineInClick} disabled={!isDineInAllowed()}>DINE IN</button>
                  <button className='PickupBtn' onClick={onPickupClick}>PICKUP</button>
                  <button className='DeliveryBtn' onClick={onDeliveryClick}>DELIVERY</button> 
                </div>
                {!isDineInAllowed() && (
                  <p style={{ color: 'red', fontSize: '12px'}}><span class="material-symbols-rounded" style = {{fontSize : "12px", color : "red"}}>error</span> Dine-in is only available when all orders are from the same cafeteria!</p>
                )}
              </div>
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  export default CartModal;