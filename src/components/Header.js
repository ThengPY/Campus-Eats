import React, { useState } from 'react';
import '../styles.css';
import ad1 from '../img/ad1.jpg';
import HamburgerMenu from "./HamburgerMenu.js"; 

function Header() {
    return (
        <>
            <header> 
                <div className="logo"></div>
                <HamburgerMenu />
            </header>

            <main>
                <h2>Welcome!</h2>
                <p style={{ color: "black" }}>Campus food made easy: Dine-in, Pickup, or Instant Delivery right to your dorm!</p>
                <div className="ads">
                    <img src={ad1} alt="Ad 1" />
                    <img src={ad1} alt="Ad 2" />
                    <img src={ad1} alt="Ad 3" />
                </div>
                <h3 style={{marginBottom: "0px", paddingTop: "15px"}}>Start ordering now!</h3>
            </main>
        </>
    );
}

export default Header;
