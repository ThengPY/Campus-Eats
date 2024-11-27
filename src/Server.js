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
dbHandler.createCommentsTable()

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
    const username= req.params.username;
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
            res.json({ success: true, message: `Password retrieved successfully.  Password : ${user.Password}` });
        })
        .catch(error => {
            console.error('Error fetching password:', error);
            res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
        });
});

// Route to create an order
app.post('/order/create/:username', (req, res) => {
    const username = req.params.username;
    const { order_item, price, payment_method, card_number, pickup_date, pickup_time } = req.body;

    // Input validation
    if (!username || !order_item || !price) {
        return res.status(400).send('Username, order item, and price are required');
    }

    // Insert order into the database
    dbHandler.insertOrder(username, order_item, price, payment_method, card_number, pickup_date, pickup_time)
        .then((orderId) => {
            res.status(201).send(`Order created successfully with ID: ${orderId}`);
        })
        .catch((err) => {
            console.error('Error creating order:', err);
            res.status(500).send('Internal server error');
        });
});

// Route to create a comment
app.post('/comment/create/:username', (req, res) => {
    const username = req.params.username;
    const { comment } = req.body;

    // Input validation
    if (!username || !comment) {
        return res.status(400).send('Username and comment are required');
    }

    // Insert the comment into the database
    dbHandler.insertComment(username, comment)
        .then(() => {
            res.status(201).send('Comment added successfully');
        })
        .catch((err) => {
            console.error('Error adding comment:', err);
            res.status(500).send('Internal server error');
        });
});

// Route to get all comments
app.get('/comments', (req, res) => {
    // Query the database to get all comments
    dbHandler.getComments()
        .then(comments => {
            if (comments.length === 0) {
                return res.status(404).json({ success: false, message: 'No comments found.' });
            }
            // Respond back to the client with the comments
            res.json({ success: true, comments });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});