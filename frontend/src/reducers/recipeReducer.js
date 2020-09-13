export const familyRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case "FAMILY_RECIPES":
      return action.payload;
    default:
      return state;
  }
};

export const publicRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case "PUBLIC_RECIPES":
      return action.payload;
    default:
      return state;
  }
};
