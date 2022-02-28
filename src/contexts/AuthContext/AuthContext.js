import { createContext } from 'react';
import { useAuthContext } from '../../hooks';

const Context = createContext();

const AuthProvider = ({ children }) => {
    const { isAuthenticated, loading, login, logout } = useAuthContext();
    return (
        <Context.Provider
            value={{ isAuthenticated, loading, login, logout }}
        >
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
