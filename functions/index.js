const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const vehicleRoutes = require("./vehicleRoutes");
const Vehicle = require("./vehicle");

const app = express();
// Enable CORS for all origins
app.use(cors());

// Connect to MongoDB vehicles
mongoose.connect("mongodb+srv://mongo:supnigga@carly.zl9sirh.mongodb.net", {
  dbName: "vehicles",
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/vehicles", vehicleRoutes);

// Fetch data from MongoDB and serve it
app.get("/api/fetchVehicles", async (req, res) => {
  try {
    // Fetch vehicles from MongoDB
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
exports.app = functions.https.onRequest(app);
