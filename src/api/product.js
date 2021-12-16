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
        fetch(`${API}/products/list`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
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

export const getProductById =(id) => {
    return(
        fetch(`${API}/product/details/${id}`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
        .catch(err => err)
    )
}
export const getProductByCategorySlug = (slug) => {
    return fetch(`${API}/product/by-category-slug/${slug}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((response) => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const getProductByCategoryId = (id) => {
    return fetch(`${API}/product/by-category/${id}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((response) => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const getProductsByCategory =(slug) => {
    return(
        fetch(`${API}/product/by-category-slug/${slug}`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
        .catch(err => err)
    )
}
export const getFeatureProducts =() => {
    return(
        fetch(`${API}/featured/products`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
        .catch(err => err)
    )
}