import axios from "axios";

import {
  ALL_PREVENTIVES_REQUEST,
  ALL_PREVENTIVES_SUCCESS,
  ALL_PREVENTIVES_FAIL,
  ADMIN_PREVENTIVES_REQUEST,
  ADMIN_PREVENTIVES_SUCCESS,
  ADMIN_PREVENTIVES_FAIL,
  PREVENTIVE_DETAILS_REQUEST,
  PREVENTIVE_DETAILS_SUCCESS,
  PREVENTIVE_DETAILS_FAIL,
  NEW_PREVENTIVE_REQUEST,
  NEW_PREVENTIVE_SUCCESS,
  NEW_PREVENTIVE_FAIL,
  UPDATE_PREVENTIVE_REQUEST,
  UPDATE_PREVENTIVE_SUCCESS,
  UPDATE_PREVENTIVE_FAIL,
  DELETE_PREVENTIVE_REQUEST,
  DELETE_PREVENTIVE_SUCCESS,
  DELETE_PREVENTIVE_FAIL,
  CLEAR_ERRORS,
} from "../constants/preventiveConstants";

export const getPreventives =
  (keyword = "", currentPage = 1, category = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PREVENTIVES_REQUEST,
      });
      let link = `/api/v1/admin/preventives`;

      const { data } = await axios.get(link);

      if (response.data) {
        dispatch({
          type: ALL_PREVENTIVES_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: ALL_PREVENTIVES_FAIL,
          payload: "No data received",
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_PREVENTIVES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allPreventives = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PREVENTIVES_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/preventives`);
    console.log(data); 

    dispatch({
      type: ADMIN_PREVENTIVES_SUCCESS,
      payload: data.preventive,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PREVENTIVES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newPreventive = (preventivesData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PREVENTIVE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/preventive/new`,
      preventivesData,
      config
    );

    dispatch({
      type: NEW_PREVENTIVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PREVENTIVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPreventiveDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PREVENTIVE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/preventive/${id}`);

    dispatch({
      type: PREVENTIVE_DETAILS_SUCCESS,
      payload: data.preventive,
    });
  } catch (error) {
    dispatch({
      type: PREVENTIVE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePreventive = (id, preventivesData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PREVENTIVE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/update/preventive/${id}`,
      preventivesData,
      config
    );

    dispatch({
      type: UPDATE_PREVENTIVE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PREVENTIVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePreventive = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PREVENTIVE_REQUEST });

    const { data } = await axios.delete(`/api/v1/remove/preventive/${id}`);

    dispatch({
      type: DELETE_PREVENTIVE_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PREVENTIVE_FAIL,

      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
