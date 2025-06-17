import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // 🔥 Altere se for usar no Docker depois
});

export default api;
