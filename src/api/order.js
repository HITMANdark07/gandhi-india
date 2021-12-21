import { isAuthenticated } from "../auth";
import { API } from "../config";
import { getCart } from "./cartHelper";


export const createOrder = (d) => {
    let products = getCart().map((pro)=> pro._id);
    const data = {
        products: products,
        address: d.address,
        payment_mode:d.method
    }
    if(d.couponId){
        data['coupon']= d.couponId;
    }
    return fetch(`${API}/order/create/${isAuthenticated().user._id}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${isAuthenticated().token}`
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    })
}

export const getOrders = () => {
    return fetch(`${API}/orders/${isAuthenticated().user._id}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${isAuthenticated().token}`
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err);
    })
}