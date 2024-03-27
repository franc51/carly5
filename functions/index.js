const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const vehicleRoutes = require("./vehicleRoutes");
const stripe = require("stripe")("sk_test_...");

const app = express();
// Enable CORS for all origins
app.use(cors());

// Connect to MongoDB vehicles
mongoose.connect("mongodb+srv://mongo:supnigga@carly.zl9sirh.mongodb.net", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "vehicles",
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/vehicles", vehicleRoutes);
