
import './App.css';
import { Route,Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import UserPage from './components/user/UserPage';
import { ToastContainer } from 'react-toastify';
import AddProduct from './components/admin/AddProduct';
import AdminMainPage from './components/admin/AdminMainPage';
import ViewProducts from './components/admin/ViewProducts';
import ViewUsers from './components/admin/ViewUserss';
import AdminProfile from './components/admin/AdminProfile';
import HomePage from './components/user/HomePage';
import WishLists from './components/user/WishLists';
import ViewCart from './components/user/ViewCart';
import UserProfile from './components/user/UserProfile';
import ViewProduct from './components/user/ViewProduct';
import ConformEmail from './components/ConformEmail';
import ChangePassword from './components/ChangePassword';
import CheckoutPage from './components/user/CheckoutPage';
import ConformAddress from './components/user/ConformAddress'
import PaymentSuccess from './components/user/PaymentSuccess';
import Payment from './components/user/Payment';
import ViewOrders from './components/admin/ViewOrders';

function App() {


  return (
<div>
  <Routes>
     <Route path='/' element={<HomePage/>} />
    <Route path='reg' element={<RegisterPage/>} />
    <Route path='login' element={<LoginPage/>} />
    {/* <Route path='/' element={<UserPage/>} /> */}
    <Route path='admin/add' element={<AddProduct/>} />
    <Route path='admin' element={<AdminMainPage/>} />
    <Route path='admin/view' element={<ViewProducts/>} />
    <Route path='admin/users' element={<ViewUsers/>} />
    <Route path='admin/orders' element={<ViewOrders/>} />  
    <Route path='admin/profile' element={<AdminProfile/>} />
    <Route path='wishlist' element={<WishLists/>} />
    <Route path='cart' element={<ViewCart/>} />
    <Route path='profile' element={<UserProfile/>} />
    <Route path='product' element={<ViewProduct/>} />
    <Route path='email' element={<ConformEmail/>} />
    <Route path='changepass' element={<ChangePassword/>} />
    <Route path='checkout' element={<CheckoutPage/>} />
    <Route path="address" element={<ConformAddress/>} />
    <Route path="payment-success" element={<PaymentSuccess/>} />
    <Route path="payment" element={<Payment/>} />

  </Routes>
  <ToastContainer/>
</div>
  );
}

export default App;
