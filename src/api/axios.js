import axios from 'axios';

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Asegúrate de que Laravel corre en este puerto
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor: Inyecta el token automáticamente si existe
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default client;