import { combineReducers } from "redux";
import { searchReducer, queryReducer } from "./searchReducer";
import {
  familyRecipesReducer,
  publicRecipesReducer,
  userRecipesReducer,
} from "./recipeReducer";
import { EditReducer } from "./editReducer";
import { verifyReducer } from "./verifyReducer";

const allReducers = combineReducers({
  search: searchReducer,
  search_query: queryReducer,
  user_recipes: userRecipesReducer,
  family_recipes: familyRecipesReducer,
  public_recipes: publicRecipesReducer,
  edit_reducer: EditReducer,
  verify_reducer: verifyReducer,
});

export default allReducers;
