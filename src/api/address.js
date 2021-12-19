import { API } from "../config";
import { isAuthenticated } from "../auth";

export const getAddressByUser = () => {
    return fetch(`${API}/address-by-user/${isAuthenticated().user._id}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${isAuthenticated().token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}

export const createAdderss = (data) => {
    return fetch(`${API}/create/address/${isAuthenticated().user._id}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${isAuthenticated().token}`
        },
        body:JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const deleteAdderss = (id) => {
    return fetch(`${API}/address/delete/${id}/${isAuthenticated().user._id}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}