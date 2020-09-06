export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH":
      return action.payload;
    default:
      return state;
  }
};

export const queryReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return action.payload;
    default:
      return state;
  }
};
