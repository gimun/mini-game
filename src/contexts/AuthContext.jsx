// src/contexts/AuthContext.jsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth} from '../../firebase'; // Firebase 설정 파일에서 가져오기

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Login error:', error.message);
            throw error; // 필요시 에러를 호출하는 곳에서 처리할 수 있도록
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error.message);
            throw error; // 필요시 에러를 호출하는 곳에서 처리할 수 있도록
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
