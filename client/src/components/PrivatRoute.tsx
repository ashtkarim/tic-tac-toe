import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext, createContext } from 'react';
import axios from '../components/request';
import { AuthContextType, PrivateRouteProps } from './interfaces';

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);

const PrivateRoute: React.FC<PrivateRouteProps>  = ({ children, accessible=true }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const [doneLoading, setDoneLoading] = useState<boolean>(false);
    const [user, setUser] = useState<Object|null>(null);

    const logout = () => {
        setUser(null);
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:3000/@me")
                if (res.status === 200) {
                    setUser(res.data.user)
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                console.log("UNAUTHERIZED");
            }
            finally {
                setDoneLoading(true);
            }
        };
        checkAuth();
    }, []);
    if (!doneLoading) return null; // Blank screen during loading

    if (accessible) {
        return (
            <AuthContext.Provider value={{ user, logout }}>
                {children}
            </AuthContext.Provider>
        )
    }

    return (
        isAuthenticated ? (
            <AuthContext.Provider value={{ user }}>
                {children}
            </AuthContext.Provider>
        ) : (
            <Navigate to="/login" />
        )
    );
};

export default PrivateRoute;