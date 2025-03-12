import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { viewOrdersFun } from '../../service/allApis';
import AdminNavBar from './AdminNavBar';


export default function ViewOrders() {

    const [orders,setOrders]=useState()

    const viewOrdersAdmin=async()=>{
        const result=await viewOrdersFun()
        console.log(result)
        setOrders(result.data)
    }

    useEffect(()=>{
        viewOrdersAdmin()
    },[])

   
  return (
    <div>
        <AdminNavBar/>
        <h2 className='admin-heading'>Add Product</h2>
    <div>
        <div>
            <Table>
                <thead>
                    <tr><th>user Id</th>
                    <th>User Name</th>
                    <th>Payment Id</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                   </tr>
                </thead>

                <tbody>
                    { orders?.map((items)=>
                    <tr>
                        <td>{items.userId}</td>
                        <td>{items.userName}</td>
                        <td>{items.paymentId}</td>
                        <td>₹{items.amount}</td>
                        <td>{items.paymentStatus}</td>
                        
                        
                    </tr>
)}
                </tbody>

            </Table>
        </div>
    </div>
    
    </div>
  )
}
