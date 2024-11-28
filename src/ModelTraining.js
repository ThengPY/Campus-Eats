// modelTraining.js
const tf = require('@tensorflow/tfjs');
require('tfjs-node-save')

// Load the existing model
async function loadModel() {
    let model;
    try {
        model = await tf.loadLayersModel('file:///Users/keste/IdeaProjects/Campus-Eats/src/model/model.json'); // Load the saved model
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
    model.compile({optimizer: tf.train.adam(0.001), loss: 'meanSquaredError'}); // Adjust learning rate
    return model;
}

// Normalize the data (for model input)
function normalizeData(data, maxHour, maxDayOfWeek) {
    return data.map(item => {
        const normalizedHour = item.hour / maxHour;  // Normalize hour
        const normalizedDayOfWeek = item.day_of_week / maxDayOfWeek;  // Normalize day_of_week

        // Log normalized values
        if (isNaN(normalizedHour) || isNaN(normalizedDayOfWeek)) {
            console.error('Invalid normalization for item:', item);
        }

        return [normalizedHour, normalizedDayOfWeek];
    });
}

// Retrain the model using new data
async function retrainModel(data) {
    const model = await loadModel();  // Load the current model or create a new one

    const normalizedData = normalizeData(data, 24, 7); // Normalize the data

    // Prepare the training data
    const xs = tf.tensor2d(normalizedData);  // Input features
    const ys = tf.tensor2d(data.map(item => [item.deliveries]));  // Output (deliveries)

    // Log the input and output tensors
    console.log('Input features (xs):', xs.arraySync());
    console.log('Output labels (ys):', ys.arraySync());

    // Retrain the model using new data
    await model.fit(xs, ys, {epochs: 50});
    console.log('Model retrained with new data');

    await model.save('file:///Users/keste/IdeaProjects/Campus-Eats/src/model');  // Save the updated model
}

// Export the retrainModel function
module.exports = {
    retrainModel
};