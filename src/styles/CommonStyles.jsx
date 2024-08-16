// src/styles/CommonStyles.jsx
import styled from 'styled-components';

// Container styling with flex layout and margins
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    margin-left: 20px;
`;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 10px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse; /* 테두리가 겹치지 않도록 함 */
`;

export const TableHeader = styled.th`
    flex: ${props => props.flex || '1'};  /* 기본 비율을 1로 설정 */
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #ddd; 
    border-right: 1px solid #ddd;
    
    &:last-child {
        border-right: none; /* 마지막 열의 오른쪽 테두리 제거 */
    }
`;

export const TableData = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    text-align: ${props => props.align || 'left'};
    
    &:last-child {
        border-right: none; /* 마지막 열의 오른쪽 테두리 제거 */
    }
`;

// Row styling with hover effect
export const TableRow = styled.tr`
    &:hover {
        background-color: #f9f9f9;
    }
`;

// Sort icon styling
export const SortIcon = styled.span`
    margin-left: 8px;
    font-size: 12px;
    position: relative;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    visibility: ${props => props.active ? 'visible' : 'hidden'};
    color: ${props => props.active ? '#007bff' : '#aaa'}; /* Active color for sorted column, inactive for others */
`;

