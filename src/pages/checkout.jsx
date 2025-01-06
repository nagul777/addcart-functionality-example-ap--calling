// import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import useStore from "../store/index"


const stripePromise = loadStripe(
  "pk_test_51Qd0zHCdTNR5Vn1KAU4yy0Vqn5eEV2gWF7XOP2jgYJmVMC0vTzSEA2bsEuQPd67lZAPppdWf0O7SZG0JkvgCBFlS00dJjGsBZx"
);

export const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
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
