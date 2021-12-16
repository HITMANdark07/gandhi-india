import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "./Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { isAuthenticated, signout } from "../auth";
import { getAllCategories } from "../api/category";
import Badge from "@mui/material/Badge";
import { ItemTotal } from "../api/cartHelper";
import { wishTotal } from "../api/wishHelper";

function Header(props) {
  const childFunc = React.useRef(null);

  const allCats = React.useCallback(() => {
    getAllCategories().then((data) => {
      console.log(data);
      setCategorys(data);
    });
  }, []);
  const [searchTerm, setSearchTerm] = React.useState("");
  React.useEffect(() => {
    allCats();
  }, [allCats]);
  const [categorys, setCategorys] = React.useState([]);
  return (
    <>
      <Drawer childFunc={childFunc} cats={categorys} />
      <div className="header">
        <nav>
          <ul>
            <li
              className="smallmedia"
              style={{ marginTop: "15px", cursor: "pointer" }}
            >
              <MenuIcon
                onClick={() => childFunc.current()}
                sx={{ fontSize: 30 }}
              />
            </li>
            <li className="logo">
              <Link to="/">
                <img className="logo" src={logo} alt="logo_gandhiindia" />
              </Link>
            </li>
            <div className="items">
              {categorys.map((cat) => (
                <li key={cat._id}
                >
                  <span 
                  >
                    <Link
                    className={props.history.location.pathname ===
                      `/category/${cat.slug}` ? "catLinks": ""}
                    to={`/category/${cat.slug}`}>{cat.name}</Link>
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
              <li>
                <span>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      verticalAlign: "center",
                      float: "left",
                    }}
                  >
                    <SearchIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        my: 0.5,
                        paddingTop: "15px",
                      }}
                    />
                    <TextField
                      id="input-with-sx"
                      label="Search"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        var keyCode = e.code || e.key;
                        if (keyCode === "Enter" && e.target.value.trim() !== "") {
                          props.history.push(`/search/${e.target.value}`);
                        }
                      }}
                    />
                  </Box>
                </span>
              </li>
            </div>
            <div className="items">
              <li>
                <span >
                  {isAuthenticated() ? (
                    <Badge>
                    <Link>
                    <LogoutIcon
                      onClick={() =>
                        signout(() => {
                          props.history.push("/signin");
                        })
                      }
                    />
                    </Link>
                    </Badge>
                  ) : (
                    <Badge>
                    <Link to="/signin">
                      <PersonOutlineIcon />
                    </Link>
                    </Badge>
                  )}
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
