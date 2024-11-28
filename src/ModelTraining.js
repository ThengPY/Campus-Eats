const tf = require('@tensorflow/tfjs');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Load the existing model
async function loadModel() {
    let model;
    try {
        model = await tf.loadLayersModel('file://path/to/your/model.json'); // Load the saved model
    } catch (error) {
        console.log('No existing model found. Creating a new one.');
        model = createNewModel(); // If no model is found, create a new one
    }
    return model;
}

// Create a new model if it doesn't exist
function createNewModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 32,
        activation: 'relu',
        inputShape: [2],
        kernelInitializer: 'heNormal'
    }));
    model.add(tf.layers.dense({
        units: 16,
        activation: 'relu',
        kernelInitializer: 'heNormal'
    }));
    model.add(tf.layers.dense({
        units: 1,
        kernelInitializer: 'heNormal'
    }));
    model.compile({optimizer: 'adam', loss: 'meanSquaredError'});
    return model;
}

// Retrieve the most recent daily data from the database
function getDailyData(callback) {
    let db = new sqlite3.Database('your_database.db');

    db.all("SELECT date, deliveries, hour, day_of_week FROM deliveries ORDER BY date DESC LIMIT 30", [], (err, rows) => {
        if (err) {
            console.error(err);
            throw err;
        }

        const data = rows.map(row => {
            return {
                hour: row.hour,
                day_of_week: row.day_of_week,
                deliveries: row.deliveries,
                date: row.date
            };
        });

        callback(data);
        db.close();
    });
}

// Normalize the data (for model input)
function normalizeData(data, maxHour, maxDayOfWeek) {
    return data.map(item => [
        item.hour / maxHour,  // Normalize hour
        item.day_of_week / maxDayOfWeek  // Normalize day_of_week
    ]);
}

// Retrain the model using new data
async function retrainModel() {
    const model = await loadModel();  // Load the current model or create a new one

    getDailyData(data => {
        const normalizedData = normalizeData(data, 24, 7); // Normalize the data

        // Prepare the training data
        const xs = tf.tensor2d(normalizedData.map(item => [item[0], item[1]]));  // Input features
        const ys = tf.tensor2d(normalizedData.map(item => [item[2]]));  // Output (deliveries)

        // Retrain the model using new data
        model.fit(xs, ys, {epochs: 10}).then(() => {
            console.log('Model retrained with new data');
            model.save('file://path/to/your/model.json');  // Save the updated model
        });
    });
}

// Make predictions based on the current model
async function makePrediction(inputData) {
    const model = await loadModel();  // Load the most recent model

    // Normalize the input data (make sure it's in the correct range)
    const normalizedInput = inputData.map(item => [
        item[0] / 24,  // Normalize hour
        item[1] / 7  // Normalize day_of_week
    ]);

    const inputTensor = tf.tensor2d(normalizedInput);
    const prediction = model.predict(inputTensor);
    prediction.print();  // Output the prediction
}

// Retrain the model every day at a certain time (e.g., 12 AM)
setInterval(retrainModel, 24 * 60 * 60 * 1000);  // Retrain once every 24 hours
