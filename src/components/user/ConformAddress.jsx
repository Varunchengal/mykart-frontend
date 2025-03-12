import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { userViewFun } from '../../service/allApis';
import Card from 'react-bootstrap/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BASEURL } from '../../service/baseUrl';
import BottomNavBar from './BottomNavBar';
import EditUserProfile from './EditUserProfile';
import { toast } from 'react-toastify';
import { editProfile } from '../../service/allApis';
import Button from '@mui/material/Button';
import { AirlineSeatIndividualSuiteSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';

export default function ConformAddress() {


    const [profile,setProfile]=useState({})
    const [item, setItem] = useState()
    const [addressD,setAddressD]=useState()
    const [valT, setValT] = useState(true)
  const [valAddName, setValAddName] = useState(true)
  const [valAddStreet, setValAddStreet] = useState(true)
  const [valAddCity, setValAddCity] = useState(true)
  const [valAddPin, setValAddPin] = useState(true)
  const [valPh, setValPh] = useState(true)
  const navigate=useNavigate()
  
useEffect(()=>{
  if(sessionStorage.getItem("total")){
    const amount= sessionStorage.getItem("total")
 const totAmount=JSON.parse(amount)
  }else{
    navigate('/cart')
  }
})

    const viewProfile=async()=>{
        if(sessionStorage.getItem("userId")){
            const uid=sessionStorage.getItem("userId")
            const id= JSON.parse(uid)
            
            const result=await userViewFun(id)
            console.log(result)
            if(result.status==200){
            setProfile({
                name:result.data.name,
                addName:result.data.address[0].addName,
                addStreet:result.data.address[0].addStreet,
                addCity:result.data.address[0].addCity,
                addPin:result.data.address[0].addPin,
                phone:result.data.phone
            })

            setAddressD({
              addName:result.data.address[0].addName,
              addStreet:result.data.address[0].addStreet,
              addCity:result.data.address[0].addCity,
              addPin:result.data.address[0].addPin})

              setItem({
                id: result.data._id,
                name: result.data.name,
                email: result.data.email,
                phone: result.data.phone,
                password: result.data.password,
                profile:result.data.profile
              })
            }
        }
    }

    useEffect(()=>{
        viewProfile()
    },[])

    const inputHandler = (e) => {
        const { name, value } = e.target
    
        if (name == 'name') {
          if (value) {
            setItem({ ...item, [name]: value })
            setValT(true)
          }
          else {
            setValT(false)
          }
        }else if (name == 'addName') {
          if (value) {
            setAddressD({ ...addressD, [name]: value })
            setValAddName(true)
          } else {
            setValAddName(false)
          }
        }
        else if (name == 'addStreet') {
            if (value) {
                setAddressD({ ...addressD, [name]: value })
                setValAddStreet(true)
            } else {
              setValAddStreet(false)
            }
          }
          else if (name == 'addCity') {
            if (value) {
                setAddressD({ ...addressD, [name]: value })
                setValAddCity(true)
            } else {
              setValAddCity(false)
            }
          }
          else if (name == 'addPin') {
            if (value) {
                setAddressD({ ...addressD, [name]: value })
                setValAddPin(true)
            } else {
              setValAddPin(false)
            }
          }
        else if (name == 'phone') {
          if (value) {
            setItem({ ...item, [name]: value })
            setValPh(true)
          } else {
            setValPh(false)
          }
    
        }

   

      }



        const continueClicked = async (e) => {
          e.preventDefault()
          if(addressD.addName && valAddName && valAddStreet && valT && valPh && valAddPin && valAddCity && addressD.addStreet && addressD.addCity && addressD.addPin && item.name && item.phone){
          const edited = new FormData()
          edited.append("name", item.name)
          edited.append("email", item.email)
          edited.append("address", JSON.stringify(addressD))
          edited.append("phone", item.phone)
          edited.append("password", item.password)
          edited.append("profile", item.profile)
      
      
          const headers = {
            'Content-Type': 'multipart/form-data'
          }
      
          const result = await editProfile(item.id, edited, headers)
          console.log(result)
      
          if (result.status == 200) {
            toast.success("Address Verified..")
              setTimeout(()=>{
                
                navigate('/payment')
              },2000)
              
          } else {
            toast.error("OOPS!! Editing Failed..")
          }
        }
        }
  console.log(profile)
  console.log(addressD)
  
  return (
    <div>
      <UserNavBar/>
        <div>
            <div className='edit-pms'>
                <div>
                <Card className='mb-5' style={{ width: '18rem' }}>
      <Card.Body>
      
        <Card.Title style={{textAlign:'center'}}>Hi {profile.name}</Card.Title>
        <Card.Text>
          <p>Please verify your delivery address</p>
        <Form.Control
                          className='mb-2'
                          type='text'
                          name="name"
                          id="name"
                          placeholder='Enter your name'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={profile.name}

                        >
</Form.Control>

{ !valT && <p className='text-danger'>Enter A Valid Name</p> }

                    <Form.Control
                          className='mb-2'
                          as="textarea"
                          name="addName"
                          id="addName"
                          placeholder='Enter Your House/ Compony Name'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={profile.addName}
                        >

                        </Form.Control>
      { !valAddName && <p className='text-danger'>Enter A Valid Name Or Number</p> }
                        
                        <Form.Control
                          className='mb-2'
                          as="textarea"
                          name="addStreet"
                          id="addStreet"
                          placeholder='Enter Your Street No. Or Name'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={profile.addStreet}
                          required
                        >

                        </Form.Control>

             { !valAddStreet && <p className='text-danger'>Enter A Valid Street No. Or Name</p> }   
                        <Form.Control
                          className='mb-2'
                          type='text'
                          name="addCity"
                          id="addCity"
                          placeholder='Enter Your City'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={profile.addCity}

                        >
</Form.Control>
 { !valAddCity && <p className='text-danger'>Enter A Valid City Name</p> }   
<Form.Control
                          className='mb-2'
                          type='text'
                          name="addPin"
                          id="addPin"
                          placeholder='Enter Your Postal Pin Code'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={profile.addPin}

                        >
</Form.Control>

  { !valAddPin && <p className='text-danger'>Enter A Valid Postal Code</p> }   


                        <Form.Control
                          className='mb-2'
                          type='text'
                          name="phone"
                          id="phone"
                          placeholder='Enter Your Phone Number'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={profile.phone}

                        >

                        </Form.Control> 
                        { !valPh && <p className='text-danger'>Enter A Valid Phone Number</p> }  
        </Card.Text>
       <Button variant='contained' onClick={(e)=>continueClicked(e)}>Continue</Button>
      </Card.Body>
    </Card>
                </div>
            </div>
        </div>
        <BottomNavBar/>
    </div>
  )
}
