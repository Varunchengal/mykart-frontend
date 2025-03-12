import react, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { addToCartFun, removeWishList, viewWishLists } from '../../service/allApis';
import { BASEURL } from '../../service/baseUrl';

import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pink } from '@mui/material/colors';
import BottomNav from './BottomNav';
import BottomNavBar from './BottomNavBar';
import UserNavBar from './UserNavBar';
import FooterMenu from './FooterMenu';

export default function WishLists(){

    const [myWishLists,setMyWishLists]=useState()
    const [fav,setFav]=useState()

    const [pId,setPId]=useState()

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme }) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        variants: [
          {
            props: ({ expand }) => !expand,
            style: {
              transform: 'rotate(0deg)',
            },
          },
          {
            props: ({ expand }) => !!expand,
            style: {
              transform: 'rotate(180deg)',
            },
          },
        ],
      }));
      
      const navigate=useNavigate()
      const [expanded, setExpanded] =useState(false);

      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

//       const viewProductsUser=async()=>{

//         const result=await viewProducts()
//         setProducts(result.data)
//       }

//  useEffect(()=>{
//     viewProductsUser()
//  },[])   
 
 const viewWishListFun=async()=>{
 if(sessionStorage.getItem('userId')) {
  const uid=sessionStorage.getItem('userId')
  const userId=JSON.parse(uid)
 console.log(userId)
  const result=await viewWishLists(userId)
  console.log(result)
  setMyWishLists(result.data)
 }else{
    navigate('/login')
 }
}

 useEffect(()=>{
  viewWishListFun()
 },[])



 const rmWishList=async(item)=>{
  if(sessionStorage.getItem("userId")){
    
    const id=item._id
    console.log(id)
    const result1=await removeWishList(id)
    console.log(result1)
    if(result1.status==200){
      toast.success("Product removed from wishlist")
        viewWishListFun()
    
    }else{
      toast.error("An error occured")
    }
}else{
  navigate('/login')
}
 }

 const addToCart=async(item)=>{

    const cartData=new FormData()
    cartData.append("productId",item.productId)
    cartData.append("title",item.productName)
    // cartData.append("count",item.productCount)
    cartData.append("category",item.productRate)
    cartData.append("mrp",item.productMRate)
    cartData.append("crate",item.productRate)
    cartData.append("image",item.productImage)
  
    const headers={
      'Content-Type': 'multipart/form-data'
    }
  
    const result=await addToCartFun(item.userId,cartData,headers)
  
    console.log(result)
    if(result.status===200){
      toast.success(`${item.productName} added to cart...`)
    }else if(result.status===406){
      toast.warning( `${item.productName} already added to cart...`)
    }else{
      toast.error("Product adding to cart failed...")
    }
   }
  
   const toProductView=(productId)=>{
    console.log(productId)
    sessionStorage.setItem('productId',JSON.stringify(productId))
    navigate('/product')
  }

 

      return(
    <div >
      <UserNavBar/>
      <h2 className='admin-heading'>Wishlist</h2>
        <div className='container mb-5'>
        <div> 
            
            { myWishLists?.length>0?
            <div className='row'>
          { myWishLists?.map((item)=>( <div className='col-6 col-md-4 col-lg-3 m-2'><Card sx={{ maxWidth: 300, maxHeight:400 }}>
            <div onClick={(productId) =>toProductView(item.productId)}>
      <CardMedia 
      style={{width:'150px',height:'150px',margin:'auto'}}
        component="img"
        // height="150px"
        image={`${BASEURL}/upload/${item.productImage}`}
        alt={item.productName}
      />
      <CardContent>
        <h3 className='text-center'>{item.productName}</h3>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        
        </Typography>
        <h5><span>{item.productRate}₹</span></h5>
      </CardContent>
      </div>
       <CardActions >
     { item.productCount==0 ? (<div className='border-product me-2'>
       {/* <i class="fa-solid fa-cart-shopping fa-lg"></i> */}
       Out of Stock
       </div>)
       :
       (<div className='border-product me-2'>
       <i class="fa-solid fa-cart-shopping fa-lg" onClick={()=>addToCart(item)}></i>
       </div>)
}
       
        <div  className='border-product'>
     <div> <i class="fa-sharp fa-solid fa-x fa-lg" style={{color: '#ff3d3d'}} onClick={()=>rmWishList(item)}></i><span className='wish-list-rm-text'>Remove</span> </div>

        </div>
       
      
      </CardActions> 
     
    </Card></div> )) }
            </div>
     : <div className='empty-page'><h2 >Your Wishlist Is Empty !</h2></div>   }
      </div>
        </div>
        <FooterMenu/>
       <BottomNavBar/>
    </div>

      )
}




