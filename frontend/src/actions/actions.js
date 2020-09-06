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
