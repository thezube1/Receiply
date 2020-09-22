export const search = (input) => {
  return {
    type: "SEARCH",
    payload: input,
  };
};

export const search_query = (input) => {
  return {
    type: "SEARCH_QUERY",
    payload: input,
  };
};

export const family_recipes = (input) => {
  return {
    type: "FAMILY_RECIPES",
    payload: input,
  };
};

export const public_recipes = (input) => {
  return {
    type: "PUBLIC_RECIPES",
    payload: input,
  };
};

export const user_recipes = (input) => {
  return {
    type: "USER_RECIPES",
    payload: input,
  };
};

export const update_recipe = (input) => {
  return {
    type: "UPDATE_RECIPE",
    payload: input,
  };
};

export const TTM = (input) => {
  return {
    type: "TTM",
    payload: input,
  };
};

export const recipe_name = (input) => {
  return {
    type: "RECIPE_NAME",
    payload: input,
  };
};

export const recipe_description = (input) => {
  return {
    type: "RECIPE_DESCRIPTION",
    payload: input,
  };
};

export const recipe_ingredient = (input) => {
  return {
    type: "RECIPE_INGREDIENT",
    payload: input,
  };
};

export const add_recipe_ingredient = (input) => {
  return {
    type: "ADD_RECIPE_INGREDIENT",
    payload: input,
  };
};

export const prep_instruction = (input) => {
  return {
    type: "PREP_INSTRUCTION",
    payload: input,
  };
};

export const add_prep_instruction = (input) => {
  return {
    type: "ADD_PREP_INSTRUCTION",
  };
};

export const remove_prep_instruction = (input) => {
  return {
    type: "REMOVE_PREP_INSTRUCTION",
    payload: input,
  };
};

export const cooking_instruction = (input) => {
  return {
    type: "COOKING_INSTRUCTION",
    payload: input,
  };
};

export const add_cooking_instruction = (input) => {
  return {
    type: "ADD_COOKING_INSTRUCTION",
  };
};

export const remove_cooking_instruction = (input) => {
  return {
    type: "REMOVE_COOKING_INSTRUCTION",
    payload: input,
  };
};

export const tags = (input) => {
  return {
    type: "TAGS",
    payload: input,
  };
};

export const add_tag = (input) => {
  return {
    type: "ADD_TAG",
  };
};

export const remove_tag = (input) => {
  return {
    type: "REMOVE_COOKING_INSTRUCTION",
    payload: input,
  };
};

export const share = (input) => {
  return {
    type: "SHARE",
    payload: input,
  };
};
