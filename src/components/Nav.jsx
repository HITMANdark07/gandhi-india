import React from 'react';
import styles from "../assets/css/nav.module.css";
import logo from "../assets/images/logo.png";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { withRouter, Link } from 'react-router-dom';
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

function Nav(props) {

  const childFunc = React.useRef(null);

  const allCats = React.useCallback(() => {
    getAllCategories().then((data) => {
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
    <div className={styles.navbar}>
      <div className={styles.up}>
        <div className={styles.mediaShow}>
        <div className={styles.menuShow}>
        <Badge>
        <Link className={styles.a} >
        <MenuIcon onClick={() => childFunc.current()}
        sx={{ fontSize: 30 }} />
        </Link>
        </Badge>
        </div>
        <img
          src={logo}
          style={{ width: "280px", flex:3, cursor:'pointer' }}
          alt="brand"
          onClick={() => props.history.push("/")}
        />
        </div>
        <div style={{flex:8}}>
          {/* <input type="text" style={{width:'90%', height:'100%', borderRadius:'10px'}} /> */}
          <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      verticalAlign: "center",
                      padding: "4px",
                      minWidth:'300px',
                      marginBottom:'5px',
                      float: "left",
                      marginLeft:'10px',
                      border: "1px solid grey",
                      borderRadius: "7px",
                    }}
                  >
                    <input
                      type="text"
                      className={styles.search}
                      value={searchTerm}
                      placeholder="Search"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        var keyCode = e.code || e.key;
                        if (
                          keyCode === "Enter" &&
                          e.target.value.trim() !== ""
                        ) {
                          props.history.push(`/search/${e.target.value}`);
                        }
                      }}
                    />
                    <SearchIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        my: 0.5,
                        padding: "5px",
                      }}
                      style={{color:'#ff631c'}}
                    />
                  </Box>
        </div>
        {/* <div className={styles.navitems} style={{flex:.8}}>
        {isAuthenticated() ? (
                      <Badge>
                          <Link>
                        <LogoutIcon sx={{fontSize:30}}
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
                        <PersonOutlineIcon sx={{fontSize:30}} color="#ff631c" />
                      </Link>
                    </Badge>
                  )}
        </div> */}
        <div className={styles.navitems} style={{flex:.8}}>
                  <Badge badgeContent={wishTotal()} color="primary">
                    <Link to="/wishlist">
                      <FavoriteBorderIcon sx={{fontSize:30}} />
                    </Link>
                  </Badge>
        </div>
        <div className={styles.navitems} style={{flex:.8}}>
                  <Badge badgeContent={ItemTotal()} color="primary">
                    <Link to="/cart">
                      <ShoppingCartIcon sx={{fontSize:30}} />
                    </Link>
                  </Badge>
        </div>
      </div>
      <div className={styles.down} >
      <ul className={styles.ul}>
        <li className={[styles.li,styles.navitems].join(' ')}>
        <Badge>
        <Link className={styles.a} >
        <MenuIcon onClick={() => childFunc.current()}
        sx={{ fontSize: 30 }} />
        </Link>
        </Badge>
        </li>
        {/* <li className={[styles.li,styles.navitems].join(' ')}>
        <a className={styles.a} href="#">About</a></li> */}

        {categorys.map((cat) => (
            <li className={[styles.li,styles.navitems].join(' ')}>
            <Link className={styles.a} to={`/category/${cat.slug}`}>{cat.name} </Link>
            {/* <ul className={[styles.ul,styles.dropdown].join(' ')}>
                <li className={[styles.li,styles.navitems].join(' ')}><a className={styles.a} href="#">Laptops</a></li>
                <li className={[styles.li,styles.navitems].join(' ')}> <a className={styles.a} href="#">Monitors</a></li>
                <li className={[styles.li,styles.navitems].join(' ')}><a className={styles.a} href="#">Printers</a></li>
            </ul> */}
        </li>
        ))}
        {/* <li className={[styles.li,styles.navitems].join(' ')}>
            <a className={styles.a} href="#">Products ▾</a>
            <ul className={[styles.ul,styles.dropdown].join(' ')}>
                <li className={[styles.li,styles.navitems].join(' ')}><a className={styles.a} href="#">Laptops</a></li>
                <li className={[styles.li,styles.navitems].join(' ')}> <a className={styles.a} href="#">Monitors</a></li>
                <li className={[styles.li,styles.navitems].join(' ')}><a className={styles.a} href="#">Printers</a></li>
            </ul>
        </li> */}

        {/* <li className={[styles.li,styles.navitems].join(' ')}><a className={styles.a} href="#">Contact</a></li> */}
    </ul>
    <div>
        {
          isAuthenticated() ?
          (<button className={styles.button} onClick={() =>
            signout(() => {
              props.history.push("/signin");
            })
          }><LogoutIcon />LOGOUT</button>)
          :
          (<button className={styles.button} onClick={() => props.history.push("/signin")}><PersonOutlineIcon />LOGIN / REGISTER</button>)
        }
    </div>
      </div>
    </div>
    </>
  );
}

export default withRouter(Nav);