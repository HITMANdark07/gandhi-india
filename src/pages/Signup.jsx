import React, { useState } from 'react';
import Headers from "../components/Header";
import Footer from "../components/Footer";
import { Link, Redirect } from 'react-router-dom';
import classes from "../assets/css/form.module.css";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { isAuthenticated } from "../auth/index";
import { API } from '../config';
import makeToast from "../Toaster";
// import google from "../assets/images/google.png";
// import facebook from "../assets/images/facebook.png";

function Signup() {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, [])
      const [values, setValues] = useState({
        email:"",
        name: "",
        password: "",
        error: "",
        loading: false
      });
      const { loading,email, name, password, error } = values;
      const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

      const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values,loading:true, error:false});
        fetch(`${API}/user/activate`,{
          method:"POST",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
          },
          body:JSON.stringify({name,email,password})
      }).then(response => {
          response.json().then(res => {
              if(res.message){
                  makeToast("success", res.message);
                  setValues({...values,name:"", email:"",password:"",loading:false, error:false});
              }else{
                  makeToast("error", res.error);
                  setValues({...values,loading:false, error:res.error});
              }
          })
      })
      }
    
      const showError = () => (
        <div style={{display:error ? '' : 'none', alignItems:'center'}}>
        <Alert severity="error">{error}</Alert>
        </div>
      );
    return (
        <>
           <Headers />
           {isAuthenticated() && <Redirect to="/" />}
           <div className={classes.head} style={{marginTop:'110px'}}>
               {/* <div className={classes.socialLogins}>
                   <img className={classes.social} src={google} alt="google-alt" />
                   <img className={classes.social} src={facebook} alt="facebook-alt"/>
               </div> */}
           </div>
           <div className={classes.container}>
               <div className={classes.containerHead}>Signup with Email</div>
               <form className={classes.form}>
                    <div className={classes.inputgroup}>
                    <input className={classes.input} value={email} type="email" onChange={handleChange('email')} required  />
                    <span className={classes.highlight}></span>
                    <span className={classes.bar}></span>
                    <label className={classes.label}>Email</label>
                    </div>

                    <div className={classes.inputgroup}>
                    <input className={classes.input} value={name} type="text" onChange={handleChange('name')} required  />
                    <span className={classes.highlight}></span>
                    <span className={classes.bar}></span>
                    <label className={classes.label}>Name</label>
                    </div>

                    <div className={classes.inputgroup}>
                    <input type="password" onChange={handleChange('password')} value={password} required className={classes.input} />
                    <span className={classes.highlight}></span>
                    <span className={classes.bar}></span>
                    <label className={classes.label}>Password</label>
                    </div>
                    {showError()}
                    {/* <p style={{textAlign:"right"}}><Link href="/">Reset your password</Link></p> */}
                    <div className={classes.inputgroup}>
                        <button onClick={clickSubmit} style={{cursor:"pointer"}} className={classes.button}>{loading ? <CircularProgress size={24} style={{color:"#fff"}} /> : ""} Sign Up</button>
                    </div>
                    <div className={classes.signup} style={{marginBottom:'15px'}}>I already have an Account! <span className={classes.signupLink}>
                    <Link to="/signin">Signin Now</Link>
                    </span> </div>
               </form>
           </div>
           <Footer /> 
        </>
    )
}


export default Signup;
