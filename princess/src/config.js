// const BASE_URL = "http://15.165.5.232:8080"; // 기본 API URL
const BASE_URL = "https://princess-api.duckdns.org";

const config = {
  API_URL: BASE_URL,

  LOGIN: {
    JOIN: `${BASE_URL}/join`,
    LOGIN: `${BASE_URL}/login`,
    WITHDRAW: `${BASE_URL}/api/users/withdraw`,
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
    DETAIL_GET: (discussionID) => `${BASE_URL}/api/discussions/${discussionID}`,
  },

  READINGLOG: {
    DELETE: (readingLogId)=> `${BASE_URL}/api/reading-logs/${readingLogId}`,
    DETAIL_GET: (readingLogId) => `${BASE_URL}/api/reading-logs/${readingLogId}`,
    GET: `${BASE_URL}/api/reading-logs/my`,
    POST: `${BASE_URL}/api/reading-logs`,
    PUT:(readingLogId) => `${BASE_URL}/api/reading-logs/${readingLogId}`,
    COVER: `${BASE_URL}/api/images/book-cover`,
  },
  
  QUOTES:{
    GET: `${BASE_URL}/api/quotes`,
  },

  LIBRARIES:{
    NEARBY:{
      GET: (location) => `${BASE_URL}/api/libraries/nearby?location=${encodeURIComponent(location)}`,
    }
  },

  BOOKSTORES:{
    NEARBY:{
      GET: (location) => `${BASE_URL}/api/bookstores/nearby?location=${encodeURIComponent(location)}`,
    }
  },

};
export default config;
