import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";


import {
    updateDisease,
    getDiseaseDetails,
    clearErrors,
} from "../../actions/diseaseAction";

import { UPDATE_DISEASE_RESET } from "../../constants/diseaseConstants";

const UpdateDisease = () => {

    const [name, setName] = useState("");
    const [part, setPart] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();

    const { error, disease } = useSelector((state) => state.diseaseDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.disease);

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
        if (disease && disease._id !== id) {
            dispatch(getDiseaseDetails(id));
        } else {
            setName(disease.name);

            setPart(disease.part);

            setDescription(disease.description);

            setOldImages(disease.images);
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
            navigate("/diseases");

            successMsg("Diseases updated successfully");

            dispatch({ type: UPDATE_DISEASE_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, updateError, disease, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);

        formData.set("part", part);

        formData.set("description", description);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updateDisease(disease._id, formData));
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
                    <MetaData title={"Update Disease"} />
                    <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>Update Disease</Typography>
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
                                            id="description_field"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            fullWidth required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />

                                        <TextField label='Part' variant='standard' id='part_field'
                                            type='number' value={part}
                                            onChange={(e) => setPart(e.target.value)} fullWidth required />

                                        {/* <div className="custom-file">
                                    <label>Images</label> */}

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
                                        <Button id="register_button" type="submit" size="large" variant="contained" color="primary" fullWidth>Update Product</Button>
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

export default UpdateDisease;