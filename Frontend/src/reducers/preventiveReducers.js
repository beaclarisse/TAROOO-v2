import {
    ALL_PREVENTIVES_REQUEST,
    ALL_PREVENTIVES_SUCCESS,
    ALL_PREVENTIVES_FAIL,
    PREVENTIVE_DETAILS_REQUEST,
    PREVENTIVE_DETAILS_SUCCESS,
    PREVENTIVE_DETAILS_FAIL,
    CLEAR_ERRORS,
    ADMIN_PREVENTIVES_REQUEST,
    ADMIN_PREVENTIVES_SUCCESS,
    ADMIN_PREVENTIVES_FAIL,
    NEW_PREVENTIVE_REQUEST,
    NEW_PREVENTIVE_SUCCESS,
    NEW_PREVENTIVE_RESET,
    NEW_PREVENTIVE_FAIL,
    DELETE_PREVENTIVE_REQUEST,
    DELETE_PREVENTIVE_SUCCESS,
    DELETE_PREVENTIVE_RESET,
    DELETE_PREVENTIVE_FAIL,
    UPDATE_PREVENTIVE_REQUEST,
    UPDATE_PREVENTIVE_SUCCESS,
    UPDATE_PREVENTIVE_RESET,
    UPDATE_PREVENTIVE_FAIL,
} from "../constants/preventiveConstants";

export const preventivesReducer = (state = { preventive: [] }, action) => {
    switch (action.type) {
        case ALL_PREVENTIVES_REQUEST:
        case ADMIN_PREVENTIVES_REQUEST:
            return {
                loading: true,
                preventives: [],
            };

        case ALL_PREVENTIVES_SUCCESS:
            console.log(action.payload.preventive)
            return {
                loading: false,
                preventives: action.payload.preventive,
                preventivesCount: action.payload.preventivesCount,
                resPerPage: action.payload.resPerPage,
                filteredPreventivesCount: action.payload.filteredPreventivesCount,
            };

        case ADMIN_PREVENTIVES_SUCCESS:
            return {
                loading: false,
                preventives: action.payload,
            };

        case ALL_PREVENTIVES_FAIL:
        case ADMIN_PREVENTIVES_FAIL:
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

export const newPreventiveReducer = (state = { preventive: {} }, action) => {
    switch (action.type) {
        case NEW_PREVENTIVE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_PREVENTIVE_SUCCESS:
            return {
                loading: false,
                success: true,
                preventive: action.payload.preventive,
            };

        case NEW_PREVENTIVE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_PREVENTIVE_RESET:
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

export const preventiveReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PREVENTIVE_REQUEST:
        case UPDATE_PREVENTIVE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_PREVENTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_PREVENTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_PREVENTIVE_FAIL:
        case UPDATE_PREVENTIVE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_PREVENTIVE_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_PREVENTIVE_RESET:
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

export const preventiveDetailsReducer = (state = { preventive: {} }, action) => {
    switch (action.type) {
        case PREVENTIVE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case PREVENTIVE_DETAILS_SUCCESS:
            return {
                loading: false,
                preventive: action.payload,
            };

        case PREVENTIVE_DETAILS_FAIL:
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
