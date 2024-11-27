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
              {cartItems.map(item => (
                <li key={item.id}>
                  <span>
                    {`${item.name} (${item.cafeteria})  [ x${item.quantity} ] --- RM${(item.price * item.quantity).toFixed(2)}`}
                  </span>
                  <span class="material-symbols-rounded" onClick={() => onRemoveFromCart(item.id)}>delete</span>
                </li>
              ))}
              <div >
                <div style={{paddingTop: "20px"}}>-------------------------------------------------------</div>
                <b>Total Price: RM{updatedTotalPrice.toFixed(2)} </b>
                <div style={{paddingBottom: "10px"}}>-------------------------------------------------------</div>
                <h3 style={{ marginBottom: '0px' }}>Choose how you’d like to enjoy your meal: </h3>
                {!isDineInAllowed() && (
                    <p style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>(Dine-in is only available when all orders are from the same cafeteria.)</p>
                     )}
                        <button style={{marginTop: "18px"}}
                          className='DineInBtn' 
                          onClick={onDineInClick} 
                          disabled={!isDineInAllowed()}
                        >Dine In</button>
                 {/* <button className='DineInBtn' onClick={onDineInClick}>Dine In</button> */}
                <button className='DeliveryBtn' onClick={onDeliveryClick}>Delivery</button> 
                <button className='PickupBtn' onClick={onPickupClick}>Pickup</button>
              </div>
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  export default CartModal;