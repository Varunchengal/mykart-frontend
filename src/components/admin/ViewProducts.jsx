import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { viewProductAdmin } from '../../service/allApis'
import { BASEURL } from '../../service/baseUrl'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import AdminNavBar from './AdminNavBar';
import noImage from '../../images/no image available.jpg'

export default function ViewProducts() {

    const [products,setProducts]=useState()

    const ViewProductss=async()=>{
        const result=await viewProductAdmin()
        console.log(result)
        setProducts(result.data)
    }

    useEffect(()=>{
        ViewProductss()
    },[<EditProduct/>])

    useEffect(()=>{
        ViewProductss()
    },[])

    useEffect(()=>{
        ViewProductss()
    },[<DeleteProduct/>])
  return (
    <div>
        <AdminNavBar/>
        <h2 className='admin-heading'>View Products</h2>
    <div>
        <div>
            <Table>
                <thead>
                    <tr><th>Title</th>
                    <th>Description</th>
                    <th>Count</th>
                    <th>Category</th>
                    <th>MRP</th>
                    <th>Rate</th>
                    <th>Image 1</th>
                    <th>Image 2</th>
                    <th>Image 3</th>
                    <th></th>
                    <th></th></tr>
                </thead>

                <tbody>
                    { products?.map((items)=>
                    <tr>
                        <td>{items.title}</td>
                        <td>{items.description}</td>
                        <td>{items.count}</td>
                        <td>{items.category}</td>
                        <td>{items.mrp} ₹</td>
                        <td>{items.crate} ₹</td>
                        <td>{items.image1? <img className='image-product-viewpage' src={`${BASEURL}/upload/${items.image1}`} alt="" /> 
                        :
                        <img className='image-product-viewpage' src={noImage} alt="" />
                    }
                        </td>
                        <td>{items.image2? <img className='image-product-viewpage' src={`${BASEURL}/upload/${items.image2}`} alt="" /> 
                        :
                        <img className='image-product-viewpage' src={noImage} alt="" />
                    }
                        </td>                        <td>{items.image3? <img className='image-product-viewpage' src={`${BASEURL}/upload/${items.image3}`} alt="" /> 
                        :
                        <img className='image-product-viewpage' src={noImage} alt="" />
                    }
                        </td>
                        <td><EditProduct product={items}/></td>
                        <td><DeleteProduct id={items._id}/></td>
                    </tr>
)}
                </tbody>

            </Table>
        </div>
    </div>
   
    </div>
  )
}
