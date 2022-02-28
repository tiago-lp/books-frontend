import { useState, useEffect } from 'react';

import api from '../../services/api';

const useAuthContext = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('auth/sign-in', { email, password });
        const name = response?.data?.name;
        const token = response?.headers?.authorization;
        const refreshToken = response?.headers['refresh-token'];

        if (name && token && refreshToken) {
            localStorage.setItem("name", JSON.stringify(name));
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("refresh-token", JSON.stringify(refreshToken));
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setIsAuthenticated(true); 
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("refresh-token");
        api.defaults.headers.Authorization = undefined;
    };

    return { isAuthenticated, loading, login, logout };
}

export default useAuthContext;
