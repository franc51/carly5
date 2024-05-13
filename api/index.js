<<<<<<< HEAD
<<<<<<< HEAD
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);

admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: (100) * 100, // 10000 = 100 USD
          product_data: {
            name: 'number plate',
          },
        },
      },
    ],
  });

  return {
    id: session.id,
  };
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const stripe = require('stripe')(functions.config().stripe.token);
  let event;

=======
const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_...");
// This is your webhook secret from Stripe
const endpointSecret = "whsec_...";
exports.stripeWebhook = functions.https.onRequest((request, response) => {
  const sig = request.headers["stripe-signature"];
>>>>>>> parent of 8fa75f8 (started firebase functions (stripe webhook handler))
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
=======
>>>>>>> parent of 541365c (adding stripe webhook function)
