import styled from 'styled-components';
import {DarkModeStyle} from './Typography.jsx';

export const Container = styled.div`
    padding: 3px;
    border-radius: 8px;
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FileSelectContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const FileSelectLabel = styled.label`
    margin-right: 10px;
    font-weight: 600;
    font-size: 16px;
    color: #333;
`;

export const FileSelect = styled.select`
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
    transition: border-color 0.3s ease;
    width: auto;

    ${DarkModeStyle}
    
    &:hover,
    &:focus {
        border-color: #007bff;
        outline: none;
    }
    
`;


export const LoadingMessage = styled.p`
    font-size: 18px;
    color: #007bff;
    text-align: center;
`;

export const ErrorMessage = styled.p`
    font-size: 18px;
    color: #dc3545;
    text-align: center;
`;
