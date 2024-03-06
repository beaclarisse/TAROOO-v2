import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
    updateProfile,
    loadUser,
    clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import Sidebar from "../admin/Sidebar";
import Header from "../layout/Header";

const UpdateProfile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpg"
    );

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { error, isUpdated, loading } = useSelector((state) => state.user);

    const notify = (message = "") =>
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    const notifys = (message = "") =>
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    // console.log(error)

    useEffect(() => {
        console.log(isUpdated);

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            notify(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            notifys("User updated successfully");
            dispatch(loadUser());
            navigate("/profile", { replace: true });
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, isUpdated, navigate, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
    };

    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);

                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 40,
        height: '75vh',
        width: 1000,
        margin: "100px auto",
        backgroundColor: "#e2daeb"
    }

    const gridStyle = {
        paddingRight: 60,
        paddingTop: 20
    }

    return (
        <Fragment>
            {user.role !== "admin" && (
                <Fragment>
                    <Header />
                    <MetaData title={"Update Profile"} />
                    <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>Update Profile</Typography>
                            <form
                                onSubmit={submitHandler}
                                encType="multipart/form-data"
                            >
                                <FormGroup>
                                    <Stack spacing={4} alignItems='center'>

                                        <TextField label='Name' variant='standard' id='name_field'
                                            type='name' value={name}
                                            onChange={(e) => setName(e.target.value)} fullWidth required />

                                        <TextField label='Email' variant='standard' type="email"
                                            id="email_field" name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                        <div className="form-group">
                                            <label htmlFor="avatar_upload">Avatar</label>

                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <figure className="avatar mr-3 item-rtl">
                                                        <img
                                                            src={avatarPreview}
                                                            // className="rounded-circle"
                                                            alt="Avatar Preview"
                                                            width="55"
                                                            height="52"
                                                        />
                                                    </figure>
                                                </div>

                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        className="custom-file-input"
                                                        id="customFile"
                                                        accept="image/*"
                                                        onChange={onChange}
                                                    />

                                                    <label className="custom-file-label" htmlFor="customFile">
                                                        Choose Avatar
                                                    </label>


                                                </div>
                                            </div>
                                        </div>
                                        <Button id="register_button" type="submit" size="large" variant="contained" color="secondary" fullWidth>Update Profile</Button>
                                    </Stack>
                                </FormGroup>
                            </form>
                        </Paper>
                    </Grid>
                </Fragment>
            )}
            {user.role == "admin" && (
                <Fragment>
                    <MetaData title={"Update Profile"} />
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-10">
                            <Grid style={gridStyle}>
                                <Paper elevation={10} style={paperStyle}>
                                    <Typography variant='h3' align='center' padding='10px'>Update Profile</Typography>
                                    <form
                                        onSubmit={submitHandler}
                                        encType="multipart/form-data"
                                    >
                                        <FormGroup>
                                            <Stack spacing={4} alignItems='center'>

                                                <TextField label='Name' variant='standard' id='name_field'
                                                    type='name' value={name}
                                                    onChange={(e) => setName(e.target.value)} fullWidth required />

                                                <TextField label='Email' variant='standard' type="email"
                                                    id="email_field" name="email" value={email}
                                                    onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                                <div className="form-group">
                                                    <label htmlFor="avatar_upload">Avatar</label>

                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <figure className="avatar mr-3 item-rtl">
                                                                <img
                                                                    src={avatarPreview}
                                                                    // className="rounded-circle"
                                                                    alt="Avatar Preview"
                                                                    width="55"
                                                                    height="52"
                                                                />
                                                            </figure>
                                                        </div>

                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                name="avatar"
                                                                className="custom-file-input"
                                                                id="customFile"
                                                                accept="image/*"
                                                                onChange={onChange}
                                                            />

                                                            <label className="custom-file-label" htmlFor="customFile">
                                                                Choose Avatar
                                                            </label>


                                                        </div>
                                                    </div>
                                                </div>
                                                <Button id="register_button" type="submit" size="large" variant="contained" color="secondary" fullWidth>Update Profile</Button>
                                            </Stack>
                                        </FormGroup>
                                    </form>
                                </Paper>
                            </Grid>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateProfile;
