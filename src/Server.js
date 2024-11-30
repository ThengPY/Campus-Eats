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
dbHandler.createUserTable();
dbHandler.createOrdersTable();
dbHandler.createCommentsTable();
dbHandler.createSchedulesTable()

// Route to register a new user
app.post('/user/register', (req, res) => {
    const { username, email, password, status } = req.body;
    // Input validation
    if (!username || !email || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Check if the username or email already exists
    dbHandler.checkUserExists(username, email)
        .then((user) => {
            if (user) {
                return res.status(409).send('Username or email already exists. Please log in or use a different username/email instead.');
            }
            return dbHandler.insertUser(username, email, password, status || 'buyer');
        })
        .then(() => {
            res.status(201).send('User registered successfully');
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

//route to retrieve password
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

// Route to get user's order history
app.get('/orders/:username', (req, res) => {
    const username = req.params.username;

    // Query the database to get user's orders
    dbHandler.getUsersOrders(username, (err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
        }

        if (!orders) {
            return res.status(404).json({ success: false, message: 'No orders found for this user.' });
        }

        // Respond back to the client with the orders
        res.json({ success: true, orders });
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

// Route to create order
app.post('/order/create/:username', (req, res) => {
    const username = req.params.username;
    const { order_item, price, payment_method, option, reservation_time, delivery_name, eco_package, bring_container, address, phone_num, card_number, expiration_date, csv, pickup_date, pickup_time, own_tableware} = req.body;

    // Validate required fields
    if (!username || !price || !order_item ) {
        return res.status(400).send('Log in is required and all fields must be provided.');
    }
    console.log(`Processing payment for user: ${username}, price: ${price}`);

    // Call the insertOrder functions
    dbHandler.insertOrder(username, order_item, price, payment_method, option, reservation_time, delivery_name, eco_package, bring_container, address, phone_num, card_number, expiration_date, csv , pickup_date, pickup_time, own_tableware)
        .then(orderId => {
            console.log(`Order inserted with ID: ${orderId}`);
            res.status(200).json({ success: true, message: 'Payment successful', orderId });
        })
        .catch(err => {
            console.error('Error inserting order:', err);
            res.status(500).json({ success: false, message: 'Payment failed. Please try again.' });
        });
});

//access schedules table to find available delivery time
app.get('/getDeliveryTime', (req, res) => {
    const username = req.params.username;

    dbHandler.getSchedules()
        .then(schedule => {
            if (!schedule || schedule.length === 0) { // Check if schedule is empty
                return res.status(404).json({ success: false, message: 'No delivery schedule found for the current time.' });
            }

            const deliveryTime = `${schedule[0].hour}:00`; // Access the first schedule
            res.json({ success: true, deliveryTime });
        })
        .catch(err => {
            console.error('Error fetching closest schedule:', err);
            res.status(500).json({ success: false, message: 'An error occurred while fetching the delivery time.' });
        });
});


dbHandler.createModelDataTable()
//only uncomment if tensorflow is configured
/*
const {retrainModel} = require('./ModelTraining');
const schedule = require('node-schedule');
// Alternate trigger to model training
app.get('/model/train', (req, res) => {
    dbHandler.getDataForModelTraining()
        .then(data => {
            return retrainModel(data); // Pass the retrieved data to retrain the model
        })
        .then(() => {
            res.status(200).send('Model training completed successfully.');
        })
        .catch(err => {
            console.error('Error during model training:', err);
            res.status(500).send('Error during model training.');
        });
});


//time parameter(minute, hour, day of month, month, day of week)
// Schedule delivery processing at a specific time (e.g., every day at 11:58 PM)
const deliveryProcessing = schedule.scheduleJob('58 23 * * *', async () => {
    console.log('Triggering delivery processing...');
    try {
        await dbHandler.processDeliveriesForToday();
        console.log('Delivery processing completed successfully.');
    } catch (err) {
        console.error('Error during delivery processing:', err);
    }
});

// Schedule model retraining at a specific time (e.g., every day at 11:59 AM)
const modelRetraining = schedule.scheduleJob('59 23 * * *', async () => {
    console.log('Triggering model retraining...');
    try {
        const data = await dbHandler.getDataForModelTraining();
        await retrainModel(data);
        console.log('Model retraining completed successfully.');
    } catch (err) {
        console.error('Error during model retraining:', err);
    }
});
*/
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});