const baseUrl = "https://api.codementor.io/api/v2";
// const baseUrl = "https://dev.codementor.io/api";

export const ENDPOINTS = {
  requests: `${baseUrl}/requests/search`, // search_type=related|other
  requestDetail: `${baseUrl}/requests`,
  mySchedule: `${baseUrl}/schedule/scheduled-sessions`,
};
