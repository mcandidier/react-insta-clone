import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL 
});

API.interceptors.request.use(config => {
  const refresh_token = localStorage.getItem('refresh-token');
  const token = refresh_token ? refresh_token : localStorage.getItem('access-token');
  if(token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;