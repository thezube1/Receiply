import { combineReducers } from "redux";
import { searchReducer, queryReducer } from "./searchReducer";
import { familyRecipesReducer, publicRecipesReducer } from "./recipeReducer";

const allReducers = combineReducers({
  search: searchReducer,
  search_query: queryReducer,
  family_recipes: familyRecipesReducer,
  public_recipes: publicRecipesReducer,
});

export default allReducers;
