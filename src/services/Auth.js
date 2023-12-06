// Api.js
import axios from 'axios';

export default () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8084/api', // Make sure your server is running on this URL
  });

  return instance
}