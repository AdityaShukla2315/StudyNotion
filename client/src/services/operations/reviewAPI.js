import { apiConnector } from "../apiconnector";

export const getCourseReviews = async (courseId) => {
  return apiConnector("GET", `/courses/${courseId}/reviews`);
};

export const addCourseReview = async (token, courseId, rating, comment) => {
  return apiConnector("POST", `/courses/${courseId}/reviews`, { rating, comment }, { Authorization: `Bearer ${token}` });
}; 