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

// Connect to MongoDB reserved-numberplates
const reservedNumberplatesConnection = mongoose.createConnection(
  "mongodb+srv://mongo:supnigga@carly.zl9sirh.mongodb.net",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "reserved-numberplates",
  }
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/vehicles", vehicleRoutes);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_18123924ffc6ea015b9f36c5b6832ae2b0f11e4971b68b0ea006b7f154222df1";

// Endpoint to handle Stripe webhook events
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    console.log(`Received event of type: ${event.type}`);

    // Example: Handle payment_intent.succeeded event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      // Use reservedNumberplatesConnection to interact with the reserved-numberplates database
      console.log("PaymentIntent succeeded:", paymentIntent.id);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
