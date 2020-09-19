import { combineReducers } from "redux";
import { searchReducer, queryReducer } from "./searchReducer";
import {
  familyRecipesReducer,
  publicRecipesReducer,
  userRecipesReducer,
} from "./recipeReducer";
import { userReducer } from "./userReducer";

const allReducers = combineReducers({
  search: searchReducer,
  search_query: queryReducer,
  user_recipes: userRecipesReducer,
  family_recipes: familyRecipesReducer,
  public_recipes: publicRecipesReducer,
  user_id: userReducer,
});

export default allReducers;
