import axios from "axios";

import {
    ALL_DISEASES_REQUEST,
    ALL_DISEASES_SUCCESS,
    ALL_DISEASES_FAIL,
    ADMIN_DISEASES_REQUEST,
    ADMIN_DISEASES_SUCCESS,
    ADMIN_DISEASES_FAIL,
    DISEASE_DETAILS_REQUEST,
    DISEASE_DETAILS_SUCCESS,
    DISEASE_DETAILS_FAIL,
    NEW_DISEASE_REQUEST,
    NEW_DISEASE_SUCCESS,
    NEW_DISEASE_FAIL,
    UPDATE_DISEASE_REQUEST,
    UPDATE_DISEASE_SUCCESS,
    UPDATE_DISEASE_FAIL,
    DELETE_DISEASE_REQUEST,
    DELETE_DISEASE_SUCCESS,
    DELETE_DISEASE_FAIL,
    CLEAR_ERRORS,
} from "../constants/diseaseConstants";

export const getDiseases =
    (keyword = "", currentPage = 1, price, category = "") =>
        async (dispatch) => {
            try {
                dispatch({
                    type: ALL_DISEASES_REQUEST,
                });
                let link = `/api/v1/diseases`;

                const { data } = await axios.get(link);
                console.log(data);
                console.log(link);
                dispatch({
                    type: ALL_DISEASES_SUCCESS,
                    payload: data,
                });
            } catch (error) {
                dispatch({
                    type: ALL_DISEASES_FAIL,
                    payload: error.response.data.message,
                });
            }
        };

export const getAdminDiseases = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DISEASES_REQUEST });

        const { data } = await axios.get(`/api/v1/diseases`);
d
        dispatch({
            type: ADMIN_DISEASES_SUCCESS,

            payload: data.diseases,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_DISEASES_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newDisease = (diseasesData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_DISEASE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/v1/disease/new`,
            diseasesData,
            config
        );

        dispatch({
            type: NEW_DISEASE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: NEW_DISEASE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getDiseaseDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: DISEASE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/disease/${id}`);

        dispatch({
            type: DISEASE_DETAILS_SUCCESS,
            payload: data.disease,
        });
    } catch (error) {
        dispatch({
            type: DISEASE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateDisease = (id, diseasesData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DISEASE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/v1/update/disease/${id}`,
            diseasesData,
            config
        );

        dispatch({
            type: UPDATE_DISEASE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_DISEASE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteDisease = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DISEASE_REQUEST });

        const { data } = await axios.delete(`/api/v1/remove/disease/${id}`);

        dispatch({
            type: DELETE_DISEASE_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_DISEASE_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};