const initialState = {
  userType: null,
};

export const setUserType = (userType) => {
  console.log(userType)
  return {
    type: "SET_USER_TYPE",
    userType,
  };
};

export const userReducer = (state = initialState.userType, action) => {
  switch (action.type) {
    case "SET_USER_TYPE":
      return action.userType;
    default:
      return state;
  }
};
