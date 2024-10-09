// src/components/atoms/styles/SelectBoxStyles.jsx
import styled from 'styled-components';
import { media } from './media.js'; // 미디어 쿼리 헬퍼 임포트

// 컨테이너 스타일
export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 8px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background};
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease;

  ${media.mobile`
    padding: ${({ theme }) => theme.spacing.small};
  `}
`;

// 파일 선택 컨테이너 스타일
export const FileSelectContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

// 파일 선택 레이블 스타일
export const FileSelectLabel = styled.label`
  margin-right: ${({ theme }) => theme.spacing.small};
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};

  ${media.mobile`
    font-size: 14px;
  `}
`;

// 파일 선택 박스 스타일
export const FileSelect = styled.select`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease;
  width: auto;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }

  ${media.mobile`
    font-size: 14px;
    padding: 6px 8px;
  `}
`;

// 로딩 메시지 스타일
export const LoadingMessage = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;

  ${media.mobile`
    font-size: 16px;
  `}
`;

// 에러 메시지 스타일
export const ErrorMessage = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;

  ${media.mobile`
    font-size: 16px;
  `}
`;
