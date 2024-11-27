import React from 'react';
import '../styles.css';
//import mealplannerIcon from '../img/mealplanner.png'; // Adjust the path as necessary


function Header({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick }) {
    return (
        <header> 
            {/* <span className = "material-symbols-rounded">menu</span>  */}
            <h1>Campus Eats</h1>
            <div className = "right-icons">  
                <span className="material-symbols-rounded" onClick={onCartClick}>shopping_bag </span>
                <span className="material-symbols-rounded" onClick={onOrderHistoryClick}>history</span>
                <span className="material-symbols-rounded" onClick={onProfileClick}>person</span>
                <span className="material-symbols-rounded" onClick={onMealPlannerClick}>meal</span>
            </div>
        </header>
    );
}
export default Header;
