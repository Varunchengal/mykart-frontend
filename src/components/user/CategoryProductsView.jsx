import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { catViewProducts } from '../../service/allApis';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { BASEURL } from '../../service/baseUrl';


export default function CategoryProductsView() {
    const [modalShow,setModalShow]=useState(false)
    const [fullscreen, setFullscreen] = useState(true)
    const [search,setSearch]=useState()
    const [catLists,setCatLists]=useState()

    const viewCatProducts=async(cat)=>{
        setSearch(cat)
        const result=await catViewProducts(search)
        
        setCatLists(result.data)
    }

    useEffect(()=>{
        viewCatProducts()
    },[])

  return (
    <>


    <div onClick={() => setModalShow(true)} className='pt-3 pb-3'>
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
    
     
    <Modal style={{marginBottom:'50px !important'}} fullscreen={fullscreen} show={modalShow} onHide={() => setModalShow(false)}  aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <div className='cat-body'>
        
            <div className='cat-box' onClick={()=>viewCatProducts('mobile')}><div className=''><div><i class="fa-solid fa-mobile fa-2xl"></i></div>
            <div><span className='text-center'>Mobile</span></div></div>
            </div>
            
            <div className='cat-box' onClick={()=>viewCatProducts('fashion')}><div className=''><div><i class="fa-solid fa-shirt fa-2xl"></i></div>
            <div><span className='text-center'>Fashion</span></div></div>
            </div>

            <div className='cat-box' onClick={()=>viewCatProducts('electronics')}><div className=''><div><i class="fa-solid fa-tv fa-2xl"></i></div>
            <div><span className='text-center'>Electronics</span></div></div>
            </div>

            <div className='cat-box' onClick={()=>viewCatProducts('home')}><div className=''><div><i class="fa-solid fa-kitchen-set fa-2xl"></i></div>
            <div><span className='text-center'>Home</span></div></div>
            </div>

        
        </div> 

        <div className='row'>
          { catLists?.map((item)=>( <div className='col-6 col-md-4 col-lg-3 m-2'><Card sx={{ maxWidth: 300, maxHeight:400 }}>
     
      <CardMedia 
      style={{width:'150px',height:'150px',margin:'auto'}}
        component="img"
        // height="150px"
        image={`${BASEURL}/upload/${item.image1}`}
        alt={item.title}
      />
      <CardContent>
        <h3 className='text-center'>{item.title}</h3>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        
        </Typography>
        <h5><span>{item.crate}₹</span></h5>
      </CardContent>
       <CardActions >
       <div className='border-product me-2'>
       <i class="fa-solid fa-cart-shopping fa-lg" ></i>
       </div>
       
        <div  className='border-product'>
     <div> <i class="fa-sharp fa-solid fa-x fa-lg" style={{color: '#ff3d3d'}} ></i><span className='wish-list-rm-text'>Remove</span> </div>

        </div>
       
      
      </CardActions> 
     
    </Card></div> )) }
            </div>
        
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>
  );
}



// function App() {
//   const [modalShow, setModalShow] = useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch modal with grid
//       </Button>

//       <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
//     </>
//   );
// }

// render(<App />);