import { createContext, useState, useContext, useEffect } from "react";
import client from "../api/axios";

const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (newToken) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const login = async (email, password, tipo) => {
        const response = await client.post('/login', { email, password, tipo });
        setUser(response.data.user);
        setToken(response.data.token);
    };

    const logout = async () => {
        try {
            await client.post('/logout');
        } catch (e) {
            console.error("Error logout", e);
        }
        setUser(null);
        setToken(null);
    };

    // Recargar usuario si hay token
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

export const useAuth = () => useContext(AuthContext);