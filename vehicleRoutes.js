// routes/vehicleRoutes.js
const express = require("express");
const router = express.Router();
const Vehicle = require("./vehicle"); // Assuming this is your Mongoose model for vehicles

// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new vehicle
router.post("/", async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a vehicle
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a vehicle
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
