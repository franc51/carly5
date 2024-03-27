// models/Vehicle.js
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  _id: String,
  items: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerSurname: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  ownerPhone: {
    type: String,
    required: true,
  },
  ownerCNP: String,
  ownerIdentityCard: String,
  vehicleManufacturer: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleYear: String,
  vehicleVinNumber: {
    type: String,
    required: true,
  },
  vehicleIdentityCard: String,
  vehicleNumberPlate: {
    type: String,
    required: true,
  },
  certificatePaymentProof: Boolean,
  ownershipProof: String,
  details: {
    type: String,
    enum: [
      "Lipsă asigurare",
      "Cerere trimisă",
      "Certificatul de inm. și plăcuțele au fost trimise",
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["În așteptare", "Respins"],
    required: true,
  },
  isAccepted: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
