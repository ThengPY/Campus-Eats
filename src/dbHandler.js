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
const createUserTable = () => {
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

const checkUserExists  = (username, email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE Username = ? OR Email = ?`;
        db.get(sql, [username, email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
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
              option TEXT,
              reservation_time TIME,
              username TEXT NOT NULL,
              delivery_name TEXT,
              order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              order_item TEXT NOT NULL,
              eco_package TEXT,
              own_tableware TEXT,
              bring_container TEXT,
              price REAL NOT NULL,
              address TEXT,
              phone_num INTEGER,
              payment_method TEXT,
              card_number TEXT,
              expiration_date TEXT,
              csv TEXT,
              pickup_date DATE,
              pickup_time TEXT,
              FOREIGN KEY (username) REFERENCES users(Username)
        )
    `;

    db.run(sql, (err) => {
        if (err) {console.error('Error creating orders table:' + err.message);}
        else {console.log('Orders table created or already exists.');}
    });
};

// Function to insert an order
const insertOrder = (username, order_item, price, payment_method = null, option = null, reservation_time = null, delivery_name = null, eco_package = null, bring_container = null, address = null, phone_num = null, card_number = null,expiration_date = null,csv = null, pickup_date = null, pickup_time = null, own_tableware = null) => {
    return new Promise((resolve, reject) => {
        // Construct the SQL query dynamically
        let sql = 'INSERT INTO orders(username, order_item, price';
        const values = [username, order_item, price];

        // Check for optional fields and add them to the SQL query and values array
        if (payment_method !== null) {
            sql += ', payment_method';
            values.push(payment_method);
        }
        if (option !== null) {
            sql += ', option';
            values.push(option);
        }
        if (reservation_time !== null) {
            sql += ', reservation_time';
            values.push(reservation_time);
        }
        if (delivery_name !== null) {  // Check for delivery_name
            sql += ', delivery_name';
            values.push(delivery_name);
        }
        if (eco_package !== null) {
            sql += ', eco_package';
            values.push(eco_package);
        }
        if (bring_container !== null) {
            sql += ', bring_container';
            values.push(bring_container);
        }
        if (own_tableware !== null) {
            sql += ', own_tableware'; // Assuming the column name is own_tableware
            values.push(own_tableware);
        }
        if (address !== null) {
            sql += ', address';
            values.push(address);
        }
        if (phone_num !== null) {
            sql += ', phone_num';
            values.push(phone_num);
        }
        if (card_number !== null) {
            sql += ', card_number';
            values.push(card_number);
        }
        if (expiration_date !== null) {
            sql += ', expiration_date';
            values.push(expiration_date);
        }
        if (csv !== null) {
            sql += ', csv';
            values.push(csv);
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
                console.log(`Order added with ID: ${this.lastID}`); // Use this.lastID to get the last inserted ID
                resolve(this.lastID); // Resolve with the last inserted ID
            }
        });
    });
};

//Function to retrieve user's order history
const getUsersOrders = (username, callback) => {
    const sql = `
    SELECT 
        id, 
        STRFTIME('%d/%m/%Y, %H:%M', order_date) AS formatted_order_date, 
        order_item, 
        price, 
        payment_method,  
        STRFTIME('%d/%m/%Y', pickup_date) AS formatted_pickup_date, 
        pickup_time
    FROM 
        orders 
    WHERE 
        username = ?;
`;
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

// Create the table for model data
// Function to initialize the model_data table
const createModelDataTable = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS model_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hour INTEGER,
                day_of_week INTEGER,
                deliveries INTEGER
            )`, (err) => {
                if (err) {
                    console.error('Error creating model_data table: ' + err.message);
                    reject(err);
                } else {
                    console.log('model_data table created successfully.');
                    resolve(); // Resolve the promise on success
                }
            });
        });
    });
};

const getDataForModelTraining = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT hour, day_of_week, deliveries FROM model_data`; // Select relevant columns
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error retrieving data for model training: ' + err.message);
                reject(err);
            } else {
                // Map the rows to the expected format
                const formattedData = rows.map(row => ({
                    hour: row.hour,
                    day_of_week: row.day_of_week,
                    deliveries: row.deliveries
                }));
                resolve(formattedData); // Resolve with the formatted data
            }
        });
    });
};

// Process deliveries to model table
const processDeliveriesForToday = () => {
    return new Promise((resolve, reject) => {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Step 1: Select orders where option is 'delivery' and order_date is today
        const selectQuery = `SELECT order_date FROM orders WHERE option = 'Delivery' AND DATE(order_date) = ?`;

        db.all(selectQuery, [todayString], (err, rows) => {
            if (err) {
                console.error('Error selecting orders:', err.message);
                return reject(err);
            }

            // Step 2: Process the data to count deliveries by hour
            const deliveryCounts = {};

            rows.forEach(row => {
                const orderDate = new Date(row.order_date);
                const hour = orderDate.getHours();
                const day = orderDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

                const key = `${day}-${hour}`; // Create a unique key for each hour of each day

                if (!deliveryCounts[key]) {
                    deliveryCounts[key] = 0;
                }
                deliveryCounts[key]++;
            });

            // Step 3: Insert processed data into model_data table
            const insertQuery = `INSERT INTO model_data (hour, day_of_week, deliveries) VALUES (?, ?, ?)`;

            const insertPromises = Object.entries(deliveryCounts).map(([key, count]) => {
                const [day, hour] = key.split('-');
                return new Promise((resolve, reject) => {
                    db.run(insertQuery, [hour, day, count], function(err) {
                        if (err) {
                            console.error('Error inserting data into model_data:', err.message);
                            return reject(err);
                        } else {
                            resolve(this.lastID);
                        }
                    });
                });
            });

            Promise.all(insertPromises)
                .then(() => {
                    console.log('Deliveries processed and inserted successfully.');
                    resolve(); // Resolve the promise on success
                })
                .catch(err => {
                    console.error('Error inserting data into model_data:', err);
                    reject(err); // Reject the promise on error
                });
        });
    });
};

// Function to create the 'schedules' table
const createSchedulesTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hour INTEGER NOT NULL,
            minute INTEGER NOT NULL,
            batch INTEGER NOT NULL,
            scheduledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating schedules table: ' + err.message);
        } else {
            console.log('Schedules table created or already exists.');
        }
    });
};

// Function to drop the 'schedules' table (to start fresh)
const dropSchedulesTable = () => {
    const sql = 'DROP TABLE IF EXISTS schedules';
    db.run(sql, (err) => {
        if (err) {
            console.error('Error dropping schedules table: ' + err.message);
        } else {
            console.log('Schedules table dropped successfully.');
        }
    });
};

// Function to insert a new schedule entry
const insertSchedule = (hour, minute, batch) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO schedules (hour, minute, batch) VALUES (?, ?, ?)';
        db.run(sql, [hour, minute, batch], function(err) {
            if (err) {
                console.error('Error inserting schedule: ' + err.message);
                reject(err); // Reject the promise on error
            } else {
                console.log(`Schedule added with ID: ${this.lastID}`);
                resolve(this.lastID); // Resolve the promise on success
            }
        });
    });
};

// Function to get all schedules from the 'schedules' table
const getSchedules = () => {
    return new Promise((resolve, reject) => {
        const currentHour = new Date().getHours();
        const currentDayOfWeek = new Date().getDay();

        // Query to find the closest schedule for the current time
        const sql = `
            SELECT *,
            ABS(hour - ?) AS hour_difference
            FROM model_data
            WHERE day_of_week = ?
              AND hour > ?  -- Only consider hours greater than the current hour
            ORDER BY hour ASC, deliveries ASC
            LIMIT 1
        `;
        db.all(sql, [currentHour, currentDayOfWeek, currentHour], (err, rows) => {
            if (err) {
                console.error('Error retrieving schedules: ' + err.message);
                reject(err); // Reject the promise on error
            } else {
                resolve(rows); // Resolve the promise with the retrieved schedules
            }
        });
    });
};


/* pending delete
// Function to insert multiple rows of model data
const insertMultipleModelData = (dataArray) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO model_data (hour, day_of_week, deliveries) VALUES (?, ?, ?)';
        const stmt = db.prepare(sql); // Prepare the statement for efficiency

        dataArray.forEach(({ hour, day_of_week, deliveries }) => {
            stmt.run(hour, day_of_week, deliveries, (err) => {
                if (err) {
                    console.error('Error inserting model data: ' + err.message);
                    reject(err);
                }
            });
        });

        stmt.finalize((err) => {
            if (err) {
                console.error('Error finalizing statement: ' + err.message);
                reject(err);
            } else {
                console.log(`Inserted ${dataArray.length} rows of model data.`);
                resolve(); // Resolve the promise on success
            }
        });
    });
};

// Function to generate delivery data
const generateProbabilisticDeliveries = () => {
    const data = [];
    const peakHours = [...Array(5).keys()].map(i => i + 10) // 10 AM to 2 PM (10, 11, 12, 13, 14)
        .concat([...Array(4).keys()].map(i => i + 17)); // 5 PM to 8 PM (17, 18, 19, 20)
    const baseDeliveries = 20; // Base deliveries for non-peak hours

    for (let day = 1; day <= 7; day++) { // 1 = Monday, 7 = Sunday
        for (let hour = 1; hour <= 24; hour++) { // 1 = 1 AM, 24 = 12 AM
            let deliveries;

            // Adjust peak hours to match the new hour format
            const adjustedHour = hour === 24 ? 0 : hour; // Convert 24 to 0 for easier comparison
            if (peakHours.includes(adjustedHour)) {
                deliveries = Math.floor(Math.random() * 51) + 50; // 50 to 100 deliveries during peak hours
            } else {
                deliveries = Math.floor(Math.random() * (baseDeliveries + 1)); // 0 to 20 deliveries during non-peak hours
            }

            data.push({
                hour: hour,
                day_of_week: day,
                deliveries: deliveries
            });
        }
    }

    return data;
};

// Generate delivery data
const deliveriesData = generateProbabilisticDeliveries();

// Insert the generated data into the database
insertMultipleModelData(deliveriesData)
    .then(() => {
        console.log('All data inserted successfully.');
    })
    .catch((err) => {
        console.error('Error inserting multiple model data:', err);
    })

 */


// Export the database connection for use in other modules
module.exports ={ db,createUserTable, checkUserExists, insertUser,loginUser, getUser,
                    createOrdersTable, insertOrder, getUsersOrders,
                    createCommentsTable,insertComment, getComments,
                    getDataForModelTraining,createModelDataTable,
                    processDeliveriesForToday,createSchedulesTable,
                    insertSchedule,dropSchedulesTable,getSchedules
                };