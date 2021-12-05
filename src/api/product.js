import { isAuthenticated } from "../auth"
import { API } from "../config"

export const createProduct = (data) => {
    return (
        fetch(`${API}/products`,{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
                token: `Bearer ${isAuthenticated().accessToken}`
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .catch(err => err)
    )
}

export const getAllProducts =() => {
    return(
        fetch(`${API}/products`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
                token: `Bearer ${isAuthenticated().accessToken}`
            },
        }).then(response => response.json())
        .catch(err => err)
    )
}
export const deleteProduct =(id) => {
    return(
        fetch(`${API}/products/${id}`,{
            method:"DELETE",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
                token: `Bearer ${isAuthenticated().accessToken}`
            },
        }).then(response => response.json())
        .catch(err => err)
    )
}
export const updateProductById =(id,data) => {
    return(
        fetch(`${API}/products/${id}`,{
            method:"PUT",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
                token: `Bearer ${isAuthenticated().accessToken}`
            },
            body:JSON.stringify(data)
        }).then(response => response.json())
        .catch(err => err)
    )
}

export const getProductById =(id) => {
    return(
        fetch(`${API}/products/find/${id}`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
                token: `Bearer ${isAuthenticated().accessToken}`
            },
        }).then(response => response.json())
        .catch(err => err)
    )
}
export const getProductsByCategory =(id) => {
    return(
        fetch(`${API}/products/?category=${id}`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
                token: `Bearer ${isAuthenticated().accessToken}`
            },
        }).then(response => response.json())
        .catch(err => err)
    )
}