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
