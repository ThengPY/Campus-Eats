const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Specify the path to the database file
const dbPath = path.join(__dirname, 'database.db');
// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {console.error('Error opening database ' + err.message);
    } else {console.log('Connected to the SQLite database.');}
});
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

createModelDataTable();