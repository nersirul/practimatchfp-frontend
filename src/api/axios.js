/**
 * Cliente HTTP Axios - axios.js
 * * Centraliza toda la comunicación asíncrona hacia el Backend (API Laravel).
 * Dispone de una URL base predefinida e interceptores inteligentes que inyectan 
 * de manera transparente los tokens de seguridad de Sanctum en las peticiones.
 */

import axios from 'axios';

const client = axios.create({
    baseURL: 'https://backend.ogallar.net/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

/**
 * Middleware de Petición.
 * Evalúa si hay un portador (token) en el Storage local antes de enviar la
 * petición a la red, incrustándolo bajo la cabecera `Authorization`.
 */
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default client;