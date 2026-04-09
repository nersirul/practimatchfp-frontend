/**
 * Manejador Global de Sesión de React (Auth Context)
 * 
 * Abastece al árbol de componentes con información del usuario autenticado actualmente
 * sin necesidad de aplicar prop-drilling contínuos. Mantiene el ciclo de vida del 
 * inicio, hidratación y cierre de sesión de la plataforma.
 */

import { createContext, useState, useContext, useEffect } from "react";
import client from "../api/axios";

/**
 * Objeto de Contexto.
 * Expone un contenedor vacío de estado esperando al provisor.
 */
const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
});

/**
 * Proveedor de Autenticación.
 * 
 * Funciona como Wrapper de la app para gestionar estado duro de `user` y `token`.
 * @param {Object} props
 * @param {React.ReactNode} props.children Hijos que heredarán el estado global.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    /**
     * Sincronizador de Storage.
     * Persiste en navegador el token para resistir recargas (F5).
     * @param {string|null} newToken 
     */
    const setToken = (newToken) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    /**
     * Inicio de sesión remoto.
     * Invoca el handshake con Laravel y almacena el retorno.
     * @param {string} email 
     * @param {string} password 
     * @param {string} tipo Enum: alumno | empresa | admin | profesor
     */
    const login = async (email, password, tipo) => {
        const response = await client.post('/login', { email, password, tipo });
        setUser(response.data.user);
        setToken(response.data.token);
    };

    /**
     * Cierre en Frío.
     * Borra el token en remoto (BD de Laravel) y destruye el estado local.
     */
    const logout = async () => {
        try {
            await client.post('/logout');
        } catch (e) {
            console.error("Error logout", e);
        }
        setUser(null);
        setToken(null);
    };

    /**
     * Hidratación de Sesión (Mount Hook).
     * Si el usuario se conecta a la página y trae la memoria cargada (token local), 
     * se hace ping a la API silencioso para resucitar su Entidad real y perfiles.
     */
    useEffect(() => {
        if (token && !user) {
            client.get('/user')
                .then(({ data }) => setUser(data.user))
                .catch(() => setToken(null));
        }
    }, [token, user]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom Hook: useAuth
 * Sintaxis azucarada para poder implementar importaciones ligeras de contexto.
 * @returns {Object} Los estados y funciones del provider
 */
export const useAuth = () => useContext(AuthContext);