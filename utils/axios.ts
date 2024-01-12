import axios from "axios";
export const Axios = axios.create({
    baseURL: 'http://localhost:3002/api/v1/',
    timeout: 1000,
    withCredentials:true
  });
