import React, { Fragment, useState } from "react";
// import "../../App.css";
import { Route, Link, Routes } from "react-router-dom";
import Search from "./Search";
import { logout, loadUser } from "../../actions/userActions";
import "../../App.css";
import "../../Header.css";
import "../../index.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, Divider, TextField } from "@mui/material";
import { BsCart4 } from 'react-icons/bs';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';

const Header = () => {
    const notify = (message = "") =>
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const dispatch = useDispatch();

    const { user, loading, admin } = useSelector((state) => state.auth);
    // const { cartItems } = useSelector((state) => state.cart);
    // const { cartItemss } = useSelector((state) => state.carts);
    // const { cartItems } = useSelector((state) => state.cart);

    // const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        notify("Logged Out Successfully");
    };

    const profileHandler = () => {
        dispatch(loadUser());
    };

    const headerStyle = {
        backgroundColor: "##1b1b1c"
    }

    //Avatar DropDown
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleCloser = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    return (
        <section className = "h-wrapper">
        <div className="flexCenter innerWidth paddings h-container">
        <Fragment>
            <AppBar style={headerStyle}>
                <Toolbar>
                    {user ? (
                        <div className="flexCenter h-menu">
                        <Fragment>
                            <Button color="inherit" href="/forum" style={{ textAlign: 'center' }}> Forum </Button>
                            <Button color="inherit" href="/TaroPosts" style={{ textAlign: 'center' }}> About Taro </Button>
                            <Button color="inherit" href="/TaroDiseases" style={{ textAlign: 'center' }}> Diseases </Button>
                            <Button color="inherit" href="/ShopService" style={{ textAlign: 'center' }}> Preventive Measures </Button>

                            <Button color="inherit" onClick={handleClick}>
                                <Avatar src={user.avatar && user.avatar.url}
                                    alt={user && user.name} sx={{ width: 56, height: 56, marginLeft: "auto" }}>
                                </Avatar>
                            </Button>
                            <Menu
                                id="dropdown-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                                <Divider />
                                <MenuItem onClick={logoutHandler} to="/">Logout</MenuItem>
                            </Menu>
                        </Fragment>
                        </div>
                    ) : (
                        !loading && (
              
                            <Fragment>
                                <Typography component={Link} to="/" style={{ textDecoration: 'none' }} variant="h6" color="inherit" href="/" sx={{ fontSize: 24 }}>
                                    TARO E-ASSIST
                                </Typography>
                                <Button sx={{ marginLeft: "auto" }} color="inherit" href="/login">Login</Button>
                                <Button color="inherit" href="/register">Register</Button>
                            </Fragment>
                        )
                    )}
                </Toolbar>
            </AppBar >
        </Fragment >
        </div>
    </section>
    );
};

export default Header;