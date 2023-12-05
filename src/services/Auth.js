// Api.js
import axios from 'axios';

export default () => {
  const instance = axios.create({
    baseURL: 'http://192.168.0.108:8084/api', // Make sure your server is running on this URL
  });

  return instance
}