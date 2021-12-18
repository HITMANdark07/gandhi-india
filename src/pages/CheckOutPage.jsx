import React from 'react'
import Header from '../components/Header';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { getCart, emptyCart } from "../api/cartHelper";
import Button from "@mui/material/Button";
import { withRouter } from "react-router";
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { isAuthenticated } from '../auth';

function CheckOutPage({history}) {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    const [data,setData] = React.useState({
        fullName:"",
        phone:"",
        name:"",
        pincode:"",
        address1:"",
        address2:"",
        state:"",
        city:"",
        addressType:"",
        user:isAuthenticated().user._id,
    });
    const [cities, setCities] = React.useState([]);
    const { fullName, phone, name, pincode, address1, address2, state, city, addressType} = data;

    const handleChange = (event) => {
        setData({...data, [event.target.name]:event.target.value});

        if(event.target.name==='pincode'){
            if(event.target.value.length===6){
                fetch(`https://api.postalpincode.in/pincode/${event.target.value}`, {
                    method:'GET',
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json"
                    }
                }).then((response) => {
                    response.json().then((res) => {
                        if(data.Status==='Error'){
                            setData({...data, pincode:""})
                        }else{
                            const options =[];
                            res.PostOffice.forEach((po) => {
                                options.push(po.Name);
                            })
                            setCities(options);
                            setData({...data,state: res.PostOffice[0].State, city:res.PostOffice[0].Name });
                        }
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
    const total = getCart().reduce((acc, data) => data.count*data.price+acc,0);
    return (
        <>
        <Header />
        <div className="cartContainer" style={{minHeight:"60vh",marginTop: "100px", width: "90%", marginLeft:"5%"}} >
          <div style={{display:"flex",flexDirection:'column', flex:2}}>
            <div style={{flex:2,display:'flex',marginTop: "20px", flexDirection:'row'}}>
            <TextField
                id="standard-basic"
                type="text"
                label="Full Name"
                name='fullName'
                value={fullName}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex:1, margin:'5px', marginBottom:"10px" }}
              />
            <TextField
                id="standard-basic"
                type="text"
                label="Mobile Number"
                name="phone"
                value={phone}
                onChange={handleChange}
                variant="outlined"
                sx={{flex:1, margin:'5px',marginBottom:"10px" }}
              />

            </div>

            <div style={{flex:2,display:'flex', flexDirection:'row'}}>
            <TextField
                id="standard-basic"
                type="text"
                label="Address Nick Name"
                name="name"
                value={name}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex:1,margin:'5px', marginBottom:"10px" }}
              />
            <TextField
                id="standard-basic"
                type="text"
                label="Pin Code"
                name="pincode"
                value={pincode}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex:1,margin:'5px',marginBottom:"10px" }}
              />

            </div>

            <div style={{flex:2,display:'flex', flexDirection:'column'}}>
            <TextField
                id="standard-basic"
                type="text"
                label="Address Line 1"
                name="address1"
                value={address1}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex:1,margin:'5px', marginBottom:"10px" }}
              />
            <TextField
                id="standard-basic"
                type="text"
                label="Address Line 2 (Optional)"
                name="address2"
                value={address2}
                onChange={handleChange}
                variant="outlined"
                sx={{flex:1, margin:'5px',marginBottom:"10px" }}
              />

            </div>

            <div style={{flex:2,display:'flex', flexDirection:'row'}}>
            <TextField
                id="standard-basic"
                type="text"
                label="State"
                name="state"
                value={state}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex:1,margin:'5px', marginBottom:"10px" }}
              />
            {/* <TextField
                id="standard-basic"
                type="text"
                label="City"
                name="city"
                value={city}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex:1,margin:'5px',marginBottom:"10px" }}
              /> */}
              <FormControl sx={{ flex:1,margin:'5px', marginBottom:"10px" }}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="city"
                value={city}
                label="City"
                onChange={handleChange}
                >
                {cities.map((ct,idx) => (
                    <MenuItem key={idx} value={ct}>{ct}</MenuItem>
                ))}
                </Select>
            </FormControl>

            </div>
            <div style={{flex:1, flexDirection:'column'}}>
            <FormControl component="fieldset" sx={{margin:'5px',marginBottom:"10px"}}>
                <FormLabel component="legend">Address Type</FormLabel>
                <RadioGroup row aria-label="gender" name="addressType" value={addressType} onChange={handleChange}>
                    <FormControlLabel value="Home" control={<Radio />} label="Home" />
                    <FormControlLabel value="Work" control={<Radio />} label="Work" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
            </div>
            <Button color="primary" variant="contained"
            startIcon={<AddLocationIcon/>}
            onClick={() => {
                console.log(data);
            }}
            >ADD ADDRESS</Button> 
          </div>
          <div className="cartSummary">
              <h3>Cart Summary</h3>
            <table className="table">
                <thead>
              <tr className="tr">
                <td className="th">Product</td>
                <td className="th">Price</td>
                <td className="th">Quantity</td>
              </tr>
              </thead>
              <tbody>
              {getCart().map((pro) => (
                <tr key={pro._id} className="tr">
                  <td className="td">{pro.name}</td>
                  <td className="td">₹{pro.price}/-</td>
                  <td className="td">{pro.count}</td>
                </tr>
              ))}
              <tr className="tr">
                  <td className="td" colSpan={2}>Total:</td>
                  <td className="td">₹{total}/-</td>
              </tr>
              <tr className="tr">
                  <td style={{textAlign:"right"}} colSpan={3}>
                      <Button color="primary" variant="contained"
                      startIcon={<ShoppingCartCheckoutIcon/>}
                      size="large"
                      onClick={()=> {
                        emptyCart(() => {
                          history.push("/thank-you");
                        })
                      }}
                      fullWidth
                      >CHECKOUT NOW</Button> 
                  </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
            
        </>
    )
}

export default withRouter(CheckOutPage);
