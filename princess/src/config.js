const BASE_URL = "http://15.165.5.232:8080"; // 기본 API URL

const config = {
  API_URL: BASE_URL,

  LOGIN: {
    JOIN: `${BASE_URL}/join`,
    LOGIN: `${BASE_URL}/login`,
  },

  USERS: {
    WITHDRAW: `${BASE_URL}/api/users/withdraw`,
    DELETE: (wantID) => `${BASE_URL}/api/users/want/${wantID}`,
    PROFILES: `${BASE_URL}/api/users/profiles`,
    GET: `${BASE_URL}/api/users/me`,
    IMAGE: `${BASE_URL}/api/users/profile`,
    WANT: `${BASE_URL}/api/users/want`,
  },

  BOOKS: {
    DELETE: (bookID) => `${BASE_URL}/api/books/${bookID}`,
    DETAIL: (bookID) => `${BASE_URL}/api/books/${bookID}`,
    BOOKS: `${BASE_URL}/api/books`,
    POST: `${BASE_URL}/api/books`,
    PUT: (bookID) => `${BASE_URL}/api/books/${bookID}`,
  },

  DISCUSSIONS: {
    GET: `${BASE_URL}/api/discussions`,
  },
};
export default config;
