// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const LoginForm = styled.form`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
        background: #0056b3;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin: 10px 0;
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin'); // 로그인 성공 시 admin 페이지로 이동
        } catch (err) {
            setError(err.message); // 에러 메시지 설정
        }
    };

    return (
        <LoginWrapper>
            <LoginForm onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Log In</Button>
            </LoginForm>
        </LoginWrapper>
    );
};

export default LoginPage;
