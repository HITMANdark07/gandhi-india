import { isAuthenticated } from "../auth"
import { API } from "../config"

export const createCategory = (data) => {
    return (fetch(`${API}/category/`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            token: `Bearer ${isAuthenticated().accessToken}`
        },
        body: JSON.stringify(data)
    }).then(response => response.json()
    ).catch(err =>  err))
}
export const updateCategory = (id,data) => {
    return (fetch(`${API}/category/${id}`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            token: `Bearer ${isAuthenticated().accessToken}`
        },
        body: JSON.stringify(data)
    }).then(response =>  response.json()
    ).catch(err =>err))
}
export const getAllCategories = () => {
    return (fetch(`${API}/category`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            token: `Bearer ${isAuthenticated().accessToken}`
        },
    }).then(response =>  response.json()
    ).catch(err =>err))
}