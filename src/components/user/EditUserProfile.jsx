import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import { BASEURL } from '../../service/baseUrl';
import { editProfile } from '../../service/allApis';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import Avatar from '@mui/material/Avatar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BottomNavBar from './BottomNavBar';
import { userViewFun } from '../../service/allApis';

function EditUserProfile() {
  const [show, setShow] = useState(false);
  const [addressD, setAddressD] = useState({})
  const [item, setItem] = useState({})
  const [data, setData] = useState({})


  const [valT, setValT] = useState(true)
  const [valD, setValD] = useState(true)
  const [valC, setValC] = useState(true)
  const [valCat, setValCat] = useState(true)
  const [valM, setValM] = useState(true)
  const [valR, setValR] = useState(true)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    sessionStorage.getItem("userId")
  }, [])

  const viewProfile = async () => {
    if (sessionStorage.getItem("userId")) {
      const uid = sessionStorage.getItem("userId")
      const idd = JSON.parse(uid)

      const result = await userViewFun(idd)
      console.log(result)
      if (result.status == 200) {
        setData({
          id: idd,
          name: result.data.name,
          email: result.data.email,
          password: result.data.password,
          addName: result.data.address[0].addName,
          addStreet: result.data.address[0].addStreet,
          addCity: result.data.address[0].addCity,
          addPin: result.data.address[0].addPin,
          phone: result.data.phone,
          profile: result.data.profile
        })

        setItem({
          id: result.data._id,
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          password: result.data.password,
          profile:result.data.profile
        })

        setAddressD({ 
          addName: result.data.address[0].addName,
          addStreet: result.data.address[0].addStreet,
          addCity: result.data.address[0].addCity,
          addPin: result.data.address[0].addPin
        })
      }

    }
  }


  useEffect(() => {
    viewProfile()
  }, [])


  useEffect(() => {
    // viewProfile()
    if (item.profile !== data.profile) {
      setPreview(URL.createObjectURL(item.profile))
    }
  }, [item.profile])



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
    } else if (name == 'email') {
      if (value) {
        setItem({ ...item, [name]: value })
        setValD(true)
      } else {
        setValD(false)
      }
    } else if (name == 'addName') {
      if (value) {
        setAddressD({ ...addressD, [name]: value })
        setValC(true)
      } else {
        setValC(false)
      }
    }
    else if (name == 'addStreet') {
      if (value) {
        setAddressD({ ...addressD, [name]: value })
        setValC(true)
      } else {
        setValC(false)
      }
    }
    else if (name == 'addCity') {
      if (value) {
        setAddressD({ ...addressD, [name]: value })
        setValC(true)
      } else {
        setValC(false)
      }
    }
    else if (name == 'addPin') {
      if (value) {
        setAddressD({ ...addressD, [name]: value })
        setValC(true)
      } else {
        setValC(false)
      }
    } else if (name == 'phone') {
      if (value) {
        setItem({ ...item, [name]: value })
        setValCat(true)
      } else {
        setValCat(false)
      }

    }
  }


  const editClicked = async (e) => {
    e.preventDefault()
   
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

    const result = await editProfile(data.id, edited, headers)
    console.log(result)

    if (result.status == 200) {
      toast.success("Edited Succesfully..")
      console.log(item.profile)
      handleClose()
    } else {
      toast.error("OOPS!! Editing Failed..")
    }
  }

  console.log(item.profile)
  console.log(data)
  
  console.log(addressD)
  return (
    <>
      <div>

        {/* <Button variant='contained' color='dark' startIcon={<EditIcon/>} onClick={handleShow}>
      </Button> */}

        <IconButton aria-label="edit" color="primary" onClick={handleShow}>
          <EditIcon />
        </IconButton>



        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className='edit-pms'>
                <div>
                  <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      <label htmlFor="profile" className='edit-profile-align'>
                        <input type="file" style={{ display: 'none' }} name="profile" id="profile" onChange={(e) => setItem({ ...item, profile: e.target.files[0] })} />

                        {preview ?
                          ((<img className="edit-pr-im" src={preview} alt="" />)) : data.profile ? ((<img className="edit-pr-im" src={`${BASEURL}/upload/${data.profile}`} alt="" />))

                            :
                            (<Avatar sx={{ width: 100, height: 100 }} >
                              <PersonAddAlt1Icon />
                            </Avatar>)

                        }

                      </label>

                      <Card.Title style={{ textAlign: 'center' }}>Hi {item.name}</Card.Title>
                      <Card.Text>
                        {/* <Form.Label className='mt-5' for="title">Name</Form.Label> */}
                        <Form.Control
                          className='mb-2'
                          type='text'
                          name="name"
                          id="name"
                          placeholder='enter your name'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={data.name}

                        >

                        </Form.Control>
                        <Form.Control
                          className='mb-2'
                          type='email'
                          name="email"
                          id="email"
                          placeholder='enter email id'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={data.email}

                        >

                        </Form.Control>

                        <Form.Control
                          className='mb-2'
                          as="textarea"
                          name="addName"
                          id="addName"
                          placeholder='Enter Your House/ Compony Name'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={data.addName}
                        >

                        </Form.Control>

                        <Form.Control
                          className='mb-2'
                          as="textarea"
                          name="addStreet"
                          id="addStreet"
                          placeholder='Enter Your Street No. Or Name'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={data.addStreet}
                          required
                        >

                        </Form.Control>
                        <Form.Control
                          className='mb-2'
                          type='text'
                          name="addCity"
                          id="addCity"
                          placeholder='Enter Your City'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={data.addCity}

                        >
                        </Form.Control>
                        <Form.Control
                          className='mb-2'
                          type='text'
                          name="addPin"
                          id="addPin"
                          placeholder='Enter Your Postal Pin Code'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={data.addPin}

                        >
                        </Form.Control>


                        <Form.Control
                          className='mb-2'
                          type='number'
                          name="phone"
                          id="phone"
                          placeholder='Enter Your Phone Number'
                          onChange={(e) => inputHandler(e)}
                          defaultValue={data.phone}

                        >

                        </Form.Control>        </Card.Text>

                    </Card.Body>
                  </Card>

                </div>
              </div>


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => editClicked(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <BottomNavBar />
    </>
  );
}

export default EditUserProfile