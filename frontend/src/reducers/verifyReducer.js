export const verifyReducer = (state = true, action) => {
  switch (action.type) {
    case "VERIFIED":
      return true;
    case "UNVERIFIED":
      return false;
    default:
      return state;
  }
};
