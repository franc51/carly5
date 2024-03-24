// server.js (or index.js)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const vehicleRoutes = require("./vehicleRoutes");

const app = express();
// Enable CORS for all origins
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect(
  "mongodb+srv://mongo:supnigga@carly.zl9sirh.mongodb.net/?retryWrites=true&w=majority&appName=Carly",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
