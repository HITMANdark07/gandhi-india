import { API } from "../config";

export const getCoupan = (code) => {
    return fetch(`${API}/coupan/code/${code.toUpperCase()}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err);
    })
}