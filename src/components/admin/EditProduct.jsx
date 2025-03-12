import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AdminBottomNav from './AdminBottomNav';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import { BASEURL } from '../../service/baseUrl';
import { productEdit } from '../../service/allApis';
import { toast } from 'react-toastify';

function EditProduct({product}) {
  const [show, setShow] = useState(false);
  const [item,setItem]=useState({
    title:product.title,
    description:product.description,
    category:product.category,
    count:product.count,
    mrp:product.mrp,
    crate:product.crate,
    image1:product.image1,
    image2:product.image2,
    image3:product.image3
  })
  const [valT, setValT] = useState(true)
  const [valD, setValD] = useState(true)
  const [valC, setValC] = useState(true)
  const [valCat, setValCat] = useState(true)
  const [valM, setValM] = useState(true)
  const [valR, setValR] = useState(true)

  
  const [preview1,setPreview1]=useState('')
  const [preview2,setPreview2]=useState('')
  const [preview3,setPreview3]=useState('')

  useEffect(()=>{
    if(item.image1 !==product.image1){
        setPreview1(URL.createObjectURL(item.image1))
    }
  },[item.image1])

  useEffect(()=>{
    if(item.image2 !== product.image2){
        setPreview2(URL.createObjectURL(item.image2))
    }
  },[item.image2])

  useEffect(()=>{
    if(item.image3 !== product.image3){
        setPreview3(URL.createObjectURL(item.image3))
    }
  },[item.image3])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const inputHandler = (e) => {
    const { name, value } = e.target

    if (name == 'title') {
        if (value) {
            setItem({ ...item, [name]: value })
            setValT(true)
        }
        else {
            setValT(false)
        }
    } else if (name == 'description') {
        if (value) {
            setItem({ ...item, [name]: value })
            setValD(true)
        } else {
            setValD(false)
        }
    } else if (name == 'count') {
        if (value) {
            setItem({ ...item, [name]: value })
            setValC(true)
        } else {
            setValC(false)
        }
    }
    else if (name == 'category') {
        if (value) {
            setItem({ ...item, [name]: value })
            setValCat(true)
        } else {
            setValCat(false)
        }
    }
    else if (name == 'mrp') {
        if (value) {
            setItem({ ...item, [name]: value })
            setValM(true)
        } else {
            setValM(false)
        }
    }
    else if (name == 'crate') {
        if (value) {
            setItem({ ...item, [name]: value })
            setValR(true)
        } else {
            setValR(false)
        }
    }
}


 const editClicked=async(e)=>{
        e.preventDefault()

        const data=new FormData()
        data.append("title",item.title)
        data.append("description",item.description)
        data.append("count",item.count)
        data.append("category",item.category)
        data.append("mrp",item.mrp)
        data.append("crate",item.crate)
        data.append("image1",item.image1)
        data.append("image2",item.image2)
        data.append("image3",item.image3)

        if(sessionStorage.getItem('token')){
            const t=sessionStorage.getItem('token')
            const token=JSON.parse(t)
        
        const headers={
            'Content-Type':'multipart/form-data', 'Authorization':`Bearer ${token}`
        }

        const result=await productEdit(product._id,data,headers)
        console.log(result)

        if(result.status==200){
            toast.success("Edited Succesfully..")
            handleClose()
        }else{
            toast.error("OOPS!! Editing Failed..")
        }
    }else{
        toast.warning("Login expired..")
    }
}
  console.log(product)
  return (
    <>
    <div>
      {/* <Button variant='contained' color='dark' startIcon={<EditIcon/>} onClick={handleShow}>
      </Button> */}

      <IconButton aria-label="edit" color="primary" onClick={handleShow}>
  <EditIcon />
</IconButton>

      <Modal  size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Label className='mt-5' for="title">Product Title</Form.Label>
                            <Form.Control
                                className='mb-4'
                                type='text'
                                name="title"
                                id="title"
                                placeholder='Product title here'
                                onChange={(e) => inputHandler(e)}
                                defaultValue={product.title}
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
                                defaultValue={product.description}
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
                                 defaultValue={product.count}
                            >

                            </Form.Control>
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select name='category' className='mb-3' defaultValue={product.category}>
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
                                defaultValue={product.mrp}
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
                                defaultValue={product.crate}
                            >

                            </Form.Control>

                            <label htmlFor="image1" className='' style={{Margin:'auto'}}>
                                        <input type="file" style={{ display: 'none' }} name="image1" id="image1" onChange={(e) => setItem({ ...item, image1: e.target.files[0] })} />
                                        {/* <UploadIcon sx={{ fontSize: 50 }} /> <br /> */}
                                        {preview1 ?
                                            (<img className="upload" src={preview1} alt="" />)
                                            :
                                            (<img className="upload" src={`${BASEURL}/upload/${product.image1}`} alt="" />)

                                        }

                                    </label> <br />
                                    <label htmlFor="image2" className='mt-5'>
                                        <input type="file" style={{ display: 'none' }} name="image2" id="image2" onChange={(e) => setItem({ ...item, image2: e.target.files[0] })} />
                                        
                                        {preview2 ?
                                            (<img className="upload" src={preview2} alt="" />)
                                            :
                                            (<img className="upload" src={`${BASEURL}/upload/${product.image2}`} alt="" />)

                                        }

                                    </label> <br />
                                    <label htmlFor="image3" className='mt-5'>
                                        <input type="file" style={{ display: 'none' }} name="image3" id="image3" onChange={(e) => setItem({ ...item, image3: e.target.files[0] })} />
                                        {/* <UploadIcon sx={{ fontSize: 50 }} /> <br /> */}
                                        {preview3 ?
                                            (<img className="upload" src={preview3} alt="" />)
                                            :
                                            (<img className="upload" src={`${BASEURL}/upload/${product.image3}`} alt="" />)

                                        }

                                    </label>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>editClicked(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <AdminBottomNav/>
    </>
  );
}

export default EditProduct