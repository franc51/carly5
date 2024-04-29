const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_...");
// This is your webhook secret from Stripe
const endpointSecret = "whsec_...";
exports.stripeWebhook = functions.https.onRequest((request, response) => {
  const sig = request.headers["stripe-signature"];
  try {
    const event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret,
    );
    // Handle the event
    const paymentIntentSucceeded = event.data.object;
    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle payment success event
        console.log("Payment succeeded:", paymentIntentSucceeded);
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Send response to acknowledge receipt of the event
    response.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
});
