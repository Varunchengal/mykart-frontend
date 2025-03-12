import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogin } from '../service/allApis';
import BottomNavBar from './user/BottomNavBar';
import UserNavBar from './user/UserNavBar'

export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const [login,setLogin]=useState({
    })
    const [valName,setValName]=useState(true)
    const [valEmail,setValEmail]=useState(true)
    const [valPass,setValPass]=useState(true)
    const [valMatch,setValMatch]=useState(true)
 const navigate=useNavigate()
   

    const validatingInput=(e)=>{
        const {name,value}=e.target
      

        if(name==='email')
        if(!!value.match(/^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,}$/)){
            setLogin({...login,[name]:value})
            setValEmail(true)
        }else{
            setValEmail(false)

        }else if(name==='password'){
          if(value.length>=6){
            setLogin({...login,[name]:value})
              setValPass(true)
            }else{
              setValPass(false)}
            
          }
              
          
          }
        

const loginClicked=async(e)=>{
e.preventDefault()
if(login.email && login.password){
const result=await userLogin(login)
console.log(result)

if(result.status===200){
  toast.success("Login Successfull...")

  if(result.data.role=='admin'){
    sessionStorage.setItem("userId",JSON.stringify(result.data.user._id))
    sessionStorage.setItem("role",JSON.stringify(result.data.role))
    sessionStorage.setItem("token",JSON.stringify(result.data.token))
  navigate('/admin')
  }else{
    sessionStorage.setItem("userId",JSON.stringify(result.data.user._id))
    sessionStorage.setItem("role",JSON.stringify(result.data.role))
    navigate('/')
  }

}else{
  toast.error("Login Failed...")
}
}else{
  toast.warning("Enter all fields...")
}
}
        

        console.log(login)
  return (
    <div>
      <UserNavBar/>
      <div className='reg-main-screen'>
        <div className='reg-screen border shadow'>
        
          <div className='reg-item'>
          <h2 className='mb-5'>Login</h2>
          
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
  
    
      { valEmail? <TextField id="email" type="email" label="Email" name='email' variant="outlined" onChange={(e)=>validatingInput(e)} />
      :
      <TextField id="email" type="email" label="Email" name='email' variant="outlined" error onChange={(e)=>validatingInput(e)}/>
}
    
    
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
    
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name='password'
           
            onChange={(e)=>validatingInput(e)}
          />

        </FormControl>
    { !valPass && <p className='text-danger'>Password must have minimum 6 characters</p> }
        <Button style={{width:'79%'}} variant="contained" onClick={(e)=>loginClicked(e)}>Login</Button>
    </Box>
    <Link to={'/reg'}><span className='text-secondary'>Create new account?</span> Register</Link> <br /> 
    <Link to={'/login'}><span className='text-secondary'>forgott password</span></Link> 
    </div> </div>
    </div>
<BottomNavBar/>
</div>
  );
}