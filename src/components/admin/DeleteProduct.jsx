import { IconButton } from '@mui/material';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { productDel } from '../../service/allApis';
import { toast } from 'react-toastify';

function DeleteProduct({id}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteClicked=async(e)=>{
    e.preventDefault()
if(sessionStorage.getItem('token')){
    const t=sessionStorage.getItem('token')
    const token=JSON.parse(t)
    console.log(token)
    const headers={
        'Content-Type':'multipart/form-data', 'Authorization':`Bearer ${token}`
    }
    const result=await productDel(id,headers)
    console.log(result)
console.log(id)
    if(result.status==200){
        toast.success("Product deleted successfully...")
        handleClose()
    }else{
        toast.error("Product deletion failed..")
    }
  }
}
  return (
    <>
      <IconButton aria-label="Delete" color="primary" onClick={handleShow}>
  <DeleteIcon />
</IconButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conform</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you conform to delete this product</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           No
          </Button>
          <Button variant="primary" onClick={(e)=>deleteClicked(e)}>
           Yes Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProduct;