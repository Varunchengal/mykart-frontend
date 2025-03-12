import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { userViewFun } from '../../service/allApis';
import Card from 'react-bootstrap/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BASEURL } from '../../service/baseUrl';
import BottomNavBar from './BottomNavBar';
import EditUserProfile from './EditUserProfile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserNavBar from './UserNavBar';
import FooterMenu from './FooterMenu';

export default function UserProfile() {

    const [profile,setProfile]=useState({})
    const [refresh,setRefresh]=useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
      if(!sessionStorage.getItem("userId")){
      
        navigate('/login')
      }
    },[])
   

    const viewProfile=async()=>{
      if(sessionStorage.getItem("userId")){
          const uid=sessionStorage.getItem("userId")
          const idd= JSON.parse(uid)
          
          const result=await userViewFun(idd)
          console.log(result)
          setProfile({
            id:idd,
            name:result.data.name,
            email:result.data.email,
            password:result.data.password,
            addName:result.data.address[0].addName,
            addStreet:result.data.address[0].addStreet,
            addCity:result.data.address[0].addCity,
            addPin:result.data.address[0].addPin,
            phone:result.data.phone,
            profile:result.data.profile
        })
        
      }
  }

  useEffect(()=>{
    viewProfile()
},[])

    useEffect(()=>{
        viewProfile()
    },[profile])


  console.log(profile)
  return (
    <div>
      <UserNavBar/>
      <h2 className='admin-heading'>Profile</h2>
        <div>
            <div className='edit-pms'>
                <div>
                <Card style={{ width: '18rem' }}>
      <Card.Body>
        {profile.profile?( <img className='profile-img' src={`${BASEURL}/upload/${profile.profile}`} alt="" />)
        :
      (<Avatar sx={{ width: 56, height: 56 }} style={{margin:'auto'}}>
        <AccountCircleIcon/>
      </Avatar >)}
        <Card.Title style={{textAlign:'center'}}>Hi {profile.name}</Card.Title>
        <Card.Text>
        <p className='mb-1 mt-2 text-center'><span className='text-primary'>Email:</span>{profile.email}</p>
        <p className='mb-1' style={{textAlign:'center'}}><span className='text-primary'>Password:</span><span>{profile.password}</span></p>
        <p className='mb-1' style={{textAlign:'center'}}><span className='text-primary'>Address:</span><span>{profile.addName},{profile.addStreet},{profile.addCity}</span></p><p className='text-center'>Pin: {profile.addPin}</p>
        <p className='mb-1' style={{textAlign:'center'}}><span className='text-primary'>Phone:</span><span>{profile.phone}</span></p>
        </Card.Text>
        <EditUserProfile/>
      </Card.Body>
    </Card>
                </div>
            </div>
        </div>
        <FooterMenu/>
        <BottomNavBar/>
    </div>
  )
}
