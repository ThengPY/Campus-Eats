
const tf = require('@tensorflow/tfjs-node');
const dbHandler = require('./dbHandler');
const schedule = require('node-schedule');

// Function to use the model and make predictions
async function deliveryPredictionModel(inputData) {
    const modelPath = 'file:///Users/keste/IdeaProjects/Campus-Eats/src/model/model.json'; // Adjust the path accordingly
    const model = await tf.loadLayersModel(modelPath);

    // Ensure inputData is in the correct shape for the model
    const inputTensor = tf.tensor2d([inputData], [1, 2]); // Shape [1, 2] for one sample with two features
    const predictions = model.predict(inputTensor);

    predictions.print(); // Print raw predictions
    return predictions;
}

// Function to schedule deliveries for the day
async function scheduleDeliveriesForTheDay() {
    // First, reset the schedule table every day
    await dbHandler.dropSchedulesTable();
    await dbHandler.createSchedulesTable()

    // Loop through every hour in the day
    for (let hour = 0; hour < 24; hour++) {
        // Add 1 to the hour value to make it start from 1 instead of 0
        const adjustedHour = hour + 1;

        // Get the current day of the week
        const dayOfWeek = new Date().getDay(); // Get the current day of the week (0 for Sunday, 6 for Saturday)

        // Normalize the hour and day of week for the prediction
        const normalizedInputData = [hour / 24, dayOfWeek / 7]; // Normalize for [0, 1] range

        // Call the prediction function
        try {
            const predictions = await deliveryPredictionModel(normalizedInputData);
            const predictedDeliveries = predictions.arraySync()[0]; // Extract predicted value from the tensor
            console.log(`Predicted deliveries for ${adjustedHour} hour: ${predictedDeliveries}`);

            // Calculate the number of batches based on 15 deliveries per batch
            const batches = Math.ceil(predictedDeliveries / 15);

            // Calculate when each batch should start (distribute evenly across the hour)
            let minute = 0;
            for (let batch = 0; batch < batches; batch++) {
                // Schedule a job for each batch
                const batchTime = new Date();
                batchTime.setHours(adjustedHour - 1, minute, 0, 0); // Set the hour and minute (subtract 1 to keep hour 0-23 in Date object)
                minute += Math.floor(60 / batches); // Increase minute for the next batch

                // Store the scheduled delivery in the database
                await dbHandler.insertSchedule(adjustedHour, minute, batch + 1, batchTime);
            }
        } catch (err) {
            console.error("Error predicting deliveries:", err);
        }
    }
}

//schedule delivery at 00:01 PM
dbHandler.createSchedulesTable()
schedule.scheduleJob('1 0 * * *', () => {
    console.log('Resetting delivery schedule for the new day');
    scheduleDeliveriesForTheDay(); // Call the function to schedule deliveries for the day
});