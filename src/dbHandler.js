const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Specify the path to the database file
const dbPath = path.join(__dirname, 'database.db');

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {console.error('Error opening database ' + err.message);
    } else {console.log('Connected to the SQLite database.');}
});

// Function to create a table if it doesn't exist
const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             Username TEXT NOT NULL,
             Email TEXT NOT NULL,
             Password TEXT NOT NULL,
             status TEXT NOT NULL,
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(sql, (err) => {
        if (err) {console.error('Error creating table: ' + err.message);
        } else {console.log('Table created or already exists.');}
    });
};

const insertUser  = (name, email, password, status ='buyer') => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (Username, Email, Password, status) VALUES (?, ?, ?, ?)';
        db.run(sql, [name, email, password, status], function(err) {
            if (err) {
                console.error('Error inserting user: ' + err.message);
                reject(err); // Reject the promise on error
            } else {
                console.log(`User  added with ID: ${this.lastID}`);
                resolve(); // Resolve the promise on success
            }
        });
    });
};

const loginUser  = (username, email, password, callback) => {
    const sql = 'SELECT * FROM users WHERE Username = ? AND Email =? AND Password = ?';

    db.get(sql, [username, email, password], (err, row) => {
        if (err) {
            console.error('Error querying user: ' + err.message);
            callback(err, null);
            return;
        }

        // If a row is found, the credentials are correct
        if (row) {
            console.log('Login successful:', row);
            callback(null, row); // Pass the user data to the callback
        } else {
            console.log('Login failed: Incorrect username, email or password');
            callback(null, null); // No user found
        }
    });
};

// Function to create the reservations table if it doesn't exist
const createReservationsTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS reservations (
                                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    username TEXT NOT NULL,
                                                    table_number INTEGER NOT NULL,
                                                    pax INTEGER NOT NULL,
                                                    reservation_time DATETIME NOT NULL,
                                                    location TEXT NOT NULL
        )
    `;

    db.run(sql, (err) => {
        if (err) {console.error('Error creating reservations table: ' + err.message);
        } else {console.log('Reservations table created or already exists.');
        }
    });
};

// Function to insert a reservation
const insertReservation = (username,table_number,pax,reservation_time, location) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO reservations(username,table_number,pax,reservation_time, location) VALUES (?,?,?,?,?)';

        db.run(sql, [username,table_number,pax,reservation_time, location], function(err) {
            if (err) {
                console.error('Error inserting reservation: ' + err.message);
                reject(err); // Reject the promise on error
            } else {
                console.log(`Reservation added with ID: ${this.lastID}`);
                resolve(); // Resolve the promise on success
            }
        });
    });
};

// Function to get a user by email
const getUser = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.get(sql, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};

//Function to create the orders table if it doesn't exist
const createOrdersTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS orders (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT NOT NULL,
              order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              order_item TEXT NOT NULL,
              price REAL NOT NULL,
              payment_method TEXT NOT NULL,
              card_number TEXT,
              pickup_date DATE,
              pickup_time TIME,
              FOREIGN KEY (username) REFERENCES users(Username)
        )
    `;

    db.run(sql, (err) => {
        if (err) {console.error('Error creating orders table:' + err.message);}
        else {console.log('Orders table created or already exists.');}
    });
};

// Function to insert an order
const insertOrder = (username, order_item, price, payment_method, card_number = null, pickup_date = null, pickup_time = null) => {
    return new Promise((resolve, reject) => {
        // Construct the SQL query dynamically
        let sql = 'INSERT INTO orders(username, order_item, price, payment_method';
        const values = [username, order_item, price,payment_method];

        // Check for optional fields and add them to the SQL query and values array
        if (card_number !== null) {
            sql += ', card_number';
            values.push(card_number);
        }
        if (pickup_date !== null) {
            sql += ', pickup_date';
            values.push(pickup_date);
        }
        if (pickup_time !== null) {
            sql += ', pickup_time';
            values.push(pickup_time);
        }

        sql += ') VALUES (?' + ', ?'.repeat(values.length - 1) + ')'; // Create placeholders for values

        db.run(sql, values, function(err) {
            if (err) {
                console.error('Error inserting order: ' + err.message);
                reject(err);
            } else {
                console.log(`Order added with ID: ${username}`);
                resolve(username); // Resolve with the last inserted ID
            }
        });
    });
};

//Function to retrieve user's order history
const getUsersOrders = (username, callback) => {
    const sql = 'SELECT * FROM orders WHERE username = ?';

    db.all(sql, [username], (err, rows) => {
        if (err) {
            console.error('Error querying orders: '+  err.message);
            callback(err, null);
            return;
        }

        if (rows.length>0){
            console.log('User orders retrieved:', rows);
            callback(null, rows);
        } else {
            console.log('No orders found for this user.');
            callback(null, null);
        }
    });
};

const createCommentsTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS comments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT NOT NULL,
              comment TEXT NOT NULL,
              FOREIGN KEY (username) REFERENCES users(Username)
        )
    `;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating comments table: ' + err.message);
        } else {
            console.log('Comments table created or already exists.');
        }
    });
};

// Function to insert a comment
const insertComment = (username, comment) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO comments(username, comment) VALUES (?, ?)';

        db.run(sql, [username, comment], function(err) {
            if (err) {
                console.error('Error inserting comment: ' + err.message);
                reject(err); // Reject the promise on error
            } else {
                console.log(`Comment added with ID: ${this.lastID}`);
                resolve(); // Resolve the promise on success
            }
        });
    });
};

//Function to get all comments
const getComments = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM comments`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};


createTable()
createReservationsTable()
createOrdersTable()



// Export the database connection for use in other modules
module.exports ={ db,createTable,insertUser,loginUser,createReservationsTable,
                    insertReservation,getUser, createOrdersTable, insertOrder,
                    getUsersOrders,createCommentsTable,insertComment,getComments
                };