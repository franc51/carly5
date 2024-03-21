// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const Vehicle = require('./vehicle');

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
    console.log(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new vehicle
router.post('/', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await Vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Other routes for updating and deleting vehicles would be similar

module.exports = router;
