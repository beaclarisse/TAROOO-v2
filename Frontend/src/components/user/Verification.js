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
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import axios from "axios";

const Verification = () => {

    const navigate = useNavigate()

    const submitCode = async (code) => {

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}api/v1/verify`, { code: code }, { withCredentials: true });
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                navigate('/')
            } else {
                toast.success(data.message)
            }


        } catch ({ response: { data } }) {
            console.log(data)
            toast.error(data.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const code = e.target.code.value
        submitCode(code)
    }

    return (
        <div className="d-flex justify-content-center mt-5" style={{ backgroundColor: '#1b1b1b' }}>

            <Paper className="d-flex flex-column gap-4 p-4 pb-2" sx={{ width: '90%', maxWidth: 600, p: 1, mt: 20 }}>
                <Typography fontSize={20} className="fw-bold my-2" sx={{ fontWeight: 'bold' }}>Verify Email</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField type="number" name='code' fullWidth label='Enter the code' />
                    <Button type="submit" fullWidth className="my-4" variant="contained">Submit Code</Button>
                </form>
            </Paper>

        </div >
    );
};

export default Verification;
