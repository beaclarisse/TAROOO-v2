import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";


import {
    updatePreventive,
    getPreventiveDetails,
    clearErrors,
} from "../../actions/preventiveAction";

import { UPDATE_PREVENTIVE_RESET } from "../../constants/preventiveConstants";

const UpdatePreventive = () => {

    
    const [disease, setDisease] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();

    const { error, preventive } = useSelector((state) => state.preventiveDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.preventive);

    let { id } = useParams();

    let navigate = useNavigate();

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (preventive && preventive._id !== id) {
            dispatch(getPreventiveDetails(id));
        } else {
            setDisease(preventive.disease);

            setReference(preventive.reference);

            setDescription(preventive.description);

            setOldImages(preventive.images);
        }

        if (error) {
            errMsg(error);

            dispatch(clearErrors());
        }

        if (updateError) {
            errMsg(updateError);

            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate("/admin/preventives");

            successMsg("Preventives updated successfully");

            dispatch({ type: UPDATE_PREVENTIVE_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, updateError, preventive, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("disease", disease);

        formData.set("reference", reference);

        formData.set("description", description);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updatePreventive(preventive._id, formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);

        setImages([]);

        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);

                    setImages((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 40,
        height: '90vh',
        width: 1000,
        margin: "100px auto",
        backgroundColor: "#f5f5f5"
    }

    const gridStyle = {
        paddingRight: 50,
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <MetaData title={"Update Preventives"} />
                    <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>Update Preventives</Typography>
                            <form
                                onSubmit={submitHandler}
                                encType="multipart/form-data"
                            >
                                <FormGroup>
                                    <Stack spacing={2} alignItems='center'>

                                        <TextField label='Disease' variant='standard' id='disease_field'
                                            type='disease' value={disease}
                                            onChange={(e) => setDisease(e.target.value)} fullWidth required />
                                        <TextField
                                            id="description_field"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            fullWidth required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <TextField
                                            id="Reference"
                                            variant='standard'
                                            label="reference_field"
                                            multiline
                                            rows={3}
                                            fullWidth required
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}
                                        />

                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                name="images"
                                                className="custom-file-input"
                                                id="customFile"
                                                onChange={onChange}
                                                multiple
                                                fullWidth
                                            />

                                            <label className="custom-file-label" htmlFor="customFile">
                                                Choose Images
                                            </label>
                                        </div>

                                        {oldImages &&
                                            oldImages.map((img) => (
                                                <img
                                                    key={img}
                                                    src={img.url}
                                                    alt={img.url}
                                                    className="mt-3 mr-2"
                                                    width="55"
                                                    height="52"
                                                />
                                            ))}

                                        {imagesPreview.map((img) => (
                                            <img
                                                src={img}
                                                key={img}
                                                alt="Images Preview"
                                                className="mt-3 mr-2"
                                                width="55"
                                                height="52"
                                            />
                                        ))}
                                        {/* </div> */}
                                        <Button id="register_button" type="submit" size="large" variant="contained" color="primary" fullWidth>Update Preventives</Button>
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

export default UpdatePreventive;