import { Cookies } from "react-cookie";
import axios from "axios";
import config from "./config";

// 토큰 키 상수화
const ACCESS_TOKEN_KEY = "accessToken";

// 쿠키 인스턴스
const cookies = new Cookies();

// axios 인스턴스 생성
const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 - 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    const token = cookies.get(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 401 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("로그인 만료됨. 다시 로그인해주세요.");
      cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
    }
    return Promise.reject(error);
  }
);

// GET 요청
export const get = async (endpoint, params = {}, options = {}) => {
  try {
    const response = await api.get(endpoint, {
      params,
      ...options,
    });
    validateContentType(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST 요청
export const post = async (endpoint, data, options = {}) => {
  try {
    const response = await api.post(endpoint, data, options);
    validateContentType(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT 요청
export const put = async (endpoint, data = {}, options = {}) => {
  try {
    const response = await api.put(endpoint, data, options);
    validateContentType(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE 요청
export const del = async (endpoint, options = {}) => {
  try {
    const response = await api.delete(endpoint, options);
    validateContentType(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 응답 타입 검사 함수
const validateContentType = (response) => {
  const contentType = response.headers["content-type"] || "";
  if (!contentType.includes("application/json")) {
    throw new Error("서버 응답이 올바르지 않습니다.");
  }
};

export default api;
