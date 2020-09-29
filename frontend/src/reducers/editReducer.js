export const EditReducer = (
  state = {
    ttm: "",
    recipe_description: "",
    recipe_name: "",
    recipe_ingredients: [""],
    prep_instructions: [""],
    cooking_instructions: [""],
    tags: [""],
    share: 0,
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_RECIPE":
      const recipe = action.payload;
      const checkShare = () => {
        if (recipe.share === "private") {
          return 1;
        } else if (recipe.share === "family") {
          return 2;
        } else {
          return 3;
        }
      };
      let ingredients = [];
      let prep = [];
      let cooking = [];
      let state_tags = [];
      recipe.ingredients.map((item) => ingredients.push(item.INGREDIENT));
      recipe.prep.map((item) => prep.push(item.PREP));
      recipe.cooking_instructions.map((item) =>
        cooking.push(item.COOKING_INSTRUCTION)
      );
      recipe.tags.map((item) => state_tags.push(item.TAG));
      const editRecipe = {
        ttm: recipe.recipe.TTM,
        recipe_description: recipe.recipe.DESCRIPTION,
        recipe_name: recipe.recipe.RECIPE_NAME,
        recipe_ingredients: ingredients,
        prep_instructions: prep,
        cooking_instructions: cooking,
        tags: state_tags,
        share: checkShare(),
      };
      return editRecipe;
    case "TTM":
      const ttm = { ...state };
      ttm.ttm = action.payload;
      return ttm;
    case "RECIPE_NAME":
      const recipeName = { ...state };
      recipeName.recipe_name = action.payload;
      return recipeName;
    case "RECIPE_DESCRIPTION":
      const recipeDescription = { ...state };
      recipeDescription.recipe_description = action.payload;
      return recipeDescription;
    case "RECIPE_INGREDIENT":
      const recipeIngredients = { ...state };
      recipeIngredients.recipe_ingredients[action.payload[0]] =
        action.payload[1];
      return recipeIngredients;
    case "ADD_RECIPE_INGREDIENT":
      const addRecipeIngredients = { ...state };
      addRecipeIngredients.recipe_ingredients.push("");
      return addRecipeIngredients;
    case "REMOVE_RECIPE_INGREDIENT":
      const removeRecipeIngredients = { ...state };
      removeRecipeIngredients.recipe_ingredients.splice(action.payload, 1);
      return removeRecipeIngredients;
    case "PREP_INSTRUCTION":
      const prepInstruction = { ...state };
      prepInstruction.prep_instructions[action.payload[0]] = action.payload[1];
      return prepInstruction;
    case "ADD_PREP_INSTRUCTION":
      const addPrepInstruction = { ...state };
      addPrepInstruction.prep_instructions.push("");
      return addPrepInstruction;
    case "REMOVE_PREP_INSTRUCTION":
      const removePrepInstruction = { ...state };
      removePrepInstruction.prep_instructions.splice(action.payload, 1);
      return removePrepInstruction;
    case "COOKING_INSTRUCTION":
      const cookingInstructions = { ...state };
      cookingInstructions.cooking_instructions[action.payload[0]] =
        action.payload[1];
      return cookingInstructions;
    case "ADD_COOKING_INSTRUCTION":
      const addCookingInstructions = { ...state };
      addCookingInstructions.cooking_instructions.push("");
      return addCookingInstructions;
    case "REMOVE_COOKING_INSTRUCTION":
      const removeCookingInstructions = { ...state };
      removeCookingInstructions.cooking_instructions.splice(action.payload, 1);
      return removeCookingInstructions;
    case "TAGS":
      const tags = { ...state };
      tags.tags[action.payload[0]] = action.payload[1];
      return tags;
    case "ADD_TAG":
      const addTags = { ...state };
      addTags.tags.push("");
      return addTags;
    case "REMOVE_TAG":
      const removeTags = { ...state };
      removeTags.tags.splice(action.payload, 1);
      return removeTags;
    case "SHARE":
      const share = { ...state };
      share.share = action.payload;
      return share;
    default:
      return state;
  }
};
