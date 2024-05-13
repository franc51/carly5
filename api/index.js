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

  try {
    const whSec = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers['stripe-signature'],
      whSec,
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.');
    return res.sendStatus(400);
  }

  const dataObject = event.data.object;

  // Save data to Firebase Realtime Database
  await admin.database().ref('reserved-plates').push({
    checkoutSessionId: dataObject.id,
    paymentStatus: dataObject.payment_status,
    shippingInfo: dataObject.shipping,
    amountTotal: dataObject.amount_total,
    timestamp: admin.database.ServerValue.TIMESTAMP,
  });

  return res.sendStatus(200);
});
=======
>>>>>>> parent of 541365c (adding stripe webhook function)
