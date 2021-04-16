import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import SickButton from '../atoms/SickButton';

const CheckoutFormStyle = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Checkout() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Work in Progress');
  };
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyle onSubmit={handleSubmit}>
        <CardElement></CardElement>
        <SickButton>Check Out Now</SickButton>
      </CheckoutFormStyle>
    </Elements>
  );
}
