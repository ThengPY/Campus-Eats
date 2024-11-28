import React, { useState, useEffect } from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ onCartClick, onOrderHistoryClick, onProfileClick, onMealPlannerClick, onCommunityBoardClick }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600); // Mobile breakpoint (adjust as needed)
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
                <span className="material-symbols-rounded" onClick = {toggleMenu}>menu</span>
                <div className={`menu-dropdown ${isOpen ? "open" : ""}`}>
                    <div className = "content">
                        <h2>Menu</h2>
                        <ul>
                            <li onClick={onOrderHistoryClick}><span className="material-symbols-rounded" style = {{color : "white", marginRight : "20px"}}>history</span>Order History</li>
                            <li onClick={onMealPlannerClick}><span className="material-symbols-rounded" style = {{color : "white", marginRight : "20px"}}>smart_toy</span>AI Meal Planner</li>
                            <li onClick={onCommunityBoardClick}><span className="material-symbols-rounded" style = {{color : "white", marginRight : "20px"}}>forum</span>Forum</li>
                            <li onClick={onCartClick}><span className="material-symbols-rounded" style = {{color : "white", marginRight : "20px"}}>shopping_bag</span>Cart</li>
                            <li onClick={onProfileClick}><span className="material-symbols-rounded" style = {{color : "white", marginRight : "20px"}}>person</span>Account</li>
                        </ul>
                    </div>
                    <div className = "close-btn">
                        <span className="material-symbols-rounded" style = {{color : "white", margin : "10px"}} onClick = {toggleMenu}>close</span>
                    </div>
                </div>
            </>
        )}        
    </div>
  );
};

export default HamburgerMenu;
