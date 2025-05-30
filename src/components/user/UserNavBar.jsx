import { useEffect,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { userViewFun } from '../../service/allApis';
import Button from '@mui/material/Button';
import logo from '../../images/logo.jpg'

export default function UserNavBar() {

    const [profile,setProfile]=useState({})
    const navigate=useNavigate()

    useEffect(()=>{
        sessionStorage.getItem("userId")
       },[]) 

    const viewProfile = async () => {
        if (sessionStorage.getItem("userId")) {
          const uid = sessionStorage.getItem("userId")
          const idd = JSON.parse(uid)
    
          const result = await userViewFun(idd)
          if(result.status==200){
          setProfile({
            name:result.data.name
          })
        }
        }
    }

   useEffect(()=>{
    viewProfile()
   },[]) 

   const logout=()=>{
    sessionStorage.clear()
    navigate('/')
   }

  return (
    <Navbar expand="sm"  bg="light" data-bs-theme="light">
      <Container fluid>
        <Navbar.Brand href="#" className='h2'><img style={{width:'70px'}} src={logo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
           <Nav
            // className="me-auto my-2 my-lg-0"
            // style={{ maxHeight: '100px' }}
            // navbarScroll
          >
             <Link className='mt-2 ms-3 text-dark d-xs-none d-sm-none d-md-none d-lg-block' style={{textDecoration:'none'}} to={'/'}>Home</Link>
             <Link className='mt-2 ms-3 text-dark d-xs-none d-sm-none d-md-none d-lg-block' style={{textDecoration:'none'}} to={'/cart'}>Cart</Link>
             <Link className='mt-2 ms-3 text-dark d-xs-none d-sm-none d-md-none d-lg-block' style={{textDecoration:'none'}} to={'/wishlist'}>Wishlist</Link>
             <Link className='mt-2 ms-3 text-dark d-xs-none d-sm-none d-md-none d-lg-block' style={{textDecoration:'none'}} to={'/profile'}>Profile</Link>
          </Nav> 
         
          <div className='login-btn-header'>
          { profile.name?  <div className='text-dark text-end'> Hi {profile.name} <Button onClick={logout}>Logout</Button> </div>: <Button onClick={() => navigate('/login')} variant='contained'>Login</Button> }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

