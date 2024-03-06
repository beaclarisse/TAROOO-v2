import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors, glogin } from "../../actions/userActions";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AppFooter from '../modules/views/AppFooter'
import Header from '../layout/Header'
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc'

import { Grid, Paper, Stack, TextField, FormGroup, Button, Typography, Divider } from '@mui/material';

const Login = () => {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const googlelogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        // setProfile(res.data);
                        // console.log(res.data);
                        dispatch(glogin(res.data))
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    // const redirect = location.search ? location.search.split("=")[1] : "/";
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : ''

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    const notifyerror = (message = "") =>
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

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

    useEffect(() => {
        if (isAuthenticated && redirect === "shipping") {
            // navigate(redirect.get('redirect'), {replace: true})
            navigate(`/${redirect}`, { replace: true });
        }
        else if (isAuthenticated && redirect === "shippingService") {
            // navigate(redirect.get('redirect'), {replace: true})
            navigate(`/${redirect}`, { replace: true });
        }
        else if (isAuthenticated) {
            navigate("/admin/posts");
            notify("Login Successfully")
        }

        if (error) {
            notifyerror(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    const paperStyle = {
        padding: 20,
        height: '80vh',
        width: 500,
        margin: "100px auto",
        backgroundColor: "#f5f5f5"
    }

    return (
        <Fragment>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <Fragment style={{ backgroundColor: "#f5f5f5" }}>
                    <MetaData title={"Login"} />
                    <Grid color='#f5f5f5'>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>Login</Typography>
                            <FormGroup onSubmit={submitHandler}>
                                <Stack spacing={3} alignItems='center'>
                                    <TextField label='Email' variant='standard' id='email_field'
                                        type='email' value={email}
                                        onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                    <TextField label='Password' variant='standard' id='password_field'
                                        type='password' value={password}
                                        onChange={(e) => setPassword(e.target.value)} fullWidth={true} required />
                                    <Stack direction='row' spacing={2}>
                                        {/* <Button size="medium" variant="contained" color="error">Forgot Password</Button> */}

                                        {/* <Button size="medium" variant="contained" color="secondary">Sign Up</Button> */}
                                        <Link to="/password/forgot">Forgot Password?</Link>
                                    </Stack>
                                    <Button size="large" variant="contained" color="primary" fullWidth type="submit" onClick={submitHandler}>Login</Button>
                                    {/* <Divider /> */}
                                    <Button size="large" variant="contained" color="primary" fullWidth type="submit" onClick={() => googlelogin()}>
                                        <FcGoogle style={{ width: 30, height: 30 }} />&nbsp;&nbsp;&nbsp; <span>Login with Google</span>
                                    </Button>
                                    <Button size="large" variant="contained" color="primary" fullWidth type="submit" href="/register">Register</Button>
                                </Stack>
                            </FormGroup>
                        </Paper>
                    </Grid>

                    {/* <AppFooter /> */}
                </Fragment>
            )
            }
        </Fragment >
    );
};

export default Login;