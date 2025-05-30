import { BASEURL } from "./baseUrl"
import { commonRequest } from "./commonRequest"

export const userReg=async(body)=>{
return await commonRequest("POST",`${BASEURL}/reg`,body,'')
}

export const userLogin=async(body)=>{
return await commonRequest("POST",`${BASEURL}/login`,body,'')
}

export const addProduct=async(body,headers)=>{
    return await commonRequest("POST",`${BASEURL}/add`,body,headers)
}

export const viewProductAdmin=async()=>{
    return await commonRequest("GET",`${BASEURL}/get`,'','')
}

export const productEdit=async(id,body,headers)=>{
    return await commonRequest("PUT",`${BASEURL}/edit/${id}`,body,headers)
}

export const productDel=async(id,headers)=>{
    return await commonRequest("DELETE",`${BASEURL}/del/${id}`,'',headers)
}

export const viewUsersByAdmin=async()=>{
    return await commonRequest("GET",`${BASEURL}/users`,'','')
}

export const userViewFun=async(id)=>{
    return await commonRequest("GET",`${BASEURL}/profile/${id}`,'','')
}

export const editProfile=async(id,body,headers)=>{
    return await commonRequest("PUT",`${BASEURL}/editprof/${id}`,body,headers)
}

export const viewProducts=async(page, limit)=>{
    return await commonRequest("GET",`${BASEURL}/view?page=${page}&limit=${limit}`,'','')
}


export const addToWish=async(id,body,headers)=>{
    return await commonRequest("POST",`${BASEURL}/addwish/${id}`,body,headers)
}

export const removeWish=async(id)=>{
    return await commonRequest("DELETE",`${BASEURL}/rmwish/${id}`,{},'')
}

export const viewWishLists=async(id)=>{
    return await commonRequest("GET",`${BASEURL}/wishlists/${id}`,'','')
}

export const removeWishList=async(id)=>{
    return await commonRequest("DELETE",`${BASEURL}/rmwlist/${id}`,{},'')
}

export const addToCartFun=async(id,body,headers)=>{
    return await commonRequest("POSt",`${BASEURL}/addcart/${id}`,body,headers)
}

export const viewCartListsFun=async(id)=>{
    return await commonRequest("GET",`${BASEURL}/cart/${id}`,{},'')
}

export const cartProductIncrement=async(id)=>{
    return await commonRequest("PUT",`${BASEURL}/inc/${id}`,{},'')
}

export const cartProductDecrement=async(id)=>{
    return await commonRequest("PUT",`${BASEURL}/dec/${id}`,{},'')
}

export const catViewProducts=async(search)=>{
    return await commonRequest("GET",`${BASEURL}/cat?search=${search}`,'','')
}
export const searchProductFun=async(search)=>{
    return await commonRequest("GET",`${BASEURL}/items?search=${search}`,'','')
}

export const viewSingleProduct=async(id)=>{
    return await commonRequest("GET",`${BASEURL}/product/${id}`,'','')
}

export const emailConformation=async(body)=>{
    return await commonRequest("POST",`${BASEURL}/emailverify`,body,'')
}

export const changePass=async(body)=>{
    return await commonRequest("PUT",`${BASEURL}/changepass`,body,'')
}

export const clearCart=async(id)=>{
    return await commonRequest("DELETE",`${BASEURL}/clear-cart/${id}`,{},'')
}

export const addToOrderFun=async(body)=>{
    return await commonRequest("POST",`${BASEURL}/add-to-orders`,body,'')
}
export const viewOrdersFun=async()=>{
    return await commonRequest("GET",`${BASEURL}/view-orders`,'','')
}