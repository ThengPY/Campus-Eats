import React from 'react';
import '../styles.css';
import logo from '../img/logo.png';
//import mealplannerIcon from '../img/mealplanner.png'; // Adjust the path as necessary
import ad1 from '../img/ad1.jpg'; // Ensure this is the correct path

function Header({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick, onCommunityBoardClick }) {
function Header({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick, onCommunityBoardClick }) {
    return (
        <>
            <header> 
                <div className="logo"></div>
                <HamburgerMenu 
                    onCartClick={onCartClick}
                    onOrderHistoryClick={onOrderHistoryClick}
                    onProfileClick={onProfileClick}
                    onMealPlannerClick={onMealPlannerClick}
                    onCommunityBoardClick={onCommunityBoardClick}
                />
            </header>

            <main>
                <h2>Welcome!</h2>
                <p style={{ color: "black" }}>Campus food made easy: Dine-in, Pickup, or Instant Delivery right to your dorm!</p>
                <div className="ads">
                    <img src={ad1} alt="Ad 1" />
                    <img src={ad1} alt="Ad 2" />
                    <img src={ad1} alt="Ad 3" />
                </div>
                <h3 className = "header-h3">Start ordering now!</h3>
            </main>
        </>
    );
}

export default Header;