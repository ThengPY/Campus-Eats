# Campus Eats

Campus Eats is a web application designed to help students and staff at a university campus find and order food from various cafeterias. The application provides features such as meal planning, order history, community board, and different delivery options.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Cafeteria List**: Browse a list of available cafeterias on campus.
- **Menu Modal**: View the menu of a selected cafeteria and add items to the cart.
- **Meal Planner**: Use the AI Meal Planner to get meal recommendations based on dietary preferences.
- **Order History**: View past orders and their details.
- **Community Board**: Engage with the campus community through posts and discussions.
- **Delivery Options**: Choose between pickup, delivery, and dine-in options.
- **Cart Management**: Add, remove, and manage items in the cart.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- SQLite3 installed for the database.

### Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/campus-eats.git
   cd campus-eats

2. **Install dependencies**:
    ```sh
    npm install

3. **Set up the database**:
- Ensure SQLite3 is installed.
- The database will be created and initialized automatically when the server starts.

4. **Start the server**:
    ```sh
    npm start

## Usage

1. **Open the application**:
   - Open your web browser and navigate to `http://localhost:3000`.

2. **Browse cafeterias**:
   - View the list of available cafeterias and their menus.

3. **Use the AI Meal Planner**:
   - Get meal recommendations based on your dietary preferences.

4. **Manage your cart**:
   - Add items to your cart and proceed to checkout.

5. **View order history**:
   - Check your past orders and their details.

6. **Engage with the community**:
   - Post and discuss on the community board.

## Project Structure 
campus-eats/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AiMealPlanner.js
│   │   ├── CafeteriaList.js
│   │   ├── CartModal.js
│   │   ├── CommunityBoard.js
│   │   ├── Delivery.js
│   │   ├── DineIn.js
│   │   ├── Header.js
│   │   ├── MenuModal.js
│   │   ├── OrderHistory.js
│   │   ├── PickUp.js
│   │   └── SignUpPage.js
│   ├── img/
│   │   ├── kk1.png
│   │   ├── kk2.png
│   │   └── ...
│   ├── styles/
│   │   ├── styles.css
│   │   ├── Modal.css
│   │   └── Checkout.css
│   ├── App.js
│   ├── dbHandler.js
│   ├── ModelTraining.js
│   ├── Server.js
│   └── index.js
├── .gitignore
├── [package.json](http://_vscodecontentref_/0)
└── [README.md](http://_vscodecontentref_/1)

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch**:
   ```sh
   git checkout -b feature/your-feature
3. **Make your changes.**
4. **Commit your changes**:
    ```sh
    git commit -m 'Add some feature'
5. **Push to the branch**: 
    ```sh
    git push origin feature/your-feature
6. **Open a pull requeast.**

## License
This project is licensed under the MIT License. See the LICENSE file for details.
