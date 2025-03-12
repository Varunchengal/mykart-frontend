import { useEffect,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link,useNavigate } from 'react-router-dom';
import { userViewFun } from '../../service/allApis';
import Button from '@mui/material/Button';

export default function AdminNavBar() {
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
    <Navbar className='navbar-top' expand="lg"  bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Mykart</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Link className='mt-2 ms-3 text-light' style={{textDecoration:'none'}} to={'/admin'}>Home</Link>
            <Link className='mt-2 ms-3 text-light' style={{textDecoration:'none'}} to={'/admin/add'}>Add Product</Link>
            <Link className='mt-2 ms-3 text-light' style={{textDecoration:'none'}} to={'/admin/view'}>View Products</Link>
            <Link className='mt-2 ms-3 text-light' style={{textDecoration:'none'}} to={'/admin/users'}>View Users</Link>
            <Link className='mt-2 ms-3 text-light' style={{textDecoration:'none'}} to={'/admin/orders'}>View Orders</Link>
            <Link className='mt-2 ms-3 text-light' style={{textDecoration:'none'}} to={'/admin/profile'}>Profile</Link>
           
          </Nav>
          <div className='login-btn-header'>
          { profile.name?  <div className='text-light text-end'> Hi {profile.name} <Button variant='contained' onClick={logout}>Logout</Button> </div>: <Button onClick={() => navigate('/login')} variant='contained'>Login</Button> }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

