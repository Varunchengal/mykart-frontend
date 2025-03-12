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
import { changePass, userReg } from '../service/allApis';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BottomNav from './user/BottomNav';
import BottomNavBar from './user/BottomNavBar';

export default function ChangePassword() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const [pass,setPass]=useState({
    })
    const [valPass,setValPass]=useState(true)
    const [valMatch,setValMatch]=useState(true)

   

    const validatingInput=(e)=>{
        const {name,value}=e.target
      if(name==='password'){
          if(value.length>=6){
            setPass({...pass,[name]:value})
              setValPass(true)
            }else{
              setValPass(false)}
            
          }else if(name==='cpass'){
            if(value.length>=6){
              setPass({...pass,[name]:value})
                setValPass(true)
              }else{
                setValPass(false)}
              
              }
              
          
          }
        

const changePasswordClicked=async(e)=>{
e.preventDefault()
if(pass.password === pass.cpass){
const result=await changePass(pass)
console.log(result)

if(result.status===200){
  toast.success("Registration Successfull...")
}else{
  toast.error("Registration Failed...")
}
}else{
  toast.warning("Enter all fields...")
}
}
        

        console.log(pass)
  return (
    <div>
      <div className='reg-main-screen'>
        <div className='reg-screen border shadow'>
        
          <div className='reg-item'>
          <h2 className='mb-5'>Change Password</h2>
          
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
    
    
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
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="conform-password">Conform Password</InputLabel>
          <OutlinedInput
            id="conform-password"
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
            label="Conform Password"
            name="cpass"
            
            onChange={(e)=>validatingInput(e)}
          />
          { pass.password !==pass.cpass && <p className="text-danger">Password doesn't match</p>}
          { !valPass && <p className='text-danger'>Password must have minimum 6 characters</p> }
        </FormControl>   
        <Button style={{ width: '79%' }} variant="contained" onClick={(e) => changePasswordClicked(e)} 
        disabled={!pass.password || !pass.cpass || pass.password.length < 6 || pass.cpass.length < 6 || pass.password !== pass.cpass} > Change </Button>
    </Box>  </div>
    </div>
   
    </div>
<BottomNavBar/>
</div>
  );
}