import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import styled from 'styled-components';
import nProgress from 'nprogress';
import SickButton from '../atoms/SickButton';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const CheckoutFormStyle = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($token: String!) {
    checkout(token: $token) {
      id
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphQLError }] = useMutation(CHECKOUT_MUTATION);

  const handleSubmit = async (e) => {
    // 1 Stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);
    console.log('Work in Progress');
    // 2 Start the page transition
    nProgress.start();
    // 3 Create the payment method via stripe (Token comes back here if successfu)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4 Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return;
    }
    // 5 send the token from step 3 to our server via a custom mutation
    const order = await checkout({ variables: { token: paymentMethod.id } });
    // 6 change the page to viw the order
    // 7 close the cart
    // 8 turn the loader off
    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyle onSubmit={handleSubmit}>
      {(error || graphQLError) && <p>{(error || graphQLError).message}</p>}
      <CardElement></CardElement>
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyle>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
