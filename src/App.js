import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
import DeliveryPopUp from './components/DeliveryPopUp.js';
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
  const [showDeliveryPopUp, setShowDeliveryPopUp] = useState(false);
  const [DeliveryPopUpMessage, setDeliveryPopUpMessage] = useState('');


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
          { id: 1, name: 'Nasi Lemak', price: 5, type: 'NonVege' },
          { id: 2, name: 'Nasi Goreng Ayam', price: 5, type: 'NonVege' },
          { id: 3, name: 'Tomyam Seafood', price: 5, type: 'NonVege' },
          { id: 4, name: 'Satay', price: 3.50, type: 'NonVege' },
          { id: 5, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
          { id: 6, name: 'Char Kuey Teow', price: 6, type: 'NonVege' },
          { id: 7, name: 'Hokkien Mee', price: 4.50, type: 'NonVege' },
          { id: 8, name: 'Maggie Goreng', price: 3.50, type: 'NonVege' }, 
          { id: 9, name: 'Roti Tisu', price: 4, type: 'Vege' }
        ],
        drinks: [
          { id: 10, name: 'Teh Tarik', price: 2.50 },
          { id: 11, name: 'Kopi O', price: 2.50 },
          { id: 12, name: 'Sirap Bandung', price: 2 },
          { id: 13, name: 'Apple Juice', price: 4.5 },
          { id: 14, name: 'Limau Ais', price: 2.50 },
          { id: 15, name: 'Ais Kacang', price: 3 },
          { id: 16, name: 'Air Tebu', price: 2 }
        ]
      },
      2: {
        food: [
          { id: 17, name: 'Mee Goreng', price: 4, type: 'NonVege' },
          { id: 18, name: 'Roti Canai', price: 2.50, type: 'Vege' },
          { id: 19, name: 'Murtabak', price: 5, type: 'NonVege' },
          { id: 20, name: 'Laksa', price: 5.50 , type: 'Non Vege'},
          { id: 21, name: 'Nasi Kandar', price: 5, type: 'NonVege' },
          { id: 22, name: 'Char Kuey Teow', price: 5.50, type: 'NonVege' },
          { id: 23, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
          { id: 24, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
          { id: 25, name: 'Roti Tisu', price: 4,  type: 'Vege' }
        ],
        drinks: [
          { id: 26, name: 'Milo', price: 4 },
          { id: 27, name: 'Teh Ais', price: 3.5 },
          { id: 28, name: 'Orange Juice', price: 4 },
          { id: 29, name: 'Ais Kacang', price: 5 },
          { id: 30, name: 'Sirap Bandung', price: 2.50 },
          { id: 31, name: 'Apple Juice', price: 4 },
          { id: 32, name: 'Limau Ais', price: 2.50 },
          { id: 33, name: 'Ais Kacang', price: 3 },
          { id: 34, name: 'Air Tebu', price: 2 }
        ]
      },
      3: {
        food: [
          { id: 35, name: 'Nasi Lemak', price: 5, type: 'NonVege' },
          { id: 36, name: 'Nasi Goreng Ayam', price: 5, type: 'NonVege' },
          { id: 37, name: 'Nasi Dagang', price: 5.50, type: 'NonVege' },
          { id: 38, name: 'Ikan Bakar', price: 6, type: 'NonVege' },
          { id: 39, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
          { id: 40, name: 'Char Kuey Teow', price: 4.50, type: 'NonVege' },
          { id: 41, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
          { id: 42, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
          { id: 43, name: 'Roti Tisu', price: 4, type: 'Vege' } 
        ],
        drinks: [
          { id: 44, name: 'Teh Tarik', price: 4 },
          { id: 45, name: 'Kopi O', price: 3.5 },
          { id: 46, name: 'Sirap Limau', price: 2 },
          { id: 47, name: 'Air Tebu', price: 3.5 },
          { id: 48, name: 'Sirap Bandung', price: 2.50 },
          { id: 49, name: 'Apple Juice', price: 4.50 },
          { id: 50, name: 'Limau Ais', price: 3.50 },
          { id: 51, name: 'Ais Kacang', price: 3 },
          { id: 52, name: 'Air Tebu', price: 2 }
        ]
      },
      4: {
        food: [
          { id: 53, name: 'Mee Goreng', price: 3.50, type: 'NonVege' },
          { id: 54, name: 'Roti Canai', price: 2.50, type: 'Vege' },
          { id: 55, name: 'Nasi Kerabu', price: 5.50, type: 'NonVege' },
          { id: 56, name: 'Nasi Kandar', price: 5.50, type: 'NonVege'},
          { id: 57, name: 'Char Kuey Teow', price: 5.50, type: 'NonVege' },
          { id: 58, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
          { id: 59, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
          { id: 60, name: 'Roti Tisu', price: 3.50, type: 'Vege' }
        ],
        drinks: [
          { id: 61, name: 'Milo', price: 4 },
          { id: 62, name: 'Teh O Limau', price: 3.50 },
          { id: 63, name: 'Sirap Bandung', price: 2.50 },
          { id: 64, name: 'Apple Juice', price: 4.50 },
          { id: 65, name: 'Limau Ais', price: 3.50 },
          { id: 66, name: 'Ais Kacang', price: 5 },
          { id: 67, name: 'Air Tebu', price: 2 }
        ]
      },
      5: {
        food: [
          { id: 68, name: 'Nasi Lemak', price: 5, type: 'NonVege' },
          { id: 69, name: 'Nasi Goreng Ayam', price: 5, type: 'NonVege' },
          { id: 70, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
          { id: 71, name: 'Char Kuey Teow', price: 4.5, type: 'NonVege' },
          { id: 72, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
          { id: 73, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
          { id: 74, name: 'Roti Tisu', price: 4, type: 'Vege' }
        ],
        drinks: [
          { id: 75, name: 'Teh Tarik', price: 3.50 },
          { id: 76, name: 'Kopi O', price: 3.50 },
          { id: 77, name: 'Sirap Bandung', price: 2.50 },
          { id: 78, name: 'Air Mata Kucing', price: 2.5 },
          { id: 79, name: 'Limau Ais', price: 3.50 },
          { id: 80, name: 'Ais Kacang', price: 5 },
          { id: 81, name: 'Air Tebu', price: 2 }
        ]
      },
      6: {
        food: [
          { id: 82, name: 'Mee Goreng', price: 5, type: 'NonVege' },
          { id: 83, name: 'Roti Canai', price: 5, type: 'Vege' },
          { id: 84, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
          { id: 85, name: 'Char Kuey Teow', price: 5.5, type: 'NonVege' },
          { id: 86, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
          { id: 87, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
          { id: 88, name: 'Roti Tisu', price: 4, type: 'Vege' }
        ],
        drinks: [
          { id: 89, name: 'Teh Tarik', price: 3 },
          { id: 90, name: 'Kopi O', price: 3 },
          { id: 91, name: 'Sirap Bandung', price: 2.50 },
          { id: 92, name: 'Air Mata Kucing', price: 3 },
          { id: 93, name: 'Limau Ais', price: 3.50 },
          { id: 94, name: 'Ais Kacang', price: 3 },
          { id: 95, name: 'Air Tebu', price: 2 }
        ]
    },
    
    7: {
      food: [
        { id: 96, name: 'Nasi Lemak', price: 5, type: 'NonVege' },
        { id: 97, name: 'Nasi Goreng Ayam', price: 5, type: 'NonVege' },
        { id: 98, name: 'Tomyam Seafood', price: 5, type: 'NonVege' },
        { id: 99, name: 'Satay', price: 3.5, type: 'NonVege' },
        { id: 100, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
        { id: 101, name: 'Char Kuey Teow', price: 6, type: 'NonVege' },
        { id: 102, name: 'Hokkien Mee', price: 5 , type: 'NonVege'},
        { id: 103, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
        { id: 104, name: 'Roti Tisu', price: 3.50, type: 'Vege' }
      ],
      drinks: [
        { id: 105, name: 'Teh Tarik', price: 2.50 },
        { id: 106, name: 'Kopi O', price: 2.50 },
        { id: 107, name: 'Sirap Bandung', price: 3 },
        { id: 108, name: 'Air Mata Kucing', price: 3 },
        { id: 109, name: 'Limau Ais', price: 2.50 },
        { id: 110, name: 'Ais Kacang', price: 3 },
        { id: 111, name: 'Air Tebu', price: 2 }
      ]
    },
    8: {
      food: [
        { id: 112, name: 'Mee Goreng', price: 4, type: 'NonVege' },
        { id: 113, name: 'Roti Canai', price: 2.50, type: 'Vege' },
        { id: 114, name: 'Murtabak', price: 6.50, type: 'NonVege' },
        { id: 115, name: 'Laksa', price: 5.50, type: 'NonVege' },
        { id: 116, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
        { id: 117, name: 'Char Kuey Teow', price: 6, type: 'NonVege' },
        { id: 118, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
        { id: 119, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
        { id: 120, name: 'Roti Tisu', price: 4, type: 'Vege' }
      ],
      drinks: [
        { id: 121, name: 'Milo', price: 4 },
        { id: 122, name: 'Teh Ais', price: 3 },
        { id: 123, name: 'Limau Ais', price: 2 },
        { id: 124, name: 'Ais Kacang', price: 5 },
        { id: 125, name: 'Sirap Bandung', price: 2.50 },
        { id: 126, name: 'Air Mata Kucing', price: 3 },
        { id: 127, name: 'Orange Juice', price: 4.50 },
        { id: 128, name: 'Ais Kacang', price: 3 },
        { id: 129, name: 'Air Tebu', price: 2 }
      ]
    },
    9: {
      food: [
        { id: 130, name: 'Nasi Lemak', price: 5, type: 'NonVege' },
        { id: 131, name: 'Nasi Goreng Ayam', price: 5, type: 'NonVege' },
        { id: 132, name: 'Nasi Dagang', price: 7, type: 'NonVege' },
        { id: 133, name: 'Ikan Bakar', price: 9 , type: 'NonVege'},
        { id: 134, name: 'Nasi Kandar', price: 5.50,  type: 'NonVege'},
        { id: 135, name: 'Char Kuey Teow', price: 6, type: 'NonVege' },
        { id: 136, name: 'Hokkien Mee', price: 5  , type: 'NonVege'},
        { id: 137, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
        { id: 138, name: 'Roti Tisu', price: 4, type: 'Vege' }
      ],
      drinks: [
        { id: 139, name: 'Teh Tarik', price: 3.5 },
        { id: 140, name: 'Kopi O', price: 3.5 },
        { id: 141, name: 'Sirap Limau', price: 4 },
        { id: 142, name: 'Air Tebu', price: 4 },
        { id: 143, name: 'Sirap Bandung', price: 2.50 },
        { id: 144, name: 'Air Mata Kucing', price: 3 },
        { id: 145, name: 'Limau Ais', price: 2.50 },
        { id: 146, name: 'Ais Kacang', price: 3 },
        { id: 147, name: 'Air Tebu', price: 2 }
      ]
    },
    10: {
      food: [
        { id: 148, name: 'Mee Goreng', price: 5, type: 'NonVege' },
        { id: 149, name: 'Roti Canai', price: 5 , type: 'Vege'},
        { id: 150, name: 'Nasi Kerabu', price: 8 , type: 'NonVege'},
        { id: 151, name: 'Nasi Kandar', price: 5.50 , type: 'NonVege'},
        { id: 152, name: 'Char Kuey Teow', price: 6 , type: 'NonVege'},
        { id: 153, name: 'Hokkien Mee', price: 5 ,  type: 'NonVege'},
        { id: 154, name: 'Maggie Goreng', price: 4.50 , type: 'NonVege'},
        { id: 155, name: 'Roti Tisu', price: 4, type: 'Vege' }
      ],
      drinks: [
        { id: 156, name: 'Milo', price: 4 },
        { id: 157, name: 'Teh O Limau', price: 3 },
        { id: 158, name: 'Sirap Bandung', price: 2.50 },
        { id: 159, name: 'Air Mata Kucing', price: 3 },
        { id: 160, name: 'Limau Ais', price: 1.50 },
        { id: 161, name: 'Ais Kacang', price: 3 },
        { id: 162, name: 'Air Tebu', price: 2 }
      ]
    },
    11: {
      food: [
        { id: 163, name: 'Nasi Lemak', price: 5, type: 'NonVege' },
        { id: 164, name: 'Nasi Goreng Ayam', price: 5,  type: 'NonVege'},
        { id: 165, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
        { id: 166, name: 'Char Kuey Teow', price: 6, type: 'NonVege' },
        { id: 167, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
        { id: 168, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
        { id: 169, name: 'Roti Tisu', price: 4, type: 'Vege' }
      ],
      drinks: [
        { id: 170, name: 'Teh Tarik', price: 3 },
        { id: 171, name: 'Kopi O', price: 4 },
        { id: 172, name: 'Sirap Bandung', price: 2.50 },
        { id: 173, name: 'Air Mata Kucing', price: 3 },
        { id: 174, name: 'Limau Ais', price: 3.50 },
        { id: 175, name: 'Ais Kacang', price: 3 },
        { id: 176, name: 'Air Tebu', price: 2 }
      ]
    },
    12: {
      food: [
        { id: 177, name: 'Mee Goreng', price: 5, type: 'NonVege' },
        { id: 178, name: 'Roti Canai', price: 5, type: 'Vege' },
        { id: 179, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
        { id: 180, name: 'Char Kuey Teow', price: 6, type: 'NonVege' }, 
        { id: 181, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
        { id: 182, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
        { id: 183, name: 'Roti Tisu', price: 4, type: 'Vege' }
      ],
      drinks: [
        { id: 184, name: 'Teh Tarik', price: 3 },
        { id: 185, name: 'Kopi O', price: 4 },
        { id: 186, name: 'Sirap Bandung', price: 2.50 },
        { id: 187, name: 'Air Mata Kucing', price: 3 },
        { id: 188, name: 'Limau Ais', price: 3.50 },
            { id: 189, name: 'Ais Kacang', price: 3 },
            { id: 190, name: 'Air Tebu', price: 2 }
          ]
        },
        13: {
          food: [
            { id: 191, name: 'Nasi Lemak', price: 5,type: 'NonVege' },
            { id: 192, name: 'Nasi Goreng Ayam', price: 5, type: 'NonVege' },
            { id: 193, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
            { id: 194, name: 'Char Kuey Teow', price: 6, type: 'NonVege' },
            { id: 195, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
            { id: 196, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
            { id: 197, name: 'Roti Tisu', price: 4, type: 'Vege' }
          ],
          drinks: [
            { id: 198, name: 'Teh Tarik', price: 4 },
            { id: 199, name: 'Kopi O', price: 3 },
            { id: 200, name: 'Sirap Bandung', price: 2.50 },
            { id: 201, name: 'Air Mata Kucing', price: 3 },
            { id: 202, name: 'Limau Ais', price: 2.50 },
            { id: 203, name: 'Ais Kacang', price: 3 },
            { id: 204, name: 'Air Tebu', price: 2 }
          ]
        },
        14: {
          food: [
            { id: 205, name: 'Chicken Chop', price: 10, type: 'NonVege' },
            { id: 206, name: 'Spaghetti', price: 10,type: 'NonVege' },
            { id: 207, name: 'Fish N Chips', price: 10, type: 'NonVege' },
            { id: 208, name: 'Burger', price: 7, type: 'NonVege' },
            { id: 209, name: 'Beef Steak', price: 10, type: 'NonVege' },
            { id: 210, name: 'Mushroom Soup', price: 4.5, type: 'Vege' },
            { id: 211, name: 'Pizza', price: 5.50, type: 'NonVege' },
            { id: 212, name: 'Salad', price: 3, type: 'Vege' }
          ],
          drinks: [
            { id: 213, name: 'Americano', price: 5 },
            { id: 214, name: 'Latte', price: 8 },
            { id: 215, name: 'Mocha', price: 8 },
            { id: 216, name: 'Chocolate', price: 6 },
            { id: 217, name: 'Green Tea Latte', price: 6.5 },
            { id: 218, name: 'Capuccino', price: 7.5 },
            { id: 219, name: 'Spanish Latte', price: 7.5 }
          ]
        },
        15: {
          food: [
            { id: 220, name: 'Nasi Lemak', price: 5, type: 'NonVege' },
            { id: 221, name: 'Nasi Goreng Ayam', price: 5, type: 'NonVege' },
            { id: 222, name: 'Nasi Kandar', price: 5.50, type: 'NonVege' },
            { id: 223, name: 'Char Kuey Teow', price: 6, type: 'NonVege' },
            { id: 224, name: 'Hokkien Mee', price: 5, type: 'NonVege' },
            { id: 225, name: 'Maggie Goreng', price: 4.50, type: 'NonVege' },
            { id: 226, name: 'Roti Tisu', price: 4, type: 'Vege' }
          ],
          drinks: [
            { id: 227, name: 'Teh Tarik', price: 4 },
            { id: 228, name: 'Kopi O', price: 3.5 },
            { id: 229, name: 'Sirap Bandung', price: 2.50 },
            { id: 230, name: 'Apple Juice', price: 3.50 },
            { id: 231, name: 'Limau Ais', price: 2.50 },
            { id: 232, name: 'Ais Kacang', price: 5 },
            { id: 233, name: 'Air Tebu', price: 2 }
          ]
        },
};

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleAddToCart = (item, cafeteriaId) => {
    console.log("Item received in handleAddToCart:", item, cafeteriaId);
    const cafeteria = cafeterias.find((cafeteria) => cafeteria.id === cafeteriaId);
  
    setCartItems((prevCartItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.cafeteria === cafeteria.name
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
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className: "react-toastify-container Toastify__toast--success", // Apply encapsulated styles
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

  // Meal Planner Modal
  const handleMealPlannerClick = () => {
    setIsMealPlannerOpen(true); 
  };

  const handleCloseMealPlanner = () => {
    setIsMealPlannerOpen(false); 
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

  const handleDeliveryNotification = () => {
    fetch(`http://localhost:5000/getDeliveryTime`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch delivery time');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            // Set the delivery popup message with the delivery time
            setDeliveryPopUpMessage(`Delivery available at ${data.deliveryTime}`);
            setShowDeliveryPopUp(true); // Show the delivery popup
            // Set a timeout to hide the popup after 5 seconds
            setTimeout(() => {
              setShowDeliveryPopUp(false); // Hide the delivery popup
            }, 5000);
          } else {
            console.error(data.message);
            setDeliveryPopUpMessage(data.message); // Set error message
            setShowDeliveryPopUp(true); // Show the delivery popup with error message
          }
        })
        .catch(error => {
          console.error('Error fetching delivery time:', error);
          setDeliveryPopUpMessage('An error occurred while fetching delivery time.');
          setShowDeliveryPopUp(true); // Show the delivery popup with error message
        })
  };

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
      onClose={handleCloseMealPlanner} 
      cafeterias={cafeterias}
      foodItems={foodItems} 
      onAddToCart={handleAddToCart} // Ensure this is passed correctly
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
      username={localStorage.getItem('username')}
    />

    <CommunityBoard
      isOpen={isCommunityBoardOpen}
      onClose={handleCommunityBoardClose}
    />

    {/* Delivery Message Components */}

    <div className="delivery-button-container" onClick={() => handleDeliveryNotification()}>
      <span class="material-symbols-rounded" style = {{color : "white", transition : "none", transform: "none"}}>local_shipping</span>
    </div>

    {showDeliveryPopUp && (
      <DeliveryPopUp 
        message={DeliveryPopUpMessage} 
        onClose={() => setShowDeliveryPopUp(false)}
      />
    )}

    </div>
  );
};

export default App;