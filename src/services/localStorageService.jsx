export const setTokenInStorage = (token) => {
  localStorage.setItem("userToken", token);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem("userToken");
};

export const clearTokenFromStorage = () => {
  localStorage.removeItem("userToken");
};