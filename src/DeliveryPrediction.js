const tf = require('@tensorflow/tfjs-node');
const path = require('path');

// Function to use the model and make predictions
async function useModel(inputData) {
    const modelPath = 'file:///Users/keste/IdeaProjects/Campus-Eats/src/model/model.json'; // Adjust the path accordingly
    const model = await tf.loadLayersModel(modelPath);

    // Ensure inputData is in the correct shape for the model
    const inputTensor = tf.tensor2d([inputData], [1, 2]); // Shape [1, 2] for one sample with two features
    const predictions = model.predict(inputTensor);

    predictions.print(); // Print raw predictions
    return predictions;
}

// Example usage
(async () => {
    const inputData = [1 / 24, 1 / 7]; // Example input: normalized [hour, day_of_week]
    const predictions = await useModel(inputData);
    console.log(predictions.arraySync()); // Print the predictions as an array
})();