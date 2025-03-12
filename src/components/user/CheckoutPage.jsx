import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import FooterMenu from './FooterMenu';
import Button from '@mui/material/Button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('pk_test_51Qtk2REyN55W0IYtQHTPHmGF58Zeyhnyx8axCt6MiH8kMsd3XgP3uXl4ufcmEaMid4BgPFc1gC4skJ3hrPmZBHsb00zkKe3PRd')

export default function CheckoutPage() {

  const navigate=useNavigate()
  const [amount,setAmount]=useState()
  const [totalAm,setTotalAm]=useState()
  const [shippingCharge,setShippingCharge]=useState(40)
  const[deliveryCharge,setDeliveryCharge]=useState(50)

  const [delaying,setDelaying]=useState(false)


  const [paymentDetails,setPaymentDetails]=useState(null)
  const stripe = useStripe()
  const elements = useElements()

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "29px",
        "::placeholder": {
          color: "#aab7c4",
         
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Call your backend to create a PaymentIntent
    const response = await fetch('http://localhost:4000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === 'succeeded') {
     toast.success('Payment successful!');
      setPaymentDetails(paymentIntent);
    //  console.log(paymentDetails)
   
     setDelaying(true);
     setTimeout(() => {
       navigate('/payment-success'); // Replace with your target route
     }, 5000);
      // navigate('/success')
    }
  }


useEffect(()=>{
  if(paymentDetails){
    sessionStorage.setItem("details",JSON.stringify(paymentDetails))
  }
},[paymentDetails])

// console.log(paymentDetails)

  useEffect(()=>{
    if(sessionStorage.getItem("total")){
      const tAmount= JSON.parse(sessionStorage.getItem("total"))
  //  const totAmount=JSON.parse(amount)
   setAmount(tAmount)
   console.log(amount)
    }else{
      navigate('/cart')
    }
  },[])

const totalAmount=()=>{
  const amount= sessionStorage.getItem("total")
  const totAmount=JSON.parse(amount)
  setAmount(totAmount)
  const totlAm=deliveryCharge+shippingCharge
  setTotalAm(totlAm)
  console.log(amount,deliveryCharge,shippingCharge)
}

useEffect(()=>{
  totalAmount()
},[])

  return (
    <>
    <div className='container'>
      <div className='checkout-main-screen'>
      <form onSubmit={handleSubmit}>
      <h3 className='mb-2 text-center mt-3 mb-5'>Enter Card Details</h3>
      <div>
    <CardElement className="card-input" options={cardElementOptions}/>
    </div>
        <div className="">
          <div className='row'>
            
          {/* <h3 className='mb-4 text-center mt-3 mb-5'>Enter Card Details</h3>
      <div className='d-flex justify-content-center align-items-center'>
      <CardElement className="card-input" options={cardElementOptions}/>
      </div> */}
          </div>
          <div className='row mt-2'>
            <h6 className='text-center'>Shipping Charge : <span style={{textDecoration:'line-through'}}>₹{shippingCharge}</span></h6><br />
            <h6 className='text-center'>Delivery Charge : <span style={{textDecoration:'line-through'}}>₹{deliveryCharge}</span></h6>
            <h5 className='text-center'>Total Amount : <span>₹{amount}</span></h5>
          </div>
          <div className='row mt-4' style={{marginLeft:'41%'}}>
            <Button type='submit' id='submit' style={{width:'100px'}} variant='contained' disabled={!stripe}>Pay Now</Button>
          </div>
        </div>
        </form>
      </div> 

         {/* <div>
    <CardElement className="card-input" options={cardElementOptions}/>
    </div> */}
    
      
    </div>

    
 
    <FooterMenu/>
    <BottomNavBar/>

    </>
  )
}
