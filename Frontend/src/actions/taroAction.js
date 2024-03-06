import axios from "axios";

import {
    ALL_POSTS_REQUEST,
    ALL_POSTS_SUCCESS,
    ALL_POSTS_FAIL,
    ADMIN_POSTS_REQUEST,
    ADMIN_POSTS_SUCCESS,
    ADMIN_POSTS_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    NEW_POST_REQUEST,
    NEW_POST_SUCCESS,
    NEW_POST_FAIL,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_RESET,
    DELETE_POST_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    HOME_POSTS_FAIL,
    HOME_POSTS_SUCCESS,
    HOME_POSTS_REQUEST

} from "../constants/taroConstants";

export const getPosts =
    (keyword = "", currentPage = 1, price) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: ALL_POSTS_REQUEST,
                });
                let link = `/api/v1/taro`;

                const { data } = await axios.get(link);
       
                dispatch({
                    type: ALL_POSTS_SUCCESS,
                    payload: data
                });
            } catch (error) {
                dispatch({
                    type: ALL_POSTS_FAIL,
                    payload: error.response.data.message,
                });
            }
        };

export const getAdminPosts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_POSTS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/taroposts`);

        dispatch({
            type: ADMIN_POSTS_SUCCESS,
            payload: data.taroPosts
        });
    } catch (error) {
        dispatch({
            type: ADMIN_POSTS_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const getPost = () => async (dispatch) => {
    try {
        dispatch({ type: HOME_POSTS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/taroposts`);

        dispatch({
            type: HOME_POSTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: HOME_POSTS_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const newPost = (postData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_POST_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/v1/post/new`,
            postData,
            config
        );

        dispatch({
            type: NEW_POST_SUCCESS,

            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_POST_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const getPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/taro/${id}`);

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data.post,
        });
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updatePost = (id, postData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_POST_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/v1/update/taro/${id}`,
            postData,
            config
        );

        dispatch({
            type: UPDATE_POST_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_POST_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_POST_REQUEST });

        const { data } = await axios.delete(`/api/v1/remove/taro/${id}`);

        dispatch({
            type: DELETE_POST_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/create/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const getPostReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST });

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({
            type: GET_REVIEWS_SUCCESS,

            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const deleteReview = (id, postId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `/api/v1/reviews?id=${id}&postId=${postId}`
        );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,

            payload: error.response.data.message,
        });
    }
};