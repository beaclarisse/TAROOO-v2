import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormGroup, Grid, Select, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";

import {
    updateUser,
    getUserDetails,
    clearErrors,
} from "../../actions/userActions";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const roles = [
        "admin",
        "mechanic",
        "user"
    ];
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { error, isUpdated } = useSelector((state) => state.user);

    const { user } = useSelector((state) => state.userDetails);

    const { id } = useParams();

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        // console.log(user && user._id !== userId);

        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);

            setEmail(user.email);

            setRole(user.role);
        }

        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            successMsg("User updated successfully");
            navigate("/admin/users");
            dispatch({
                type: UPDATE_USER_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated, id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("role", role);
        dispatch(updateUser(user._id, formData));
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 40,
        height: '70vh',
        width: 1000,
        margin: "100px auto",
        backgroundColor: "#f5f5f5"
    }

    const gridStyle = {
        paddingRight: 60,
        paddingTop: 30
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <MetaData title={`Update User`} />
                    <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>Update User</Typography>
                            <form
                                onSubmit={submitHandler}
                                encType="multipart/form-data"
                            >
                                <FormGroup>
                                    <Stack spacing={2} alignItems='center'>
                                        <TextField label='Name' variant='standard' id='name_field'
                                            type='name' value={name}
                                            onChange={(e) => setName(e.target.value)} fullWidth required />
                                        <TextField
                                            id="email_field"
                                            label="Email"
                                            variant="standard"
                                            fullWidth required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <TextField label="Role" fullWidth disabled variant="standard"></TextField>
                                        <Select
                                            labelId="roles"
                                            label="Role"
                                            id="role_field"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            fullWidth required
                                        >
                                            {roles.map((roles) => (
                                                <MenuItem key={roles} value={roles}>
                                                    {roles}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <Button id="register_button" type="submit" size="large" variant="contained" color="primary" fullWidth>Update User</Button>
                                    </Stack>
                                </FormGroup>
                            </form>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;