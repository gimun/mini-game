// src/pages/LoginPage.jsx
import React, {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {
    ModalBackground,
    ModalContent,
    CloseIcon,
    LoginForm,
    Input,
    Button,
    ErrorMessage,
    Title,
} from '../styles/LoginStyles';

const LoginPage = ({onClose, onLoginSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            onLoginSuccess();
        } catch (err) {
            setError('Failed to login. Please check your credentials and try again.');
        }
    };

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={onClose}/> {/* 닫기 아이콘 추가 */}
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <LoginForm onSubmit={handleLogin}>
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
            </ModalContent>
        </ModalBackground>
    );
};

export default LoginPage;
