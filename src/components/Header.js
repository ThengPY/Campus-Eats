import React from 'react';
import '../styles.css';
import logo from'../img/logo.png'
//import mealplannerIcon from '../img/mealplanner.png'; // Adjust the path as necessary


function Header({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick }) {
    return (
        <header> 
            {/* <span className = "material-symbols-rounded">menu</span>  */}
            <div className = "logo"></div>
            <div className = "right-icons">  
                <span className="material-symbols-rounded" onClick={onCartClick}>shopping_bag </span>
                <span className="material-symbols-rounded" onClick={onOrderHistoryClick}>history</span>
                <span className="material-symbols-rounded" onClick={onMealPlannerClick}>smart_toy</span>
                <span className="material-symbols-rounded" onClick={onProfileClick}>person</span>
            </div>
            {/* <div><h3>Hello</h3></div> */}
       
        </header>
    );
}
export default Header;
