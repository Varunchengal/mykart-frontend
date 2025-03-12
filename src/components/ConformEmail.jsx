import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BottomNav from './user/BottomNav';
import { emailConformation, userLogin } from '../service/allApis';
import BottomNavBar from './user/BottomNavBar';

export default function ConformEmail() {

    const [data,setData]=useState({})
   
    const [valEmail,setValEmail]=useState(true)
   
 const navigate=useNavigate()
   

    const validatingInput=(e)=>{
        const {name,value}=e.target
      

        if(name==='email')
        if(!!value.match(/^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,}$/)){
            setData({...data,[name]:value})
            setValEmail(true)
        }else{
            setValEmail(false)

        }
              
          
          }
        

const verifyClicked=async(e)=>{
e.preventDefault()
if(data.email){
const result=await emailConformation(data)
console.log(result)
if(result.status==200){
  navigate('/changepass')
}else{
  toast.error("Email Not Found...")
}
}else{
  setValEmail(false)
  toast.error("Enter The Email Address..")
}
}
        
console.log(data)
     
  return (
    <div>
      <div className='cnf-mail-main-screen'>
        <div className='cnf-mail-screen border shadow'>
        
          <div className='reg-item'>
          <h2 className='mb-5'>Conform Email</h2>
          
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
    
    

    
        <Button style={{width:'79%'}} variant="contained" onClick={(e)=>verifyClicked(e)}>Conform</Button>
    </Box>
   
    </div> </div>
    </div>
<BottomNavBar/>
</div>
  );
}