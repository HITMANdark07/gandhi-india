import React, { useCallback } from "react";
import Header from "../components/Header";
import { getCart } from "../api/cartHelper";
import Button from "@mui/material/Button";
import { withRouter } from "react-router";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { isAuthenticated } from "../auth";
import makeToast from "../Toaster";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PaymentIcon from '@mui/icons-material/Payment';
import SendIcon from '@mui/icons-material/Send';
import { createAdderss, getAddressByUser } from "../api/address";
import { getCoupan } from "../api/coupan";

function CheckOutPage({ history }) {
  const getmyaddress = useCallback(() => {
    getAddressByUser()
      .then((response) => {
        setalladdress(response);
        if (response.length === 0) {
          setShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getmyaddress();
  }, [getmyaddress]);
  const [data, setData] = React.useState({
    fullName: "",
    phone: "",
    name: "",
    pincode: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    addressType: "HOME",
    user: isAuthenticated().user._id,
  });
  const [alladdress, setalladdress] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [cities, setCities] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [coupan, setCoupan] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [method, setMethod] = React.useState("COD");
  const {
    fullName,
    phone,
    name,
    pincode,
    address1,
    address2,
    state,
    city,
    addressType,
  } = data;

  const handleAddAddress = () => {
    createAdderss(data)
      .then((response) => {
        if (response._id) {
          getmyaddress();
          setShow(false);
          makeToast("success", "Created Successfully");
        } else {
          makeToast("error", response.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });

    if (event.target.name === "pincode") {
      if (event.target.value.length === 6) {
        fetch(`https://api.postalpincode.in/pincode/${event.target.value}`, {
          method: "GET",
        })
          .then((response) => {
            response
              .json()
              .then((res) => {
                if (res[0].Status === "Success") {
                  const options = [];
                  res[0].PostOffice.forEach((po) => {
                    options.push(po.Name);
                  });
                  setCities(options);
                  setData({
                    ...data,
                    state: res[0].PostOffice[0].State,
                    city: res[0].PostOffice[0].Name,
                    pincode: event.target.value,
                  });
                } else {
                  setData({ ...data, pincode: "" });
                }
              })
              .catch(() => {
                setData({ ...data, pincode: "" });
                makeToast("warning", "Enter Correct pincode");
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const total = getCart().reduce(
    (acc, data) => data.count * data.price + acc,
    0
  );
  const applycode = () => {
    getCoupan(coupan)
      .then((data) => {
        if (data.error || data.isValid === 0) {
          makeToast("error", "INVALID COUPAN CODE");
          setDiscount(0);
          setCoupan("");
        } else {
          makeToast("success", data.code + " APPLIED");
          if (data.type === "percentage") {
            const ds = ((total * data.condition) / 100).toFixed(2);
            if (ds <= data.max) {
              setDiscount(ds);
            } else {
              setDiscount(data.max);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setDiscount(0);
        setCoupan("");
        makeToast("error", "INVALID COUPAN CODE");
      });
  };
  return (
    <>
      <Header />
      <div
        className="cartContainer"
        style={{
          minHeight: "60vh",
          marginTop: "100px",
          width: "90%",
          marginLeft: "5%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
          <div>
            <h2 style={{ margin: "5px" }}>
              SELECT ADDRESS{" "}
              <Button
                type="contanied"
                onClick={() => setShow(!show)}
                startIcon={<AddLocationAltIcon />}
              />{" "}
            </h2>
            <div>
              <FormControl
                component="fieldset"
                sx={{ margin: "5px", marginBottom: "10px" }}
              >
                <RadioGroup
                  column
                  aria-label="address"
                  name="address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                >
                  {alladdress.map((add) => (
                    <FormControlLabel
                      key={add._id}
                      value={add._id}
                      control={<Radio />}
                      label={
                        add.address1 +
                        " " +
                        add.pincode +
                        " " +
                        add.city +
                        " " +
                        add.state
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div style={{ display: show ? "" : "none" }}>
            <h2 style={{ margin: "5px" }}>ADD ADDRESS</h2>
            <div
              style={{
                flex: 2,
                display: "flex",
                marginTop: "20px",
                flexDirection: "row",
              }}
            >
              <TextField
                id="standard-basic"
                type="text"
                label="Full Name"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                type="text"
                label="Mobile Number"
                name="phone"
                value={phone}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
              />
            </div>

            <div style={{ flex: 2, display: "flex", flexDirection: "row" }}>
              <TextField
                id="standard-basic"
                type="text"
                label="Address Nick Name"
                name="name"
                value={name}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                type="text"
                label="Pin Code"
                name="pincode"
                value={pincode}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
              />
            </div>

            <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
              <TextField
                id="standard-basic"
                type="text"
                label="Address Line 1"
                name="address1"
                value={address1}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                type="text"
                label="Address Line 2 (Optional)"
                name="address2"
                value={address2}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
              />
            </div>

            <div style={{ flex: 2, display: "flex", flexDirection: "row" }}>
              <TextField
                id="standard-basic"
                type="text"
                label="State"
                name="state"
                value={state}
                onChange={handleChange}
                variant="outlined"
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
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
              <FormControl
                sx={{ flex: 1, margin: "5px", marginBottom: "10px" }}
              >
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="city"
                  value={city}
                  label="City"
                  onChange={handleChange}
                >
                  {cities.map((ct, idx) => (
                    <MenuItem key={idx} value={ct}>
                      {ct}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ flex: 1, flexDirection: "column" }}>
              <FormControl
                component="fieldset"
                sx={{ margin: "5px", marginBottom: "10px" }}
              >
                <FormLabel component="legend">Address Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="addressType"
                  name="addressType"
                  value={addressType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="HOME"
                    control={<Radio />}
                    label="HOME"
                  />
                  <FormControlLabel
                    value="WORK"
                    control={<Radio />}
                    label="WORK"
                  />
                  <FormControlLabel
                    value="OTHER"
                    control={<Radio />}
                    label="OTHER"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddLocationIcon />}
              onClick={handleAddAddress}
            >
              ADD ADDRESS
            </Button>
          </div>
          <div>
            <h2 style={{ margin: "5px" }}>SELECT PAYMENT METHOD </h2>
            <div>
              <FormControl
                component="fieldset"
                sx={{ margin: "5px", marginBottom: "10px" }}
              >
                <RadioGroup
                  column
                  name="method"
                  value={method}
                  onChange={(event) => {
                    setMethod(event.target.value);
                  }}
                >
                  <FormControlLabel value="COD" control={<Radio />} label="Cash on Delevery (COD)" />
                <FormControlLabel value="ONLINE" control={<Radio />} label="PAY ONLINE" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          {
            method==="COD" ?
            (<Button variant="contained" startIcon={<SendIcon />} >PLACE ORDER</Button>):
            (<Button variant="contained" startIcon={<PaymentIcon />} >PAY NOW</Button>)
          }
        </div>

        <div className="cartSummary">
          <h3>Cart Summary</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="standard-basic"
              type="text"
              label="COUPAN CODE"
              name="coupan"
              value={coupan}
              onChange={(e) => setCoupan(e.target.value.toUpperCase())}
              variant="outlined"
              sx={{ flex: 1, margin: "5px" }}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={applycode}
              fullWidth
              sx={{ flex: 1, marginTop: "5px", marginBottom: "5px" }}
            >
              APPLY COUPAN
            </Button>
          </div>
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
                <td className="td" colSpan={2}>
                  Total:
                </td>
                <td className="td">₹{total.toFixed(2)}/-</td>
              </tr>
              {discount > 0 ? (
                <>
                  <tr className="tr" style={{ marginTop: "20px" }}>
                    <td className="td" colSpan={2}>
                      Discount:
                    </td>
                    <td className="td">₹{discount}/-</td>
                  </tr>
                  <tr className="tr">
                    <td className="td" colSpan={2}>
                      Total Payable Amount:
                    </td>
                    <td className="td">₹{total - discount}/-</td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default withRouter(CheckOutPage);
