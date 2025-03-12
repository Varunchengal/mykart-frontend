import react, { useEffect, useMemo, useState } from 'react'
import { addToCartFun, cartProductDecrement, cartProductIncrement, removeWishList, viewCartListsFun, viewWishLists } from '../../service/allApis';
import { BASEURL } from '../../service/baseUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BottomNavBar from './BottomNavBar';
import Table from 'react-bootstrap/Table'
import Button from '@mui/material/Button';
import FooterMenu from './FooterMenu';
import UserNavBar from './UserNavBar';


export default function ViewCart(){

    const [cartItems,setCartItems]=useState([])
    const [total,setTotal]=useState('')

      const navigate=useNavigate()
   

  
 
 const viewCartLists=async()=>{
 if(sessionStorage.getItem('userId')) {
  const uid=sessionStorage.getItem('userId')
  const userId=JSON.parse(uid)
 console.log(userId)
  const result=await viewCartListsFun(userId)
  console.log(result)
  setCartItems(result.data)
 }else{
    navigate('/login')
 }
}

 useEffect(()=>{
  viewCartLists()
 },[])

useMemo(()=>{
  const totalAmount=cartItems?.reduce((total,item)=>total+Number(item.crate)*item.count,0)
  setTotal(totalAmount || 0)
  console.log(totalAmount)
},[cartItems])

const decrement=async(id)=>{
const result=await cartProductDecrement(id)
viewCartLists()
}

const increment=async(id)=>{
const result=await cartProductIncrement(id)
viewCartLists()
}

const checkoutClicked=(e)=>{
  navigate('/address')
 sessionStorage.setItem('total',JSON.stringify(total))
//  sessionStorage.setItem('cartItems',JSON.stringify(cartItems))

}


 console.log(total)
//  console.log(cartItems[0].crate)
 console.log(cartItems)

      return(
    <div >
     <UserNavBar/>
     <h2 className='admin-heading'>Cart</h2>
        <div className='container'>
        <div> 
            <div>
           
                    
            </div>
           <div className='row'>
            <div className='col-12 col-lg-6'>
               {
                    cartItems?.length>0 ?
              <Table className='table-borderd'>
                <thead>
                  <tr><th>No.</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th></tr>
                </thead>
                 <tbody> {
                  cartItems?.map((item,index)=>(
                          <tr>
                            <td>{index+1}</td>
                            <td><img style={{width:'150px',height:'150px',margin:'auto',borderRadius:'3px'}} src={`${BASEURL}/upload/${item.image}`} alt="" /></td>
                            <td>{item.title}</td>
                            <td><button className='cart-btn' onClick={()=>decrement(item._id)}>-</button> {item.count} <button className='cart-btn' onClick={()=>increment(item._id)}>+</button></td>
                            <td>₹{item.crate} <br /> Total Amount=₹{item.crate*item.count}</td>
                          </tr>
              
                      )) }  </tbody></Table>
                    :
                    <div className='empty-page'><h2 >Your Wishlist Is Empty !</h2></div>
                   
                  }

              
              </div>
              <div className='col-12 col-lg-6'>
              <div className='total-price-main'>
              <div className='total-price-inner'>
              <div className='row mb-4'>
                          <div className='col'>
                          <p className='cart-price'>Total Products <span> {cartItems?.length}</span></p>
                          <p>Total Amount ₹{total}</p>
                          <Button variant='contained' onClick={(e)=>checkoutClicked(e)}>Checkout</Button>
                          </div>
                          
                              {/* <div className='col'>
                              <p>{cartItems?.length}</p>
                              <p>₹{total}</p>
                            </div> */}
                           
                          
             
              </div>
 </div>
            </div>
              
            </div>
            </div>
           </div>
          
      </div>
       <div>
        <FooterMenu/>
        <BottomNavBar/>
       </div>
    </div>

      )
}




