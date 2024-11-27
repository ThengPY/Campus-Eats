const express = require('express');
const dbHandler = require('./dbHandler');
const cors = require('cors');

const app = express();
const PORT =  5000;
//process.env.PORT ||
// Middleware
app.use(express.json());
app.use(cors());

// Create the users table
dbHandler.createTable();
dbHandler.createReservationsTable();
dbHandler.createOrdersTable();

// Route to register a new user
app.post('/user/register', (req, res) => {
    const { username, email, password, status } = req.body;
    // Input validation
    if (!username || !email || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Insert the user into the database
    dbHandler.insertUser (username, email, password, status || 'buyer') // Default to 'buyer' if status is not provided
        .then(() => {
            res.status(201).send('User  registered successfully');
        })
        .catch((err) => {
            console.error('Error registering user:', err);
            res.status(500).send('Internal server error');
        });
});

// Route to log in a user
app.post('/user/login', (req, res) => {
    const { username, email, password } = req.body;
    dbHandler.loginUser (username, email, password, (err, user) => {
        if (err)    return res.status(500).send('Internal server error');
        if (user)   res.status(200).json(user);
        else        res.status(401).send('Invalid username, email or password');
    });
});

// Route to create a reservation
app.post('/reservation/create/:username', (req, res) => {
    const username= req.params.username
    const { table_number, pax, reservation_time, location } = req.body;

    // Input validation
    if (!username || !table_number || !pax || !reservation_time || !location) {
        return res.status(400).send('username, table number, number of people, reservation time, and location are required');
    }

    // Insert the reservation into the database
    dbHandler.insertReservation(username, table_number, pax, reservation_time, location)
        .then(() => {
            res.status(201).send('Reservation created successfully');
        })
        .catch((err) => {
            console.error('Error creating reservation:', err);
            res.status(500).send('Internal server error');
        });
});

app.post('/user/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // Query the database to find the user by email
    dbHandler.getUser (email)
        .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User  not found.' });
            }

            // Log the user's password (not recommended for production)
            console.log('User  Password:', user.Password); // Ensure the case matches your database column

            // Respond back to the client
            res.json({ success: true, message: `Password retrieved successfully.  Pasword : ${user.Password}` });
        })
        .catch(error => {
            console.error('Error fetching password:', error);
            res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
        });
});

app.post('/user/oder-history', (req, res) =>{
    const { username } = req.query;

    if(!username){
        return res.status(400).json({ message: 'Username is required'});
    }

    getUsersOrders(username, (err, orders) => {
        if (err) {
            console.error('Error fetching order hsitory:', err);
            return res.status(500).json({ message: 'Failed to fetch order history'});
        }

        if (orders) {
            res.status(200).json({ orders });
        } else {
            res.status(404).json({ message: 'No orders found fpr this user'});
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});