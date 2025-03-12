import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryProductsView from './CategoryProductsView';

export default function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  return (
    <div className="front-footer col-12 d-lg-none">
      <div className='d-flex justify-content-evenly foot'>
        <div className='pt-3 pb-3 btm-nav'>
          <i
            className="fa-solid fa-house fa-lg"
            style={{ color: location.pathname === '/' ? 'black' : 'white' }}
            onClick={() => navigate('/')}
          ></i>
        </div>
        <div className='pt-3 pb-3'>
          <i className="fa-solid fa-cart-shopping fa-fade fa-lg"
            style={{ color: location.pathname === '/cart' ? 'black' : 'white' }}
            onClick={() => navigate('/cart')}
          ></i>
        </div>
        {/* <div className='pt-3 pb-3'>
          <i className="fa-solid fa-bars fa-lg"></i>
        </div> */}
        <div><CategoryProductsView/> </div>
        <div className='pt-3 pb-3'>
          <i
            className="fa-solid fa-heart fa-lg"
            style={{ color: location.pathname === '/wishlist' ? 'black' : 'white' }}
            onClick={() => navigate('/wishlist')}
          ></i>
        </div>
        <div className='pt-3 pb-3'>
          <i className="fa-solid fa-user fa-lg"
            style={{ color: location.pathname === '/profile' ? 'black' : 'white' }}
            onClick={() => navigate('/profile')}
          ></i>
        </div>
      </div>
    </div>
  );
}