import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-bootstrap";
import { Box, Typography, Button, Divider } from '@mui/material';

import {
    getAdminPosts,
    clearErrors,
    deletePost,
} from "../../actions/taroAction";

import { DELETE_POST_RESET } from "../../constants/taroConstants";
import { color } from "@mui/system";

const PostsList = () => {
    const dispatch = useDispatch();

    const notify = (message = "") =>
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

    let navigate = useNavigate();
    const taroPostsState = useSelector((state) => state.taroPosts || {});
    const { loading, error, taroPosts = [] } = taroPostsState;

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.post
    );

    useEffect(() => {
        dispatch(getAdminPosts());

        if (error) {
            notify(error);

            dispatch(clearErrors());
        }

        if (deleteError) {
            notify(deleteError);

            dispatch(clearErrors());
        }

        if (isDeleted) {
            notify("Post deleted successfully");

            navigate("/admin/taroposts");

            dispatch({ type: DELETE_POST_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const setPosts = () => {
        const data = {
            columns: [
                {
                    label: "Post ID",
                    field: "id",
                    sort: "asc",
                },

                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },

                {
                    label: "Subtitle",
                    field: "subtitle",
                    sort: "asc",
                },

                {
                    label: "Image",
                    field: "image",
                    sort: "asc",
                },

                {
                    label: "Actions",
                    field: "actions",
                },
            ],

            rows: [],
        };

        taroPosts.forEach((post) => {
            data.rows.push({
                id: post._id,
                name: post.title,
                subtitle: post.subtitle,
                image: (
                    <Fragment>
                        <Carousel pause="hover">
                            {post.images.map((image) => (
                                <Carousel.Item key={image.public_id}>
                                    <img
                                        className="d-block w-100"
                                        src={image.url}
                                        alt={post.title}
                                        width="10px"
                                        height="100px"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Fragment>
                ),
                actions: (
                    <Fragment>
                        <Link
                            to={`/update/taro/${post._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deletePostHandler(post._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            });
        });

        return data;
    };

    const deletePostHandler = (id) => {
        dispatch(deletePost(id));
    };

    return (
        <Box sx={{ height: 730, width: "90%", paddingTop: 5 }} backgroundColor="#f4effc">
            <Fragment>
                <MetaData title={"All Posts"} />
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                        <br /><br />
                        <h1>Posts</h1>
                        <hr
                            style={{
                                color: "#2f3c4c",
                                backgroundColor: "#2f3c4c",
                                height: 5
                            }}
                        />
                        <Button size="large" variant="contained" color="primary"
                            sx={{ marginBottom: 2 }} href="/post/new"> New Post </Button>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setPosts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                                noBottomColumns
                            />
                        )}
                    </div>
                </div>
            </Fragment>
        </Box>
    );
};

export default PostsList;