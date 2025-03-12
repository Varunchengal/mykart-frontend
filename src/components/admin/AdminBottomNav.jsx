import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminBottomNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 const navigate=useNavigate()

  const homePage=(e)=>{
    e.preventDefault()
    navigate('/admin')
  }

  const addProduct=()=>{
    // e.preventDefault()
navigate('/admin/add')
  }
  return (
    <div className='foot'>
    <BottomNavigation className='' value={value} onChange={handleChange} >
      <BottomNavigationAction
      onClick={(e)=>homePage(e)}
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
      onClick={addProduct}
        label="Add product"
        value="add"
        icon={<AddCircleOutlineIcon/>}
      />
    <Link to={'/admin/view'}>  <BottomNavigationAction
       
        label="View products"
        value="view"
        icon={<ProductionQuantityLimitsIcon />}
        
      />
      </Link>
       <BottomNavigationAction
        label="View Users"
        value="users"
        icon={<GroupIcon/>}
        />

      <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircleIcon />} />
    </BottomNavigation>
    </div>
  );
}
