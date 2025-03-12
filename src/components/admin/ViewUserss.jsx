import React,{useEffect, useState} from 'react'
import { Table } from 'react-bootstrap'
import { viewUsersByAdmin } from '../../service/allApis'
import AdminNavBar from './AdminNavBar';

function ViewUserss() {

    const [users,setUsers]=useState()

    const userView=async()=>{
        const lists=await viewUsersByAdmin()
        setUsers(lists.data)
        console.log(lists)
    }

    useEffect(()=>{
        userView()
    },[])
console.log(users)
  return (
    <div>
        <AdminNavBar/>
       
        <h2 className='admin-heading'>View Users</h2>
        <div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Contact</th>
                        </tr>
                        </thead>
                        <tbody>
                     { users?.map((item)=>(  
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.address[0].addName}</td>
                                <td>{item.phone}</td>
                            </tr>
                       ))}
                        </tbody>
                    
                </Table>
            </div>
        </div>
        
    </div>
  )
}

export default ViewUserss