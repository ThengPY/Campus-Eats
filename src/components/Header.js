import React from 'react';
import '../styles.css';
import ad1 from '../img/ad1.jpg'; 
import banner from '../img/LandingPageBanner.jpg'
import HamburgerMenu from './HamburgerMenu';

function Header({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick, onCommunityBoardClick }) {

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
        }
      };

    return (
        <>
            <header> 
                <div className="logo"></div>
                <HamburgerMenu 
                    onCartClick = {onCartClick}
                    onOrderHistoryClick = {onOrderHistoryClick}
                    onProfileClick = {onProfileClick}
                    onMealPlannerClick = {onMealPlannerClick}
                    onCommunityBoardClick = {onCommunityBoardClick}
                />
            </header>

            <main>
                <div className = "LandingPageBanner">
                    <div className = "textbox">
                        <h1 className = "welcome" style = {{color : "#568d33", marginBottom : "0px", fontSize : "3rem"}}>Welcome!</h1>
                        <p classnName = "welcome-caption" style = {{color : "#cf5f17", fontSize : "1rem", width : "60%"}}>Delicious food made easy: <br />Dine-in, Pickup or Instant Delivery right to your dorm!</p>
                        <div className = "get-started" onClick={() => scrollToSection("start")}>
                            <span><b>GET STARTED </b></span>
                            <span class="material-symbols-rounded" style = {{color: "white", fontSize :"20px"}}>arrow_forward</span>
                        </div>
                    </div>
                </div>
                <h3 style={{padding : "20px", marginBottom: "0px"}} id = "start">Start ordering now!</h3>
            </main>
        </>
    );
}

export default Header;