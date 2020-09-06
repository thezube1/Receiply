import { combineReducers } from "redux";
import searchReducer from "./searchReducer";

const allReducers = combineReducers({
  search: searchReducer,
});

export default allReducers;
