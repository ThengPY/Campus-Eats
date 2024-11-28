// modelTraining.js
const tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

// Load the existing model
async function loadModel() {
    let model;
    try {
        model = await tf.loadLayersModel('file:///C:/Users/keste/IdeaProjects/Campus-Eats/src/model.json'); // Load the saved model
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

// Normalize the data (for model input)
function normalizeData(data, maxHour, maxDayOfWeek) {
    return data.map(item => [
        item.hour / maxHour,  // Normalize hour
        item.day_of_week / maxDayOfWeek  // Normalize day_of_week
    ]);
}

// Retrain the model using new data
async function retrainModel(data) {
    const model = await loadModel();  // Load the current model or create a new one

    const normalizedData = normalizeData(data, 24, 7); // Normalize the data

    // Prepare the training data
    const xs = tf.tensor2d(normalizedData.map(item => [item[0], item[1]]));  // Input features
    const ys = tf.tensor2d(normalizedData.map(item => [item[2]]));  // Output (deliveries)

    // Retrain the model using new data
    await model.fit(xs, ys, {epochs: 10});
    console.log('Model retrained with new data');
    await model.save('file:///Users/keste/IdeaProjects/Campus-Eats/src/model.json');  // Save the updated model
}

// Export the retrainModel function
module.exports = {
    retrainModel
};