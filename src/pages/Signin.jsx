import React, { useState } from "react";
import Headers from "../components/Header";
import Footer from "../components/Footer";
import { Link, withRouter, Redirect } from "react-router-dom";
import classes from "../assets/css/form.module.css";
import { isAuthenticated,authenticate, signin } from "../auth/index";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
// import google from "../assets/images/google.png";
// import facebook from "../assets/images/facebook.png";

function Signin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const { loading, username, password, redirectToReferrer, error } = values;
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ username, password })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, error: data.err, loading: false });
        } else if(data._id) {
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
  const showLoading = () => 
      loading && (
      <div style={{textAlign:"center"}}>
          <CircularProgress />
      </div>
      );
  return (
    <>
      <Headers />
      {redirectUser()}
      <div className={classes.head} style={{ marginTop: "90px" }}>
        <p className={classes.signup}>
          I dont have an account!{" "}
          <span className={classes.signupLink}>
            <Link to="/signup">Create Your Account</Link>
          </span>
        </p>
        {/* <div className={classes.socialLogins}>
                   <img className={classes.social} src={google} alt="google-alt" />
                   <img className={classes.social} src={facebook} alt="facebook-alt"/>
               </div> */}
        <div style={{ width: "20%", margin: "0 auto" }}>
          <div className={classes.or}>
            <span className={classes.orspan}>OR</span>
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.containerHead}>Sign in with Email</div>
        <form className={classes.form}>
          <div className={classes.inputgroup}>
            <input
              className={classes.input}
              value={username}
              onChange={handleChange("username")}
              required
            />
            <span className={classes.highlight}></span>
            <span className={classes.bar}></span>
            <label className={classes.label}>Username</label>
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
          {showLoading()}
          {/* <Link to="/"><p style={{textDecoration:'none',textAlign:"right"}}>Reset your password</p></Link> */}
          <div className={classes.inputgroup}>
            <button type="submit" onClick={clickSubmit} className={classes.button}>Sign in</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default withRouter(Signin);
