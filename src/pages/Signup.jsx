import React, { useState } from 'react';
import Headers from "../components/Header";
import Footer from "../components/Footer";
import { Link, Redirect } from 'react-router-dom';
import classes from "../assets/css/form.module.css";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { isAuthenticated,authenticate, signup } from "../auth/index";
// import google from "../assets/images/google.png";
// import facebook from "../assets/images/facebook.png";

function Signup() {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, [])
      const [values, setValues] = useState({
        email:"",
        username: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
      });
      const { loading,email, username, password, redirectToReferrer, error } = values;
      const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

      const redirectUser = () => {
        if (redirectToReferrer) {
          return <Redirect to="/" />;
        } else if (isAuthenticated()) {
          return <Redirect to="/" />;
        }
      };
      const clickSubmit = (event) => {
        event.preventDefault();
          setValues({...values,loading:true, error:false});
          signup({email, username, password})
        .then(data => {
            if(data.error){
                setValues({...values,loading:false, error: data.error, success: false});
            }else if(data.index===0){
                setValues({...values,loading:false, error: "User Already Exist", success: false});
            }else {
                   authenticate(data, () => {
                    setValues({...values,
                      email:'',
                      username:'',
                      password:'',
                      confirm:"",
                      error:'',
                      loading:false,
                      redirectToReferrer:true
              });
                   });
                }
            }).catch(() => setValues({...values, error:'Network Error'}))
      }
    
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
    return (
        <>
           <Headers />
           {redirectUser()}
           <div className={classes.head} style={{marginTop:'90px'}}>
               <div className={classes.signup}>I already have an Account! <span className={classes.signupLink}>
               <Link to="/signin">Signin Now</Link>
                </span> </div>
               {/* <div className={classes.socialLogins}>
                   <img className={classes.social} src={google} alt="google-alt" />
                   <img className={classes.social} src={facebook} alt="facebook-alt"/>
               </div> */}
               <div style={{width:"20%", margin:"0 auto"}}>
               <div className={classes.or}><span className={classes.orspan}>OR</span></div>
               </div>
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
                    <input className={classes.input} value={username} type="text" onChange={handleChange('username')} required  />
                    <span className={classes.highlight}></span>
                    <span className={classes.bar}></span>
                    <label className={classes.label}>User Name</label>
                    </div>

                    <div className={classes.inputgroup}>
                    <input type="password" onChange={handleChange('password')} value={password} required className={classes.input} />
                    <span className={classes.highlight}></span>
                    <span className={classes.bar}></span>
                    <label className={classes.label}>Password</label>
                    </div>
                    {showError()}
                    {showLoading()}
                    {/* <p style={{textAlign:"right"}}><Link href="/">Reset your password</Link></p> */}
                    <div className={classes.inputgroup}>
                        <button onClick={clickSubmit} className={classes.button}>Sign Up</button>
                    </div>
               </form>
           </div>
           <Footer /> 
        </>
    )
}


export default Signup;
