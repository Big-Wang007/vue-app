import axios from "axios";

const service = axios.create({
  baseURL: `/admin/v1`,
  withCredentials: true,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status === 200) {
      return data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
