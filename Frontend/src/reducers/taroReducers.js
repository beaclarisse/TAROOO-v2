import {
  ALL_TAROS_REQUEST,
  ALL_TAROS_SUCCESS,
  ALL_TAROS_FAIL,
  TARO_DETAILS_REQUEST,
  TARO_DETAILS_SUCCESS,
  TARO_DETAILS_FAIL,
  CLEAR_ERRORS,
  ADMIN_TAROS_REQUEST,
  ADMIN_TAROS_SUCCESS,
  ADMIN_TAROS_FAIL,
  NEW_TARO_REQUEST,
  NEW_TARO_SUCCESS,
  NEW_TARO_RESET,
  NEW_TARO_FAIL,
  DELETE_TARO_REQUEST,
  DELETE_TARO_SUCCESS,
  DELETE_TARO_RESET,
  DELETE_TARO_FAIL,
  UPDATE_TARO_REQUEST,
  UPDATE_TARO_SUCCESS,
  UPDATE_TARO_RESET,
  UPDATE_TARO_FAIL,
} from "../constants/taroConstants";

export const tarosReducer = ( state = { taro: [] }, action) => {
  switch (action.type) {
    case ALL_TAROS_REQUEST:
    case ADMIN_TAROS_REQUEST:
      return {
        loading: true,
        taros: [],
      };
    
    case ALL_TAROS_SUCCESS:
      return {
        loading: false,
        taros: action.payload.taros,
        postsCount: action.payload.postsCount,
        resPerPage: action.payload.resPerPage,
        filteredPostsCount: action.payload.filteredPostsCount,
      };

    case ADMIN_TAROS_SUCCESS:
      return {
        loading: false,
        taros: action.payload,
      };

    case ALL_TAROS_FAIL:
    case ADMIN_TAROS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newTaroReducer = (state = { taro: {} }, action) => {
  switch (action.type) {
    case NEW_TARO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_TARO_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        taro: action.payload.taro,
      };

    case NEW_TARO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_TARO_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const taroReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TARO_REQUEST:
    case UPDATE_TARO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_TARO_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_TARO_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_TARO_FAIL:
    case UPDATE_TARO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_TARO_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_TARO_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const taroDetailsReducer = (state = { taro: {} }, action) => {
  switch (action.type) {
    case TARO_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TARO_DETAILS_SUCCESS:
      return {
        loading: false,
        taro: action.payload,
      };

    case TARO_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};