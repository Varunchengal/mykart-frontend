import react, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import BottomNav from './BottomNav';
import { addToCartFun, addToWish, removeWish, searchProductFun, viewProducts, viewWishLists } from '../../service/allApis';
import { BASEURL } from '../../service/baseUrl';
import BottomNavBar from './BottomNavBar';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ViewProduct from './ViewProduct';
import SearchIcon from '@mui/icons-material/Search';
import FooterMenu from './FooterMenu';
import UserNavBar from './UserNavBar';

export default function HomePage() {

  const [products, setProducts] = useState()
  const [fav, setFav] = useState()
  const [search,setSearch]=useState()
  const [searchedItem,setSearchedItem]=useState()

  const [pId, setPId] = useState()

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

  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const viewProductsUser = async () => {

    const result = await viewProducts()
    setProducts(result.data)
  }

  useEffect(() => {
    viewProductsUser()
  }, [])

  const viewWishListFun = async () => {
    if (sessionStorage.getItem('userId')) {
      const uid = sessionStorage.getItem('userId')
      const userId = JSON.parse(uid)
      console.log(userId)
      const result = await viewWishLists(userId)
      setFav(result.data)
      setPId()
    }
  }

  useEffect(() => {
    viewWishListFun()
  }, [])

  const addWishList = async (item) => {
    console.log(item)

    if (sessionStorage.getItem("userId")) {
      const uid = sessionStorage.getItem('userId')
      const userIdd = JSON.parse(uid)
      console.log(userIdd)

      const lists = new FormData()

      lists.append("productId", item._id)
      lists.append("productName", item.title)
      lists.append("productCount", item.count)
      lists.append("productMRate", item.mrp)
      lists.append("productRate", item.crate)
      lists.append("productCat", item.category)
      lists.append("productImage", item.image1)

      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      const result = await addToWish(userIdd, lists, headers)
      console.log(result)

      if (result.status == 200) {

        toast.success("Product added to wishlist")
        viewProductsUser()
        viewWishListFun()
      }
    } else {
      navigate('/login')
    }
  }



  // useEffect(()=>{
  //   viewProductsUser()
  // },[addWishList])  

  const rmWishList = async (item) => {
    if (sessionStorage.getItem("userId")) {

      const id = item._id
      console.log(id)
      const result1 = await removeWish(id)
      console.log(result1)
      if (result1.status == 200) {
        toast.success("Product removed from wishlist")
        viewProductsUser()
        viewWishListFun()
      }
    } else {
      navigate('/login')
    }
  }

  const addToCart = async (item) => {

    if (sessionStorage.getItem("userId")) {
      const id = sessionStorage.getItem("userId")
      const uId = JSON.parse(id)
      const cartData = new FormData()
      cartData.append("productId", item._id)
      cartData.append("title", item.title)
      // cartData.append("count",item.count)
      cartData.append("category", item.category)
      cartData.append("mrp", item.mrp)
      cartData.append("crate", item.crate)
      cartData.append("image", item.image1)

      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      const result = await addToCartFun(uId, cartData, headers)
      console.log(result)
      if (result.status === 200) {
        toast.success(`${item.title} added to cart...`)
      } else if (result.status === 406) {
        toast.warning(`${item.title} already added to cart...`)
      } else {
        toast.error("Product adding to cart failed...")
      }
    } else {
      toast.warning("Login expired..")
      navigate('/login')
    }
  }

  const toProductView=(productId)=>{
    console.log(productId)
    sessionStorage.setItem('productId',JSON.stringify(productId))
    navigate(`/product`)
  }

  const searchHandle=(e)=>{
const value=e.target.value
if(value){
 setSearch(value)
}else{
  setSearch('@#')
}
  }
  const searched=async()=>{
    const result=await searchProductFun(search)
    console.log(result)
    if(result.status===200){
      setSearchedItem(result.data)
      
    }
  }


  useEffect(()=>{
    searched()
  },[search])

  console.log(search)
  console.log(searchedItem)

  return (
    <div >
       <UserNavBar/>
      <div className='mb-5'>
        <div>
          <div className='m-4'>
            
            <div className=''>
              <input className='searchbar'
              type="text" placeholder='search here' name="search" 
              onChange={(e)=>searchHandle(e)} 
              /> 
            </div>
            {
              searchedItem?.map((item)=>(
                <div>
                <p style={{cursor:'pointer'}} onClick={(productId) =>toProductView(item._id)}>{item.title}</p>
                
              </div>
              ))  
            }
          </div>
          <div className='row align-home-items' style={{ margin: 'auto' }}>

            {products?.map((item) => (<div className='col-12 col-md-4 col-lg-3 m-1'><Card sx={{ maxWidth: 240, maxHeight: 340 }}  style={{cursor:'pointer'}}>
             
            <div onClick={(productId) =>toProductView(item._id)}>
              <CardMedia
                style={{ width: '150px', height: '150px', margin: 'auto' }}
                component="img"
                // height="150px"
                image={`${BASEURL}/upload/${item.image1}`}
                alt={item.title}
              />
              <CardContent>
                <h3 className='text-center'>{item.title}</h3>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                </Typography>
                <h6><span className="mrp">₹{item.mrp} </span><span className=''>₹{item.crate}</span></h6>
              </CardContent>
              </div>
              <CardActions >


                <div className='border-product me-2'>
                  <i class="fa-solid fa-cart-shopping fa-lg" onClick={() => addToCart(item)}></i>
                </div>

                <div className='border-product'>

                  {fav?.some((list) => list.productId === item._id) ? (
                    <i class="fa-sharp fa-solid fa-heart fa-lg" style={{ color: '#ff3d3d' }} onClick={() => rmWishList(item)}></i>
                  ) : (
                    <i class="fa-regular fa-heart fa-lg" onClick={() => addWishList(item)}></i>
                  )}
                </div>

              </CardActions>

            </Card></div>))}
          </div>
        </div>
      </div>
      <FooterMenu/>
      <BottomNavBar />
    </div>

  )
}



