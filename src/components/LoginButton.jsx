// src/components/LoginButton.jsx
import React from 'react';
import styled from 'styled-components';
import {useAuth} from '../contexts/AuthContext';

const Button = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    color: #007bff;
    cursor: pointer;
    margin-top: 10px;
    text-align: right;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const LoginButton = ({onClick, onLogout}) => {
    const {isAuthenticated, logout} = useAuth();

    const handleLoginClick = () => {
        if (!isAuthenticated) {
            onClick();
        }
    };

    const handleLogoutClick = async () => {
        try {
            await logout();
            onLogout();
        } catch (err) {
            console.error('Logout error:', err.message);
        }
    };

    return isAuthenticated ? (
        <Button onClick={handleLogoutClick}>
            Logout
        </Button>
    ) : (
        <Button onClick={handleLoginClick}>
            Login
        </Button>
    );
};

export default LoginButton;

