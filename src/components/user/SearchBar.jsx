import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { searchProductFun } from '../../service/allApis';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchedItem, setSearchedItem] = useState();
 const [search,setSearch]=useState()
 const navigate=useNavigate()
  const handleClear = () => {
    setSearch('');
    setSearchedItem([])
  };

  const searchHandle=(e)=>{
const value=e.target.value
if(value!==''){
 setSearch(value)
}else{
  setSearch('')
}
  }

    const searched=async()=>{
        if(search){
            const result=await searchProductFun(search)
      console.log(result)
      if(result.status===200){
        setSearchedItem(result.data)
        }else{
            setSearchedItem([])
        }
      
        
      }
    }
  
  
    useEffect(()=>{
      searched()
    },[search])


const toProductView=(productId)=>{
    console.log(productId)
    sessionStorage.setItem('productId',JSON.stringify(productId))
    navigate(`/product/${productId}`)
  }

  console.info(search)
  console.log(searchedItem)
  return (
    <>
    <TextField
      variant="outlined"
      placeholder="Search..."
      value={search}
      onChange={(e) => searchHandle(e)}
      fullWidth
      InputProps={{
        endAdornment: (
          search && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        ),
      }}
      
    />
    <div>
    {
        searchedItem?.map((item)=>(
                <div>
                <p style={{cursor:'pointer'}} onClick={(productId) =>toProductView(item._id)}>{item.title}</p>
                
              </div>
              ))  
            }</div>
            </>
  );
};

export default SearchBar;

 