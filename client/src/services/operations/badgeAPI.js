import { apiConnector } from "../apiconnector";

export const getBadges = async (token) => {
  return apiConnector("GET", "/badges", null, { Authorization: `Bearer ${token}` });
};

export const awardBadge = async (token, name, icon, description) => {
  return apiConnector("POST", "/badges", { name, icon, description }, { Authorization: `Bearer ${token}` });
}; 