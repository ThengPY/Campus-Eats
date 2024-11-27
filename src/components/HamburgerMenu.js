import React, { useState, useEffect } from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick, onCommunityBoardClick }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); // Mobile breakpoint (adjust as needed)
        };
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar-container">
            {/* Horizontal Navbar */}
            {!isMobile && (
                <div className="right-icons">  
                    <span className="material-symbols-rounded" onClick={onOrderHistoryClick}>history</span>
                    <span className="material-symbols-rounded" onClick={onMealPlannerClick}>smart_toy</span>
                    <span className="material-symbols-rounded" onClick={onCommunityBoardClick}>forum</span>
                    <span className="material-symbols-rounded" onClick={onCartClick}>shopping_bag</span>
                    <span className="material-symbols-rounded" onClick={onProfileClick}>person</span>
                </div>
            )}

        {/* Hamburger Icon */}
        {isMobile && (
            <>
                <span className="material-symbols-rounded hamburger-icon" onClick = {toggleMenu} aria-label = "Toggle menu">menu</span>
                <div className={`menu-dropdown ${isOpen ? "open" : ""}`}>
                    <ul>
                        <li onClick={onOrderHistoryClick}>Order History</li>
                        <li>AI Meal Planner</li>
                        <li>Forum</li>
                        <li>Cart</li>
                        <li>Account</li>
                    </ul>
                </div>
            </>
        )}
        


        {/* Dropdown Menu */}
        
    </div>
  );
};

export default HamburgerMenu;
