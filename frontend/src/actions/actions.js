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

export const user_id = (input) => {
  return {
    type: "USER_ID",
    payload: input,
  };
};
