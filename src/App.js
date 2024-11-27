import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import CafeteriaList from './components/CafeteriaList.js';
import Header from './components/Header.js';
import MenuModal from './components/MenuModal.js';
import PickUp from './components/PickUp.js';
import Delivery from './components/Delivery.js';
import DineIn from './components/DineIn.js';
import CartModal from './components/CartModal.js';
import SignUpPage from './components/SignUpPage.js';
import AiMealPlanner from './components/AiMealPlanner.js';
import OrderHistory from './components/OrderHistory.js';
import CommunityBoard from './components/CommunityBoard.js'; 
import kk12 from './img/kk12.JPG';
import kk1 from './img/kk1.png';
import kk2 from './img/kk2.png';
import kk3 from './img/kk3.jpg';
import kk4 from './img/kk4.png';
import kk5 from './img/kk5.png';
import kk6 from './img/kk6.jpeg';
import kk7 from './img/kk7.png';
import kk8 from './img/kk8.png';
import kk9 from './img/kk9.jpg';
import kk10 from './img/kk10.png';
import kk11 from './img/kk11.jpg';
import kk13 from './img/kk13.png';
import he_and_she from './img/he_and_she.jpeg'
import QBistro from './img/QBistro.jpeg';
import HamburgerMenu from './components/HamburgerMenu.js';

const App = () => {
  const [selectedCafeteria, setSelectedCafeteria] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false); // Control visibility of the cart
  const [cartItems, setCartItems] = useState([]); // State to manage cart items
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isPickUpModalOpen, setIsPickUpModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isMealPlannerOpen, setIsMealPlannerOpen] = useState(false);
  const [isDineInModalOpen, setIsDineInModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isCommunityBoardOpen, setIsCommunityBoardOpen] = useState(false);


  //set default username
  useEffect(() => {
    localStorage.setItem('username', ''); // Set username to empty string on startup
  }, []);


  const cafeterias = [
    { id: 1, name: 'KK1', image: kk1 },
    { id: 2, name: 'KK2', image: kk2  },
    { id: 3, name: 'KK3', image: kk3  },
    { id: 4, name: 'KK4', image: kk4  },
    { id: 5, name: 'KK5', image: kk5  },
    { id: 6, name: 'KK6', image: kk6 },
    { id: 7, name: 'KK7', image: kk7  },
    { id: 8, name: 'KK8', image: kk8  },
    { id: 9, name: 'KK9', image: kk9  },
    { id: 10, name: 'KK10', image: kk10  },
    { id: 11, name: 'KK11', image: kk11  },
    { id: 12, name: 'KK12', image: kk12  },
    { id: 13, name: 'KK13', image: kk13  },
    { id: 14, name: 'He & She Coffee', image: he_and_she },
    { id: 15, name: 'Q Bistro', image: QBistro }
  ];

  // Food and Drinks Menu
  const foodItems = {
    1: {
      food: [
        { id: 1, name: 'Nasi Lemak', price: 5 },
        { id: 2, name: 'Nasi Goreng Ayam', price: 5  },
        { id: 61, name: 'Chicken Rendang', price: 8  },
        { id: 62, name: 'Satay', price: 6  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 3, name: 'Teh Tarik', price: 2.50  },
        { id: 4, name: 'Kopi O', price: 2.50  },
        { id: 63, name: 'Sirap Bandung', price: 3  },
        { id: 64, name: 'Air Mata Kucing', price: 3  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    2: {
      food: [
        { id: 5, name: 'Mee Goreng', price: 4  },
        { id: 6, name: 'Roti Canai', price: 2.50  },
        { id: 65, name: 'Murtabak', price: 7  },
        { id: 66, name: 'Laksa', price: 6  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 7, name: 'Milo', price: 3  },
        { id: 8, name: 'Teh Ais', price: 3  },
        { id: 67, name: 'Jus Limau', price: 4  },
        { id: 68, name: 'Ais Kacang', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    3: {
      food: [
        { id: 9, name: 'Nasi Lemak', price: 5  },
        { id: 10, name: 'Nasi Goreng Ayam', price: 5  },
        { id: 69, name: 'Nasi Dagang', price: 7  },
        { id: 70, name: 'Ikan Bakar', price: 9  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 11, name: 'Teh Tarik', price: 5  },
        { id: 12, name: 'Kopi O', price: 5  },
        { id: 71, name: 'Sirap Limau', price: 4  },
        { id: 72, name: 'Air Tebu', price: 4  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    4: {
      food: [
        { id: 13, name: 'Mee Goreng', price: 5  },
        { id: 14, name: 'Roti Canai', price: 5  },
        { id: 73, name: 'Nasi Kerabu', price: 8  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 15, name: 'Milo', price: 5  },
        { id: 16, name: 'Teh O Limau', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    5: {
      food: [
        { id: 17, name: 'Nasi Lemak', price: 5  },
        { id: 18, name: 'Nasi Goreng Ayam', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 19, name: 'Teh Tarik', price: 5  },
        { id: 20, name: 'Kopi O', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    6: {
      food: [
        { id: 21, name: 'Mee Goreng', price: 5  },
        { id: 22, name: 'Roti Canai', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 23, name: 'Milo', price: 5  },
        { id: 24, name: 'Teh Ais', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    7: {
      food: [
        { id: 25, name: 'Nasi Lemak', price: 5  },
        { id: 26, name: 'Nasi Goreng Ayam', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 27, name: 'Teh Tarik', price: 5  },
        { id: 28, name: 'Kopi O', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    8: {
      food: [
        { id: 29, name: 'Nasi Goreng Cina', price: 5  },
        { id: 30, name: 'Roti Canai', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 31, name: 'Kopi', price: 5  },
        { id: 32, name: 'Orange Juice', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    9: {
      food: [
        { id: 33, name: 'Nasi Lemak', price: 5  },
        { id: 34, name: 'Nasi Goreng Ayam', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 35, name: 'Teh Tarik', price: 5  },
        { id: 36, name: 'Kopi O', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    10: {
      food: [
        { id: 37, name: 'Maggie Goreng', price: 5  },
        { id: 38, name: 'Roti Telur', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 39, name: 'Kopi O', price: 5  },
        { id: 40, name: 'Teh O Ais', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    11: {
      food: [
        { id: 41, name: 'Nasi Kukus', price: 5  },
        { id: 42, name: 'Nasi Goreng Ayam', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 43, name: 'Teh Tarik', price: 5  },
        { id: 44, name: 'Kopi O', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    12: {
      food: [
        { id: 45, name: 'Nasi Ayam Penyet', price: 5  },
        { id: 46, name: 'Nasi Goreng Tomyam', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 47, name: 'Apple Juice', price: 5  },
        { id: 48, name: 'Teh Ais', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    13: {
      food: [
        { id: 49, name: 'Bihun Goreng', price: 5  },
        { id: 50, name: 'Roti Canai', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 51, name: 'Milo', price: 5  },
        { id: 52, name: 'Teh Ais', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
    14: {
      food: [
        { id: 53, name: 'Carbonara Spaghetti', price: 15  },
        { id: 54, name: 'Bolognese Spaghetti', price: 15  },
        { id: 74, name: 'Grilled Chicken Chop', price: 18 },
        { id: 75, name: 'Fish N Chips', price: 18 },
        { id: 76, name: 'Grilled Salmon', price: 20 },
        { id: 77, name: 'Beef Steak', price: 16 },
        { id: 78, name: 'Pizza', price: 10 },
      ],
      drinks: [
        { id: 55, name: 'Americano', price: 5  },
        { id: 56, name: 'Mocha', price: 6  },
        { id: 79, name: 'Latte', price: 5.5 },
        { id: 80, name: 'Capuccino', price: 6 },
        { id: 81, name: 'Chocolate', price: 6 },
        { id: 82, name: 'Iced Lemon Tea', price: 7 },
        { id: 83, name: 'Mojito Mocktail', price: 8 },
      ],
    },
    15: {
      food: [
        { id: 57, name: 'Nasi Lemak', price: 5  },
        { id: 58, name: 'Roti Pisang', price: 5  },
        { id: 74, name: 'Nasi Kandar', price: 5.50 },
        { id: 75, name: 'Char Kway Teow', price: 6 },
        { id: 76, name: 'Hokkien Mee', price: 5 },
        { id: 77, name: 'Banana Leaf Rice', price: 4.50 },
        { id: 78, name: 'Roti Tisu', price: 4 },
      ],
      drinks: [
        { id: 59, name: 'Lemon', price: 5  },
        { id: 60, name: 'Teh Tarik', price: 5  },
        { id: 79, name: 'Sirap Bandung', price: 2.50 },
        { id: 80, name: 'Air Mata Kucing', price: 3 },
        { id: 81, name: 'Jus Limau', price: 3.50 },
        { id: 82, name: 'Ais Kacang', price: 3 },
        { id: 83, name: 'Air Tebu', price: 2 },
      ],
    },
};

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleAddToCart = (item, cafeteriaId) => {
    const cafeteria = cafeterias.find(cafeteria => cafeteria.id === cafeteriaId);
  
    setCartItems(prevCartItems => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCartItems.findIndex(
        cartItem => cartItem.id === item.id && cartItem.cafeteria === cafeteria.name
      );
  
      if (existingItemIndex >= 0) {
        // Item already exists, update the quantity
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1
        };
        return updatedCartItems;
      } else {
        // Item doesn't exist in the cart, add a new item
        return [...prevCartItems, { ...item, cafeteria: cafeteria.name, quantity: 1 }];
      }
    });
  
    toast.success(`${item.name} (${cafeteria.name}) added successfully!`, {
      position: "top-left", 
      autoClose: 1500,
    });
  };
  
  
  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCafeteriaSelect = (cafeteriaId) => {
    setSelectedCafeteria(cafeteriaId);
    setIsModalOpen(true);
  };
  
  // Cart Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // Profile Modal
  const handleProfileClick = () => {
    setIsSignUpModalOpen(true); // Open the modal
  };
  
  // Sign Up / Log In Modal
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false); // Close the modal
  };

  // Pick Up Modal
  const handlePickUpClick = () => {
    setIsPickUpModalOpen(true); // Open the modal
  };

  const handleClosePickUpModal = () => {
    setIsPickUpModalOpen(false); // Close the modal
  };

  // Delivery Modal
  const handleDeliveryClick = () => {
    setIsDeliveryModalOpen(true); // Open the modal
  };

  const handleCloseDeliveryModal = () => {
    setIsDeliveryModalOpen(false); // Close the modal
  };

  const handleMealPlannerClick = () => {
    setIsMealPlannerOpen(true); // Open the AiMealPlanner modal
  };

  const handleCloseMealPlanner = () => {
    setIsMealPlannerOpen(false); // Close the AiMealPlanner modal
  };


   // Dine In Modal
   const handleDineInClick = () => {
    setIsDineInModalOpen(true); // Open the modal
  };

  const handleCloseDineInModal = () => {
    setIsDineInModalOpen(false); // Close the modal
  };

  //Order History
  const handleOrderHistoryClick = () => {
    setIsOrderHistoryOpen(true);
  }

  const handleOrderHistoryClose = () => {
    setIsOrderHistoryOpen(false);
  }

  //Community Board
  const handleCommunityBoardClick = () => {
    setIsCommunityBoardOpen(true);
  }

  const handleCommunityBoardClose = () => {
    setIsCommunityBoardOpen(false);
  }

  return (
    <div className="App">
      <ToastContainer />

      <Header 
        onCartClick={handleCartToggle} 
        onOrderHistoryClick={handleOrderHistoryClick} 
        onProfileClick={handleProfileClick} 
        onMealPlannerClick={handleMealPlannerClick} 
        onCommunityBoardClick={handleCommunityBoardClick} 
      />

      <CafeteriaList cafeterias={cafeterias} onSelect={handleCafeteriaSelect} />

      <MenuModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        foodItems={foodItems[selectedCafeteria] || { food: [], drinks: [] }}
        onAddToCart={(item) => handleAddToCart(item, selectedCafeteria)}
        cafeteria={cafeterias.find(cafeteria => cafeteria.id === selectedCafeteria)}
      />
      {/* <HamburgerMenu></> */}
      <CartModal
        onDeliveryClick={handleDeliveryClick}
        onDineInClick={handleDineInClick}
        onPickupClick={handlePickUpClick}
        isOpen={isCartVisible}
        onClose={handleCartToggle}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        totalPrice={calculateTotalPrice()}
      />

    <SignUpPage isOpen={isSignUpModalOpen} onClose={handleCloseSignUpModal} />

    <PickUp
     isOpen={isPickUpModalOpen} 
     onClose={handleClosePickUpModal}
     cartItems={cartItems}
     totalPrice={calculateTotalPrice()}
     />

    <Delivery
     isOpen={isDeliveryModalOpen} 
     onClose={handleCloseDeliveryModal}
     cartItems={cartItems}
     totalPrice={calculateTotalPrice()}
     />

    <AiMealPlanner
      isOpen={isMealPlannerOpen} 
      onClose={handleCloseMealPlanner} // Pass the handler
    />
    <DineIn
     isOpen={isDineInModalOpen} 
     onClose={handleCloseDineInModal}
     cartItems={cartItems}
     totalPrice={calculateTotalPrice()}
     />

    <OrderHistory
      isOpen={isOrderHistoryOpen}
      onClose={handleOrderHistoryClose}
    />

    <CommunityBoard
      isOpen={isCommunityBoardOpen}
      onClose={handleCommunityBoardClose}
    />

    </div>
  );
};

export default App;