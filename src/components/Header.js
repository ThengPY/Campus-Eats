import React from 'react';
import '../styles.css';
import logo from '../img/logo.png';
//import mealplannerIcon from '../img/mealplanner.png'; // Adjust the path as necessary
import ad1 from '../img/ad1.jpg'; // Ensure this is the correct path

function Header({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick, onCommunityBoardClick }) {
    return (
        <>
            <header> 
                <div className="logo"></div>
                <div className="right-icons">  
                    <span className="material-symbols-rounded" onClick={onCartClick}>shopping_bag</span>
                    <span className="material-symbols-rounded" onClick={onOrderHistoryClick}>history</span>
                    <span className="material-symbols-rounded" onClick={onMealPlannerClick}>smart_toy</span>
                    <span className="material-symbols-rounded" onClick={onCommunityBoardClick}>forum</span>
                    <span className="material-symbols-rounded" onClick={onProfileClick}>person</span>
                    </div>
            </header>

            <main>
                <h2>Welcome Back!</h2>
                <p style={{ color: "black" }}>Start shopping for unbeatable deals on food you love.</p>
                <div className="ads">
                    <img src={ad1} alt="Ad 1" />
                    <img src={ad1} alt="Ad 2" />
                    <img src={ad1} alt="Ad 3" />
                </div>
                <h3>Start ordering now!</h3>
            </main>
        </>
    );
}

export default Header;
