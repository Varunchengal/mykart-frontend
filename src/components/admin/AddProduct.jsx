import react, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { addProduct } from '../../service/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

export default function AddProduct() {
    const [preview1, setPreview1] = useState('')
    const [preview2, setPreview2] = useState('')
    const [preview3, setPreview3] = useState('')
    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        count: '',
        mrp: '',
        crate: '',
        image1: '',
        image2: '',
        image3: ''
    })
const navigate=useNavigate()

    const [valT, setValT] = useState(true)
    const [valD, setValD] = useState(true)
    const [valC, setValC] = useState(true)
    const [valCat, setValCat] = useState(true)
    const [valM, setValM] = useState(true)
    const [valR, setValR] = useState(true)

    useEffect(() => {
        if (product.image1) {
            setPreview1(URL.createObjectURL(product.image1))
        }
    }, [product.image1])

    useEffect(() => {
        if (product.image2) {
            setPreview2(URL.createObjectURL(product.image2))
        }
    }, [product.image2])

    useEffect(() => {
        if (product.image3) {
            setPreview3(URL.createObjectURL(product.image3))
        }
    }, [product.image3])

    useEffect(()=>{
       if(!sessionStorage.getItem('token')){
        navigate('/login')
       } 
    },[])


    const inputHandler = (e) => {
        const { name, value } = e.target

        if (name == 'title') {
            if (value) {
                setProduct({ ...product, [name]: value })
                setValT(true)
            }
            else {
                setValT(false)
            }
        } else if (name == 'description') {
            if (value) {
                setProduct({ ...product, [name]: value })
                setValD(true)
            } else {
                setValD(false)
            }
        } else if (name == 'count') {
            if (value) {
                setProduct({ ...product, [name]: value })
                setValC(true)
            } else {
                setValC(false)
            }
        }
        else if (name == 'category') {
            if (value) {
                setProduct({ ...product, [name]: value })
                setValCat(true)
            } else {
                setValCat(false)
            }
        }
        else if (name == 'mrp') {
            if (value) {
                setProduct({ ...product, [name]: value })
                setValM(true)
            } else {
                setValM(false)
            }
        }
        else if (name == 'crate') {
            if (value) {
                setProduct({ ...product, [name]: value })
                setValR(true)
            } else {
                setValR(false)
            }
        }
    }

    const addClicked=async(e)=>{
        e.preventDefault()

        const data=new FormData()
        data.append("title",product.title)
        data.append("description",product.description)
        data.append("count",product.count)
        data.append("category",product.category)
        data.append("mrp",product.mrp)
        data.append("crate",product.crate)
        data.append("image1",product.image1)
        data.append("image2",product.image2)
        data.append("image3",product.image3)

        if(sessionStorage.getItem('token')){
            const t=sessionStorage.getItem('token')
            const token=JSON.parse(t)
        
        const headers={
            'Content-Type':'multipart/form-data', 'Authorization':`Bearer ${token}`
        }

        const result=await addProduct(data,headers)
        console.log(result)

        if(result.status==200){
            toast.success("Product Successfulyy Added...")
            clear()
        }else{
            toast.error("OOPS..Product Adding Failed")
        }
    }else{
        toast.warning("Login Expired.. Kindly Login...")
    }
}

const clear=()=>{
    setProduct({  title: '',
        description: '',
        category: '',
        count: '',
        mrp: '',
        crate: '',
        image1: '',
        image2: '',
        image3: ''})
        setPreview1('')
        setPreview2('')
        setPreview3('')
}
    console.log(product)
    return (
       <div>
        <AdminNavBar/>
       <div className='container'>
       <h2 className='admin-heading'>Add Product</h2>
            <div className='add-main'>
                <Form>
                    <div className='row add-product-screen'>


                        <div className='col-12 col-lg-6 '>
                            <Form.Label className='mt-5' for="title">Product Title</Form.Label>
                            <Form.Control
                                className='mb-4'
                                type='text'
                                name="title"
                                id="title"
                                placeholder='Product title here'
                                onChange={(e) => inputHandler(e)}
                                value={product.title}
                            >

                            </Form.Control>

                            <Form.Label for="description">Product Description</Form.Label>
                            <Form.Control
                                className='mb-3'
                                as="textarea"
                                name="description"
                                id="description"
                                placeholder='Product description here'
                                onChange={(e) => inputHandler(e)}
                                value={product.description}
                            >

                            </Form.Control>

                            <Form.Label for="count">Product Count</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type="number"
                                name="count"
                                id="count"
                                placeholder='Product count here'
                                onChange={(e) => inputHandler(e)}
                                value={product.count}
                            >

                            </Form.Control>
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select name='category' className='mb-3' onChange={(e) => inputHandler(e)} value={product.category}>
                                <option value="" selected disabled>select</option>
                                <option value="mobile">Mobile</option>
                                <option value="fashion">Fashion</option>
                                <option value="electronics">Electronics</option>
                                <option value="appliances">Appliances</option>
                                <option value="Furnitures">Furnitures</option>
                                <option value="beauty">Beauty Itmes</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="toys">Toys</option>

                            </Form.Select>

                            <Form.Label for="mrp">Product MRP</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type="text"
                                name="mrp"
                                id="mrp"
                                placeholder='Product maximum retail price here'
                                onChange={(e) => inputHandler(e)}
                                value={product.mrp}
                            >

                            </Form.Control>

                            <Form.Label for="crate">Product Current Rate</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type="text"
                                name="crate"
                                id="crate"
                                placeholder='Product current rate here'
                                onChange={(e) => inputHandler(e)}
                                value={product.crate}
                            >

                            </Form.Control>

                        </div>
                
                        <div className='col-12 col-lg-6'>
                            <div className='row' >
                              
                                <div className='col-12 add-images'>
                                
                                    <label htmlFor="image1" className='mt-5'>
                                        <input type="file" style={{ display: 'none' }} name="image1" id="image1" onChange={(e) => setProduct({ ...product, image1: e.target.files[0] })} />
                                        {/* <UploadIcon sx={{ fontSize: 50 }} /> <br /> */}
                                        {preview1 ?
                                            (<img className="upload" src={preview1} alt="" />)
                                            :
                                            (<div className='upload'><p style={{ paddingTop: '90px' }} className='text-center text-primary'>upload Image 1</p></div>)

                                        }

                                    </label> </div>

                             <div className='col-12 add-images'>   <label htmlFor="image2" className='mt-5'>
                                    <input type="file" style={{ display: 'none' }} name="image2" id="image2" onChange={(e) => setProduct({ ...product, image2: e.target.files[0] })} />
                                    {/* <UploadIcon sx={{ fontSize: 50 }} /> <br /> */}
                                    {preview2 ?
                                        (<img className="upload" src={preview2} alt="" />)
                                        :
                                        (<div className='upload'><p style={{ paddingTop: '99px' }} className='text-center text-primary'>upload Image 2</p></div>)

                                    }

                                </label>
                                </div>
                                    <div className='col-12 add-images'>
                                <label htmlFor="image3" className='mt-5'>
                                    <input type="file" style={{ display: 'none' }} name="image3" id="image3" onChange={(e) => setProduct({ ...product, image3: e.target.files[0] })} />
                                    {/* <UploadIcon sx={{ fontSize: 50 }} /> <br /> */}
                                    {preview3 ?
                                        (<img className="upload" src={preview3} alt="" />)
                                        :
                                        (<div className='upload'><p style={{ paddingTop: '99px' }} className='text-center text-primary'>upload Image 3</p></div>)

                                    }

                                </label>
                                </div>
                               

                            </div>
                        </div>

                    </div>
                </Form>
                                    <div className='row'>
                                    <div className="col-6">
                                <Button className='button-c' onClick={(e)=>addClicked(e)}>Add Product</Button>
                                </div>
                                <div className="col-6">
                                <Button className='button-c' onClick={clear}>Clear</Button>
                                </div>
                                    </div>
            </div>
           
        </div>
        

         </div>
    )
}