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
import { userReg } from '../service/allApis';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import BottomNav from './user/BottomNav';
=======
>>>>>>> 5ab59ed991fb606ac623dcca51099453ef99559e
import BottomNavBar from './user/BottomNavBar';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const [reg,setReg]=useState({
    })
    const [valName,setValName]=useState(true)
    const [valEmail,setValEmail]=useState(true)
    const [valPass,setValPass]=useState(true)
    const [valMatch,setValMatch]=useState(true)

   

    const validatingInput=(e)=>{
        const {name,value}=e.target
      

        if(name==='name'){
            if(!!value.match(/^[a-zA-Z ]+$/)){
            setReg({...reg,[name]:value})
            setValName(true)
        }else{
            setValName(false)
        }
    }else if(name==='email')
        if(!!value.match(/^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,}$/)){
            setReg({...reg,[name]:value})
            setValEmail(true)
        }else{
            setValEmail(false)

        }else if(name==='password'){
          if(value.length>=6){
            setReg({...reg,[name]:value})
              setValPass(true)
            }else{
              setValPass(false)}
            
          }else if(name==='cpass'){
            if(value.length>=6){
              setReg({...reg,[name]:value})
                setValPass(true)
              }else{
                setValPass(false)}
              
              }
              
          
          }
        

const registrationClicked=async(e)=>{
e.preventDefault()
if(reg.name && reg.email && reg.password === reg.cpass){
const result=await userReg(reg)
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
        

        console.log(reg)
  return (
    <div>
      <div className='reg-main-screen'>
        <div className='reg-screen border shadow'>
        
          <div className='reg-item'>
          <h2 className='mb-5'>Register</h2>
          
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
   { valName?   <TextField id="name" label="Name" name='name' variant="outlined" onChange={(e)=>validatingInput(e)}  />
    :
    <TextField id="name" label="Name" name='name' variant="outlined" onChange={(e)=>validatingInput(e)} error />

   }
    
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
          { reg.password !==reg.cpass && <p className="text-danger">Password doesn't match</p>}
          { !valPass && <p className='text-danger'>Password must have minimum 6 characters</p> }
        </FormControl>   
        <Button style={{width:'79%'}} variant="contained" onClick={(e)=>registrationClicked(e)}>Register</Button>
    </Box> <Link to={'/login'}><span className='text-secondary'>Have an account?</span> Log in</Link> </div>
    </div>
   
    </div>
<<<<<<< HEAD
<BottomNavBar/>
=======
<BottomNavBar />
>>>>>>> 5ab59ed991fb606ac623dcca51099453ef99559e
</div>
  );
}
