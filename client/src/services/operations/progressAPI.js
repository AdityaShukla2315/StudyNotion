import { apiConnector } from "../apiconnector";

export const getProgress = async (token, courseId) => {
  return apiConnector("GET", `/progress/${courseId}`, null, { Authorization: `Bearer ${token}` });
};

export const updateProgress = async (token, courseId, completedSections, completed) => {
  return apiConnector("POST", `/progress/${courseId}`, { completedSections, completed }, { Authorization: `Bearer ${token}` });
}; 