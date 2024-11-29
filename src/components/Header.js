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
                        <p classnName = "welcome-caption" style = {{color : "#cf5f17", fontSize : "1rem", width : "80%"}}>Delicious food made easy: <br />Dine-in, Pickup or Instant Delivery right to your dorm!</p>
                        <div className = "get-started" onClick={() => scrollToSection("start")}>
                            <span  style={{cursor: "pointer"}}><b>GET STARTED </b></span>
                            <span class="material-symbols-rounded" style = {{color: "white", fontSize :"20px"}}>arrow_forward</span>
                        </div>
                    </div>
                </div>
                <div className = "LandingPageContent" id = "start">
                    <h2 className = "cafeteria-title" style={{paddingTop : "20px", marginBottom: "0px", color : "#568d33"}} >Start ordering now!</h2>
                </div>
            </main>
        </>
    );
}

export default Header;