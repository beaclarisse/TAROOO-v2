import React, { Fragment, useState } from "react";
// import  from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import BarChartIcon from '@mui/icons-material/BarChart';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuItem, Button, Menu, Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WidgetsIcon from '@mui/icons-material/Widgets';
//
import { Route, Link, Routes } from "react-router-dom";
import { logout, loadUser } from "../../actions/userActions";
import "../../App.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 180;

function Sidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const headerStyle = {
        backgroundColor: "#2f3c4c",
    }
    const iconStyle = {
        color: "white"
    }
    const drawerTypographyStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem',
    };

    const drawer = (
        <div>
            {/* <img src="/images/ -logo.png" width="auto" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }} /> */}
            {/* <Toolbar /> */}
            <List>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Components</Typography>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon style={iconStyle}>
                            <IconButton
                                size="medium"
                                color="inherit"
                                component={Link}
                                to="/admin/users"
                            >
                                <PersonIcon />
                                <ListItemText sx={{ paddingLeft: 3 }}>Users</ListItemText>
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon style={iconStyle}>
                            <IconButton
                                size="medium"
                                color="inherit"
                                component={Link}
                                to="/admin/posts"
                            >
                                <SportsMotorsportsIcon />
                                <ListItemText sx={{ paddingLeft: 3 }}>Posts</ListItemText>
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon style={iconStyle}>
                            <IconButton
                                size="medium"
                                color="inherit"
                                component={Link}
                                to="/diseases"
                            >
                                <HomeRepairServiceIcon />
                                <ListItemText sx={{ paddingLeft: 3 }}>Diseases</ListItemText>
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                {/* <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon style={iconStyle}>
                            <IconButton
                                size="medium"
                                color="inherit"
                                component={Link}
                                to="/admin/orders"
                            >
                                <ShoppingCartIcon />
                                <ListItemText sx={{ paddingLeft: 3 }}>Orders</ListItemText>
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem> */}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

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

    // const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        notify("Logged Out Successfully");
    };

    const profileHandler = () => {
        dispatch(loadUser());
    };


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
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
                style={headerStyle}
            >
                <Toolbar>
                    {user ? (
                        <Fragment>

                            <Typography>Taro E-Assist</Typography>
                            <Button sx={{ marginLeft: "auto" }} color="inherit" onClick={handleClick}>
                                <Avatar src={user.avatar && user.avatar.url}
                                    alt={user && user.name} sx={{ width: 56, height: 54, marginLeft: "" }}>
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

                    ) : (
                        !loading && (
                            // <Link to="/login" className="btn ml-4" id="login_btn">
                            //     Login
                            // </Link>
                            <Fragment>
                                {/* <Typography>Bhie-Cycle</Typography> */}
                                <Typography component={Link} to="http://localhost:3000/" style={{ textDecoration: 'none' }} variant="h6" color="inherit" href="/" sx={{ fontSize: 24 }}>
                                    Taro E-Assist
                                </Typography>
                                <Button sx={{ marginLeft: "auto" }} color="inherit" href="/login">Login</Button>
                                <Button color="inherit" href="/register">Register</Button>
                            </Fragment>
                        )
                    )}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#2f3c4c', color: 'white' },
                    }}
                    open
                >
                    {/* <Typography variant="h6" sx={{}}>Bhie Cycle</Typography> */}
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            </Box>
        </Box>
    );
}

Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Sidebar;