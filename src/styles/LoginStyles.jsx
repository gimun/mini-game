// src/styles/LoginStyles.js
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa'; // 닫기 아이콘으로 사용할 react-icons

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
    position: relative;  /* 닫기 아이콘 위치를 위한 relative 설정 */
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    max-width: 400px;
    width: 90%; /* 화면의 90% 너비로 설정하여 화면을 넘지 않도록 함 */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

export const CloseIcon = styled(FaTimes)`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
    color: #333;

    &:hover {
        color: #007bff;
    }
`;

export const LoginForm = styled.form`
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box; /* 패딩을 포함하여 전체 크기를 계산 */
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    width: 100%;  /* 부모 요소의 너비를 따라가도록 설정 */
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box; /* 패딩을 포함하여 크기를 계산 */
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 15px;
    background: linear-gradient(90deg, #007bff, #0056b3);
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, #0056b3, #007bff);
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background: #cccccc;
        cursor: not-allowed;
    }
`;

export const ErrorMessage = styled.div`
    color: #dc3545;
    margin-bottom: 20px;
    font-size: 14px;
    text-align: center;
`;

export const Title = styled.h2`
    margin-bottom: 30px;
    color: #333;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
`;
