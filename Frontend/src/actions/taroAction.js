import axios from "axios";

import {
  ALL_TAROS_REQUEST,
  ALL_TAROS_SUCCESS,
  ALL_TAROS_FAIL,
  ADMIN_TAROS_REQUEST,
  ADMIN_TAROS_SUCCESS,
  ADMIN_TAROS_FAIL,
  TARO_DETAILS_REQUEST,
  TARO_DETAILS_SUCCESS,
  TARO_DETAILS_FAIL,
  NEW_TARO_REQUEST,
  NEW_TARO_SUCCESS,
  NEW_TARO_FAIL,
  UPDATE_TARO_REQUEST,
  UPDATE_TARO_SUCCESS,
  UPDATE_TARO_FAIL,
  DELETE_TARO_REQUEST,
  DELETE_TARO_SUCCESS,
  DELETE_TARO_FAIL,
  CLEAR_ERRORS,
} from "../constants/taroConstants";

export const getTaro =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_TAROS_REQUEST,
      });
      let link = `/api/v1/admin/taros`;

      const { data } = await axios.get(link);

      if (response.data) {
        dispatch({
          type: ALL_TAROS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: ALL_TAROS_FAIL,
          payload: "No data received",
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_TAROS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allTaros = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TAROS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/taros`);
    console.log(data);

    dispatch({
      type: ADMIN_TAROS_SUCCESS,
      payload: data.taros,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TAROS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newTaro = (taroData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TARO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/v1/taro/new`, taroData, config);

    dispatch({
      type: NEW_TARO_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TARO_FAIL,

      payload: error.response.data.message,
    });
  }
};

export const getTaroDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TARO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/taro/${id}`);

    dispatch({
      type: TARO_DETAILS_SUCCESS,
      payload: data.taros,
    });
  } catch (error) {
    dispatch({
      type: TARO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateTaro = (id, taroData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TARO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/update/taro/${id}`,
      taroData,
      config
    );

    dispatch({
      type: UPDATE_TARO_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TARO_FAIL,

      payload: error.response.data.message,
    });
  }
};

export const deleteTaro = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TARO_REQUEST });

    const { data } = await axios.delete(`/api/v1/remove/taro/${id}`);

    dispatch({
      type: DELETE_TARO_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TARO_FAIL,

      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
