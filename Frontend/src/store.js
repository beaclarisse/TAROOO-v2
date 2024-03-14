import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
} from "./reducers/userReducers";

import {
    tarosReducer,
    taroDetailsReducer,
    newTaroReducer,
    taroReducer,
} from "./reducers/taroReducers";

import {
    diseasesReducer,
    diseaseReducer,
    diseaseDetailsReducer,
    newDiseaseReducer,
    
} from "./reducers/diseaseReducers";

import {
    preventivesReducer,
    preventiveReducer,
    preventiveDetailsReducer,
    newPreventiveReducer,
    
} from "./reducers/preventiveReducers";

const reducer = combineReducers({
    auth: authReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,

    taros: tarosReducer,
    taroDetails: taroDetailsReducer,
    newTaro: newTaroReducer,
    taro: taroReducer,

    diseases: diseasesReducer,
    diseaseDetails: diseaseDetailsReducer,
    disease: diseaseReducer,
    newDisease: newDiseaseReducer, 

    preventives: preventivesReducer,
    preventiveDetails: preventiveDetailsReducer,
    preventive: preventiveReducer,
    newPreventive: newPreventiveReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;