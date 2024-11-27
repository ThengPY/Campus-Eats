import React from 'react';
import '../styles.css';
import logo from'../img/logo.png'

function Header({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick, onCommunityBoardClick }) {
    return (
        <header> 
            {/* <span className = "material-symbols-rounded">menu</span>  */}
            <div className = "logo"></div>
            <div className = "right-icons">  
                <span className="material-symbols-rounded" onClick={onCartClick}>shopping_bag </span>
                <span className="material-symbols-rounded" onClick={onOrderHistoryClick}>history</span>
                <span className="material-symbols-rounded" onClick={onMealPlannerClick}>smart_toy</span>
                <span className="material-symbols-rounded" onClick={onProfileClick}>person</span>
                <span className="material-symbols-rounded" onClick={onCommunityBoardClick}>forum</span>
            </div>
            {/* <div><h3>Hello</h3></div> */}
       
        </header>
    );
}
export default Header;
