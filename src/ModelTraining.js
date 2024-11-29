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

function createNewModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 128,
        activation: 'relu',
        inputShape: [2],
        kernelInitializer: 'heNormal',
        kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({
        units: 64,
        activation: 'relu',
        kernelInitializer: 'heNormal'
    }));
    model.add(tf.layers.dense({
        units: 1,
        activation: 'linear',
        kernelInitializer: 'heNormal'
    }));
    model.compile({ optimizer: tf.train.adam(0.0001), loss: 'meanSquaredError' });
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

    // Split data into training and validation sets (80% train, 20% validation)
    const [trainXs, valXs] = tf.split(xs, [Math.floor(xs.shape[0] * 0.8), Math.ceil(xs.shape[0] * 0.2)]);
    const [trainYs, valYs] = tf.split(ys, [Math.floor(ys.shape[0] * 0.8), Math.ceil(ys.shape[0] * 0.2)]);

    // Log the shapes of the training and validation sets
    console.log('Training features shape:', trainXs.shape);
    console.log('Validation features shape:', valXs.shape);
    console.log('Training labels shape:', trainYs.shape);
    console.log('Validation labels shape:', valYs.shape);

    // Retrain the model using new data
    await model.fit(trainXs, trainYs, {
        epochs: 100, // Increased epochs for better training
        validationData: [valXs, valYs], // Use validation data to monitor performance
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, val_loss = ${logs.val_loss}`);
            }
        }
    });

    console.log('Model retrained with new data');

    await model.save('file:///Users/keste/IdeaProjects/Campus-Eats/src/model');  // Save the updated model
}

// Export the retrainModel function
module.exports = {
    retrainModel
};