import { combineReducers } from "redux";
import launches from "../reducers/launches";

const appReducers = combineReducers({
  launches,
});

const rootReducer = (state, action) => appReducers(state, action);

export default rootReducer;
