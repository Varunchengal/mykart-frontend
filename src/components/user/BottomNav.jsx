import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const navigate=useNavigate()

  React.useEffect(()=>{
    handleChange()
    if(value=='home'){
      navigate('home')
      
    }
  },[])

  return (
    <div className='foot'>
    <BottomNavigation className='nav-bg-clr' value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        
      />
      <BottomNavigationAction
        label="Category"
        value="category"
        icon={<CategoryIcon />}
      />
      <BottomNavigationAction
        label="Cart"
        value="cart"
        icon={<ShoppingCartCheckoutIcon />}
      />
      <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircleIcon />} />
    </BottomNavigation>
    </div>
  );
}