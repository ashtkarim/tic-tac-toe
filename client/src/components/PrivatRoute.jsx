import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import request from './request';
import Cookies from 'js-cookie';
import { useAuth } from './AuthProvider';


const PrivateRoute = ({ children, accessible=true }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const { user, setUser } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await request.get("http://127.0.0.1:3000/@me")
                if (res.status === 200) {
                    console.log(res);
                    setUser(res.data.user)
                    setIsAuthenticated(true);
                } else {
                    Cookies.remove('_token');
                    setIsAuthenticated(false);
                }
            } catch {
                Cookies.remove('_token');
                // console.log("UNAUTHERIZED");
                setIsAuthenticated(false);
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
                <>{children}</>
        )
    }
    return (
        isAuthenticated ? (
            <>{children}</>
        ) : (
            <Navigate to="/signin" />
        )
    );
};

export default PrivateRoute;