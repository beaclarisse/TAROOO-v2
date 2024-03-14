import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, Button, FormGroup, Grid, Select, MenuItem, Paper, Stack, TextField, Typography, InputLabel } from "@mui/material";


import {
    updateTaro,
    getTaroDetails,
    clearErrors,
} from "../../actions/taroAction";

import { UPDATE_TARO_RESET } from "../../constants/taroConstants";

const UpdatePost = () => {

    const [title, setTitle] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const categories = [
        "About",
        "Benefit"
    ];

    const dispatch = useDispatch();

    const { error, taro } = useSelector((state) => state.taroDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.taro);

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
        if (taro && taro._id !== id) {
            dispatch(getTaroDetails(id));
        } else {
            setTitle(taro.title);
            setReference(taro.reference);
            setDescription(taro.description);
            setCategory(taro.category);
            setOldImages(taro.images);
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
            navigate("/admin/taros");

            successMsg("Post updated successfully");

            dispatch({ type: UPDATE_TARO_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, updateError, taro, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("title", title);

        formData.set("reference", reference);

        formData.set("description", description);

        formData.set("category", category);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updateTaro(taro._id, formData));
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
        height: '130vh',
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
                    <MetaData title={"Update Post"} />
                    <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>Update Posts</Typography>
                            <form
                                onSubmit={submitHandler}
                                encType="multipart/form-data"
                            >
                                <FormGroup>
                                    <Stack spacing={1} alignItems='center'>

                                        <TextField label="Category" fullWidth disabled variant="standard"></TextField>
                                        <Select
                                            labelId="category"
                                            label="category"
                                            id="category_field"
                                            value={categories}
                                            onChange={(e) => setCategory(e.target.value)}
                                            fullWidth required
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <TextField label='Title' variant='standard' id='title_field'
                                            type='title' value={title}
                                            onChange={(e) => setTitle(e.target.value)} fullWidth required />
                                        <TextField
                                            id="description_field"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            fullWidth required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        {/* <InputLabel sx={{ textAlign: 'left', marginRight: '10px' }}>Categories</InputLabel> */}

                                        <TextField label='Reference' variant='standard' id='price_field'
                                            type='string' value={reference}
                                            onChange={(e) => setReference(e.target.value)} fullWidth required />

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
                                                Upload Image
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
                                        <Button id="register_button" type="submit" size="large" variant="contained" color="primary" fullWidth>Update Post</Button>
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

export default UpdatePost;