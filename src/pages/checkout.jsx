// import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {useStripe, useElements} from '@stripe/react-stripe-js';
import { PaymentElement } from "@stripe/react-stripe-js";
import useStore from "../store/index"


const stripePromise = loadStripe(
  "pk_test_51Qd0zHCdTNR5Vn1KAU4yy0Vqn5eEV2gWF7XOP2jgYJmVMC0vTzSEA2bsEuQPd67lZAPppdWf0O7SZG0JkvgCBFlS00dJjGsBZx"
);

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  )
};

const Checkout = () => {
  const {clientSecret} = useStore();
  const options = {
    clientSecret: clientSecret,
  };

  return (
    <div>
      Checkout
      { clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
      )}
      
    </div>
  );
};

export default Checkout;
