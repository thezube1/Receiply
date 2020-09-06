import { combineReducers } from "redux";
import { searchReducer, queryReducer } from "./searchReducer";

const allReducers = combineReducers({
  search: searchReducer,
  search_query: queryReducer,
});

export default allReducers;
