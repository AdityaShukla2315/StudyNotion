import { apiConnector } from "../apiconnector";

export const getCourseDoubts = async (courseId) => {
  return apiConnector("GET", `/courses/${courseId}/doubts`);
};
export const addCourseDoubt = async (token, courseId, question) => {
  return apiConnector("POST", `/courses/${courseId}/doubts`, { question }, { Authorization: `Bearer ${token}` });
};
export const answerDoubt = async (token, courseId, doubtId, answer) => {
  return apiConnector("PATCH", `/courses/${courseId}/doubts/${doubtId}/answer`, { answer }, { Authorization: `Bearer ${token}` });
}; 