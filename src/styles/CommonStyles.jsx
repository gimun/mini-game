// src/styles/CommonStyles.jsx
import styled from 'styled-components';

// Container styling with flex layout and margins
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 20px;
    box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

// Wrapper for table to ensure full-width behavior
export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto; /* Handle overflow if table is too wide */
`;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-right: 20px;
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
    font-size: 14px;
    color: ${props => props.active ? '#007bff' : '#aaa'};
    opacity: ${props => props.active ? '1' : '0.5'}; /* 비활성화 상태에서 투명도 조절 */
    transition: font-size 0.3s, color 0.3s, opacity 0.3s; /* 부드러운 전환 효과 */
`;

