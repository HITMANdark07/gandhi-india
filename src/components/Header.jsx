import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from "./Drawer";
import MenuIcon from '@mui/icons-material/Menu';
import { isAuthenticated, signout } from "../auth";
import { getAllCategories } from "../api/category";
import Badge from '@mui/material/Badge';
import {ItemTotal} from "../api/cartHelper";
import { wishTotal } from "../api/wishHelper";

function Header(props) {
  const childFunc = React.useRef(null)

  const allCats = React.useCallback(() => {
    getAllCategories().then(data => {
      // console.log(data);
      setCategorys(data.filter(cat => cat.status===10));
    }) 
  },[]);
  React.useEffect(() => {
    allCats();
  }, [])
  const [categorys, setCategorys] = React.useState([]);
  return (
    <>
    <Drawer childFunc={childFunc} cats={categorys} />
    <div className="header">
      <nav>
        <ul>
          <li className="smallmedia" style={{marginTop:'15px', cursor:'pointer'}}>
              <MenuIcon onClick={() => childFunc.current()} sx={{fontSize:30}} />
          </li>
          <li className="logo">
            <Link to="/">
              <img className="logo" src={logo} alt="logo_gandhiindia" />
            </Link>
          </li>
          <div className="items">
            {categorys.map((cat) => (
              <li key={cat._id}>
              <span>
                <Link to={`/category/${cat.id}`}>{cat.categories}</Link>
              </span>
            </li>
            ))}
            
            {/* <li>
              <span>
                <Link to="/category/handcraft">Handcraft</Link>
              </span>
            </li>
            <li>
              <span>
                <Link to="/category/kitchen-appliances">Kitchen Appliances</Link>
              </span>
            </li>
            <li>
              <span>
                <Link to="/category/sarees">Sarees</Link>
              </span>
            </li>
            <li>
              <span>
                <Link to="/category/shirts">Shirts</Link>
              </span>
            </li>
            <li>
              <span>
                <Link to="/category/kids">Kids</Link>
              </span>
            </li> */}
          </div>
          <div className="items">
          <li >
            <span>
            <Box sx={{display:'flex',flexDirection:"row",verticalAlign:'center', float:'left' }}>
              <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5, paddingTop:"15px" }} />
              <TextField
                id="input-with-sx"
                label="Search"
                variant="standard"
              />
            </Box>
            </span>
          </li>
          </div>
          <div className="items">
          <li>
            <span>
                {isAuthenticated() ?
                (
                <LogoutIcon onClick={() => signout(() => {
                  props.history.push("/signin");
                })} style={{cursor:"pointer"}} />
              ):
                (<Link to="/signin">
                  <PersonOutlineIcon />
                </Link>)}
              </span>
            </li>
            <li>
            <span>
            <Badge badgeContent={wishTotal()} color="primary">
                <Link to="/wishlist">
                  <FavoriteBorderIcon />
                </Link>
            </Badge>
              </span>
            </li>
            <li>
            <span>
            <Badge badgeContent={ItemTotal()} color="primary">
                <Link to="/cart">
                  <ShoppingCartIcon />
                </Link>
                </Badge>
              </span>
            </li>
          </div>
        </ul>
      </nav>
    </div>
    </>
  );
}

export default withRouter(Header);
