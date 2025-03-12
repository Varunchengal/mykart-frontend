import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { addToCartFun, addToOrderFun, clearCart, userViewFun } from '../../service/allApis';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {

  const [paymentDetails,setPaymentDetails]=useState({})
  const [orderDetails,setOrderDetails]=useState({})
  const[profile,setProfile]=useState({})
  const[sendDetails,setSendDetails]=useState()
  const navigate=useNavigate()

  useEffect(()=>{
    const userId=JSON.parse(sessionStorage.getItem("userId"))
    const details=JSON.parse(sessionStorage.getItem("details"))  

  },[])

const paymentDetailsFetch=()=>{
if(sessionStorage.getItem("details")){
  const details=JSON.parse(sessionStorage.getItem("details"))  
  setPaymentDetails({id:details.id,
    amount:details.amount,
    status:details.status
  })
setOrderDetails({amount:details.amount,
  paymentId:details.id,
  paymentStatus:details.status})
  console.log(details)
}
}  

// useEffect(()=>{
//   paymentDetailsFetch()
// },[])

 
 const viewProfile=async()=>{
      if(sessionStorage.getItem("userId")){
          const uid=sessionStorage.getItem("userId")
          const id= JSON.parse(uid)
          
          const result=await userViewFun(id)
          console.log(result)
          setProfile({
            userId:result.data._id,
            userName:result.data.name
          })
          
        
      }
  }

  useEffect(()=>{
    viewProfile()
    paymentDetailsFetch()
  },[])

  const addToOrder=async()=>{
    
      // setSendDetails({...orderDetails,...profile})
      const sendData={
        paymentId:orderDetails.paymentId,
        paymentStatus:orderDetails.paymentStatus,
        amount:orderDetails.amount,
        userId:profile.userId,
        userName:profile.userName}
      
      console.log(sendData)
      const result=await addToOrderFun(sendData)
      console.log(result)
    
  }

  useEffect(()=>{
    addToOrder()
  },[profile])

  const goToHome= async()=>{
const userId=JSON.parse(sessionStorage.getItem("userId"))

const result= await clearCart(userId)
if(result.status===200){
navigate('/')
}

  }

  useEffect(()=>{
    setTimeout(() => {
      goToHome()
   
    }, 5000);
  })

  console.log(orderDetails)
  console.log(profile)
  
  return (
    <div className='bg-clr-success'>
       <h3 className=' pt-5 text-center text-light'>Payment Successfull</h3>
       <p className='text-center'>please wait this page will be direct to home page as soon</p>
        <div className='success-size'>
         
            <div className="check-bg">
           <p className="check-style">✓</p>

            </div>
            
        </div>

        <div>
          <h5 className='text-center text-light'>Payment Id: <span className='payment-d-t'>{paymentDetails.id}</span></h5>
          <h5 className='text-center text-light'>Payment Status: <span className='payment-d-t'>{paymentDetails.status}</span></h5>
          <h4 className='text-center text-light'>Amount <span className='payment-d-t'>₹{paymentDetails.amount}</span></h4>
        </div>
        <div className='home-btn pt-4 pb-5'>
        <Button variant='contained' onClick={goToHome}>Home</Button>
        </div>
    </div>
  )
}

