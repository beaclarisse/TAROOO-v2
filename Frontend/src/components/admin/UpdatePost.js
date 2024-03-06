import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, Button, FormGroup, Grid, Select, MenuItem, Paper, Stack, TextField, Typography, InputLabel } from "@mui/material";


import {
    updatePost,
    getPostDetails,
    clearErrors,
} from "../../actions/taroAction";

import { UPDATE_POST_RESET } from "../../constants/taroConstants";

const UpdatePost = () => {

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
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

    const { error, post } = useSelector((state) => state.postDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.post);

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
        if (post && post._id !== id) {
            dispatch(getPostDetails(id));
        } else {
            setTitle(post.title);
            setSubtitle(post.subtitle);
            setDescription(post.description);
            setCategory(post.category);
            setOldImages(post.images);
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
            navigate("/admin/taroposts");

            successMsg("Post updated successfully");

            dispatch({ type: UPDATE_POST_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, updateError, post, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("title", title);

        formData.set("subtitle", subtitle);

        formData.set("description", description);

        formData.set("category", category);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updatePost(post._id, formData));
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
                                    <Stack spacing={2} alignItems='center'>

                                        <TextField label="Type" fullWidth disabled variant="standard"></TextField>
                                        <Select
                                            labelId="types"
                                            label="Types"
                                            id="types_field"
                                            value={types}
                                            onChange={(e) => setTypes(e.target.value)}
                                            fullWidth required
                                        >
                                            {type.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                                        {/* <InputLabel sx={{ textAlign: 'left', marginRight: '10px' }}>Categories</InputLabel> */}

                                        <TextField label='Price' variant='standard' id='price_field'
                                            type='number' value={price}
                                            onChange={(e) => setPrice(e.target.value)} fullWidth required />

                                        <TextField label='Stock' variant='standard' id='stock_field'
                                            type='number' value={stock}
                                            onChange={(e) => setStock(e.target.value)} fullWidth required />

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