import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe('pk_test_51Qtk2REyN55W0IYtQHTPHmGF58Zeyhnyx8axCt6MiH8kMsd3XgP3uXl4ufcmEaMid4BgPFc1gC4skJ3hrPmZBHsb00zkKe3PRd');
export default function Payment() {
  return (
     <>
    
     <div>
     <Elements stripe={stripePromise}>
          <CheckoutPage/>
        </Elements>
     </div>
     
    </>
  )
}
