import React, { useState } from "react";
// import Headers from "../components/Header";
import Footer from "../components/Footer";
import { Link, withRouter, Redirect } from "react-router-dom";
import classes from "../assets/css/form.module.css";
import { isAuthenticated,authenticate, signin } from "../auth/index";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Nav from "../components/Nav";
// import google from "../assets/images/google.png";
// import facebook from "../assets/images/facebook.png";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const { loading, email, password, redirectToReferrer, error } = values;
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, error: data.err, loading: false });
        } else if(data.token) {
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }else{
            setValues({
                ...values,
                error: "Incorrect Username or Password"
            })
        }
      })
      .catch(() => setValues({ ...values, error: "Network Error" }));
  };
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    } else if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const showError = () => (
    <div style={{display:error ? '' : 'none', alignItems:'center'}}>
    <Alert severity="error">{error}</Alert>
    </div>
  );
  
  return (
    <>
      {/* <Headers /> */}
      <Nav />
      {redirectUser()}
      <div className={classes.head} style={{ marginTop: "170px"}}>
        
        {/* <div className={classes.socialLogins}>
                   <img className={classes.social} src={google} alt="google-alt" />
                   <img className={classes.social} src={facebook} alt="facebook-alt"/>
               </div> */}
        <div style={{ width: "20%", margin: "0 auto" }}>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.containerHead}>Sign in with Email</div>
        <form className={classes.form} >
          <div className={classes.inputgroup}>
            <input
              className={classes.input}
              value={email}
              onChange={handleChange("email")}
              required
            />
            <span className={classes.highlight}></span>
            <span className={classes.bar}></span>
            <label className={classes.label}>Email</label>
          </div>

          <div className={classes.inputgroup}>
            <input
              type="password"
              value={password}
              onChange={handleChange("password")}
              required
              className={classes.input}
            />
            <span className={classes.highlight}></span>
            <span className={classes.bar}></span>
            <label className={classes.label}>Password</label>
          </div>
          {showError()}
          {/* <Link to="/"><p style={{textDecoration:'none',textAlign:"right"}}>Reset your password</p></Link> */}
          <div className={classes.inputgroup}>
            <button type="submit" onClick={clickSubmit} style={{cursor:"pointer"}} className={classes.button}> {loading ? <CircularProgress size={24} style={{color:"#fff"}} /> : "" } Sign in</button>
          </div>
          <p className={classes.signup}>
          I dont have an account!{" "}
          <span className={classes.signupLink}>
            <Link to="/signup">Create Your Account</Link>
          </span>
        </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default withRouter(Signin);
