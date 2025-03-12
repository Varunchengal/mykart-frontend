import React,{ useEffect, useState }  from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { addToWish, removeWish, viewSingleProduct, viewWishLists } from '../../service/allApis';
import { BASEURL } from '../../service/baseUrl';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import BottomNavBar from './BottomNavBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ViewList } from '@mui/icons-material';
import Button from '@mui/material/Button';
import UserNavBar from './UserNavBar';
import FooterMenu from './FooterMenu';


function ViewProduct() {
    const [index, setIndex] = useState(0);
    const [productItem,setProductItem]=useState([])
    const [fav,setFav]=useState()
    const navigate=useNavigate()

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    }

    useEffect(()=>{
        sessionStorage.getItem("productId")
        const prId=sessionStorage.getItem("productId")
        const productId=JSON.parse(prId)
    },[])

    const viewItem=async()=>{
        if( sessionStorage.getItem("productId")){
            const prId=sessionStorage.getItem("productId")
            const productId=JSON.parse(prId)
        
        const result=await viewSingleProduct(productId)
        console.log(productId)
        console.log(result)
        if(result.status==200){
        setProductItem({
            _id:result.data._id,
            title:result.data.title,
            description:result.data.description,
            image1:result.data.image1,
            image2:result.data.image2,
            image3:result.data.image3,
            count:result.data.count,
            category:result.data.category,
            mrp:result.data.mrp,
            crate:result.data.crate
        })
        }
        }
    }

useEffect(()=>{
    viewItem()
},[])

const viewWishListFun = async () => {
  if (sessionStorage.getItem('userId')) {
    const uid = sessionStorage.getItem('userId')
    const userId = JSON.parse(uid)
    console.log(userId)
    const result = await viewWishLists(userId)
    setFav(result.data)
  
  }
}

useEffect(()=>{
  viewWishListFun()
},[])

//add to wishlist function
const addWishList = async (productItem) => {
    console.log(productItem)

    if (sessionStorage.getItem("userId")) {
      const uid = sessionStorage.getItem('userId')
      const userIdd = JSON.parse(uid)
      console.log(userIdd)

      const lists = new FormData()

      lists.append("productId", productItem._id)
      lists.append("productName", productItem.title)
      lists.append("productCount", productItem.count)
      lists.append("productMRate", productItem.mrp)
      lists.append("productRate", productItem.crate)
      lists.append("productCat", productItem.category)
      lists.append("productImage", productItem.image1)

      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      const result = await addToWish(userIdd, lists, headers)
      console.log(result)

      if (result.status == 200) {

        toast.success("Product added to wishlist")
        viewWishListFun()
        viewItem()
      }
    } else {
      navigate('/login')
    }
  }

   const rmWishList = async (productItem) => {
      if (sessionStorage.getItem("userId")) {
  
        const id = productItem._id
        console.log(id)
        const result1 = await removeWish(id)
        console.log(result1)
        if (result1.status == 200) {
          toast.success("Product removed from wishlist")
          viewItem()
          viewWishListFun()
        }
      } else {
        navigate('/login')
      }
    }




    console.log(productItem)
    return (
        <div>
          <UserNavBar/>
          Product<div className='container'>
            <div className='row'>
                <div className='col-12 col-lg-6'>
    <Carousel className='' activeIndex={index} onSelect={handleSelect}>
     
     {productItem.image1? <Carousel.Item>
        <img className='product-carousel' src={`${BASEURL}/upload/${productItem.image1}`} alt="First Image" />
      </Carousel.Item> : ''} {productItem.image2? <Carousel.Item>
     <img className='product-carousel' src={`${BASEURL}/upload/${productItem.image2}`} alt="Second Image" />
      </Carousel.Item>: "image"}{ productItem.image3? <Carousel.Item>
        <img className='product-carousel' src={`${BASEURL}/upload/${productItem.image3}` } alt="Third Image" />
      </Carousel.Item>:''}
    </Carousel>
  

                </div>
                <div className='col-12 col-lg-6'>
                    <h4 className=''>{productItem.title}</h4>
                    <p>{productItem.description}</p>
                    <h4>₹{productItem.crate}<span className='mrp'> ₹{productItem.mrp}</span></h4>
                    <Stack spacing={1}>
      {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      <span>Ratings</span><Rating name="half-rating-read" defaultValue={4} precision={0.5} readOnly size='small' />
    </Stack>
    
    
    <div className='product-btn-algn'>
      
    { productItem.count!==0? 
    (<div className='border-prdt'><i class="fa-solid fa-cart-shopping fa-lg"></i><span className='text-center'> Add To Cart</span>
    </div>): (<div className='border-prdt-wr'><p className='text-light text-center'>OUT OF STOCK</p></div>) }


      {/* <div className='border-prdt'>
    { productItem.count==0? <div className='bg-danger'>OUT OF STOCK</div>:
     <><i class="fa-solid fa-cart-shopping fa-lg"></i><span> Add To Cart</span></>  }
                  
                </div> */}
                

{fav?.some((list) => list.productId === productItem._id) ? (<div className='border-prdt' onClick={()=>rmWishList(productItem)}> 
  <i class="fa-sharp fa-solid fa-heart fa-lg" style={{ color: '#ff3d3d'}}></i><span> Remove</span>  </div>) 
  :  (<div className='border-prdt' onClick={()=>addWishList(productItem)}>
  <i class="fa-regular fa-heart fa-lg" ></i><span> Add To Wishlist</span> </div>)}

</div>
    

                </div>
            </div>
        </div>
        <div style={{marginTop:'100px'}}>
          <FooterMenu/>
            <BottomNavBar/> </div></div>
    )
}

export default ViewProduct
