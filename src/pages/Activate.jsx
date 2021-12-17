import React from 'react'
import Header from '../components/Header';
import jwt from "jsonwebtoken";
import {authenticate, signup} from "../auth/index";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Redirect } from 'react-router-dom';

function Activate({match:{params:{token}}}) {
    const [data, setData] = React.useState({
        name:"",
        email:"",
        password:"",
        loading:false,
        success:false,
        error:false,
    })
    const {name,email,password, loading,success,error} = data;

    React.useEffect(() => {
        const {name , email, password} = jwt.decode(token);
        setData({
            name:name,
            email:email,
            password:password
        })
    },[token]);

    const showError = () => (
        <div style={{display:error ? '' : 'none', alignItems:'center'}}>
        <Alert severity="error">{error}</Alert>
        </div>
      );
    const showLoading = () => {
    loading && (
    <div style={{textAlign:"center"}}>
        <CircularProgress />
    </div>
    );
    }

    const handleSubmit = () => {
        setData({...data,loading:true});
        signup({email, name, password})
        .then(data => {
            if(data.error){
                setData({...data,loading:false, error: data.error, success: false});
            }else{
            authenticate(data, () => {
            setData({...data,
                success:true,
              });
                   });
            }
            }).catch(() => setData({...data, error:'Network Error'}))
    }
    return (
        <>
        <Header/>
        {success && <Redirect to="/" />}
        <div style={{
            textAlign:"center", 
            display:"flex",
            flexDirection:"column", 
            marginTop:"150px", 
            justifyContent:'center', 
            alignItems:"center"
        }}>
            <h2>HI, {name.toUpperCase()}</h2>
            <h4>Click Below to verify Your Account</h4>
            {showError()}
            {showLoading()}
            <button className='activate-bu' onClick={handleSubmit}>ACTIVATE</button>
        </div>
        </>
    )
}

export default Activate
