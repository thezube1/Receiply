export const userReducer = (state = "", action) => {
  switch (action.type) {
    case "USER_ID":
      return action.payload;
    default:
      return state;
  }
};
