import { createStore, combineReducers } from "redux";
import auth from "./auth/reducer";
export default createStore(
    combineReducers({
        auth
    })
);
