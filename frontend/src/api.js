// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Certifique-se de que a URL do backend está correta
  withCredentials: true, // Permitir o envio de cookies nas requisições
});

export default api;
