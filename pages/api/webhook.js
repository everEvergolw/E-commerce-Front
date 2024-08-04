import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";

const endpointSecret = 'whsec_47caaefe2179d0d352c5c482b464461aa87ac797336f43a6f26567802105c725';

export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {

    case 'checkout.session.completed':

      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
       
      if (orderId && paid) { 
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}


export const config = {
  api: {bodyParser:false,}
};

// bright-thrift-cajole-lean
// reward-attune-fans-wonder