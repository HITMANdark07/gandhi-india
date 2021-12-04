import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/images/logo.png";
import { isAuthenticated, signout } from "../auth/index";
import Avatar from "@mui/material/Avatar";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArticleIcon from "@mui/icons-material/Article";
import { withRouter } from "react-router";

function Drawer({ childFunc, history, cats }) {
  const [isOpen, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((o) => !o);
  }, []);
  React.useEffect(() => {
    childFunc.current = toggleDrawer;
  }, [toggleDrawer, childFunc]);
  const list = () => (
    <Box
      //   sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem button>
          <img src={logo} alt="logoalt" />
          {/* <ListItemText primary="Electronics" /> */}
        </ListItem>
      </List>
      <Divider />
      <List>
        {isAuthenticated() && isAuthenticated().isAdmin === true ? (
          <>
            <ListItem>
              <div style={{ fontWeight: "bold", marginLeft: "30px" }}>
                ADMIN AREA
              </div>
            </ListItem>
            <ListItem button onClick={() => history.push("/admin/orders")}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Orders" secondary="Manage Orders" />
            </ListItem>
            <ListItem>
              <div style={{ fontWeight: "bold", marginLeft: "30px" }}>
                CATALOGS
              </div>
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/manage-categories")}
            >
              <ListItemAvatar>
                <Avatar>
                  <Inventory2Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Categories"
                secondary="Manage Categories"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/manage-specification")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AllInboxIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Specification"
                secondary="Manage Specification"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/manage-products")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AutoAwesomeMotionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="All Products"
                secondary="Manage Products"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/add-products")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AssignmentTurnedInIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="New Product" secondary="Add Products" />
            </ListItem>
          </>
        ) : null}
        {/* <ListItem button >
          <ListItemText primary="PAGES" />
        </ListItem> */}
        <ListItem>
          <div style={{ fontWeight: "bold", marginLeft: "30px" }}>
            CATEGORIES
          </div>
          </ListItem>
          {cats.map((cat) => (
            <ListItem
              button
              key={cat._id}
              onClick={() => history.push(`/category/${cat._id}`)}
            >
              <ListItemAvatar>
                <Avatar>
                  <ArticleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={cat.categories}
                secondary="Categories"
              />
            </ListItem>
          ))}
        <ListItem button onClick={() => history.push("/wishlist")}>
          <ListItemAvatar>
            <Avatar>
              <FavoriteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="My WishList" secondary="wishlist" />
        </ListItem>
        <ListItem button onClick={() => history.push("/cart")}>
          <ListItemAvatar>
            <Avatar>
              <AddShoppingCartIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="My Cart" secondary="products Cart" />
        </ListItem>

        {isAuthenticated() && (
          <ListItem
            button
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <LogoutIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      {/* <Button onClick={toggleDrawer}>TOggle</Button> */}
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}

export default withRouter(Drawer);
