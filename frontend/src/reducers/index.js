import { combineReducers } from "redux";
import { searchReducer, queryReducer } from "./searchReducer";
import {
  familyRecipesReducer,
  publicRecipesReducer,
  userRecipesReducer,
} from "./recipeReducer";
import { EditReducer } from "./editReducer";

const allReducers = combineReducers({
  search: searchReducer,
  search_query: queryReducer,
  user_recipes: userRecipesReducer,
  family_recipes: familyRecipesReducer,
  public_recipes: publicRecipesReducer,
  edit_reducer: EditReducer,
});

export default allReducers;
