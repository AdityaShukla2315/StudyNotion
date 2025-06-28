import { apiConnector } from "../apiconnector";

export const getWishlist = async (token) => {
  return apiConnector("GET", "/wishlist", null, { Authorization: `Bearer ${token}` });
};
export const addToWishlist = async (token, courseId) => {
  return apiConnector("POST", "/wishlist", { courseId }, { Authorization: `Bearer ${token}` });
};
export const removeFromWishlist = async (token, courseId) => {
  return apiConnector("DELETE", `/wishlist/${courseId}`, null, { Authorization: `Bearer ${token}` });
}; 