import styled from 'styled-components';

// Container styling with flex layout and margins
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

// Wrapper for table to ensure full-width behavior
export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto; /* Handle overflow if table is too wide */
`;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 10px;
`;

export const InfoContainer = styled.div`
    margin-left: 10px;
    font-size: 14px;
    color: #555; /* 텍스트 색상 */
`;

export const HighlightValue = styled.span`
    color: rgba(177, 41, 41, 0.8);
    font-weight: bold;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse; /* 테두리가 겹치지 않도록 함 */
`;

export const TableHeader = styled.th`
    font-family: 'SUITE_Regular', sans-serif;
    font-size: clamp(12px, 3vw, 16px);
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    flex: ${({$flex}) => $flex || '1'}; // flex 속성을 $flex로 변경

    &:last-child {
        border-right: none; /* 마지막 열의 오른쪽 테두리 제거 */
    }
`;

export const TableData = styled.td`
    font-family: 'SUITE_Regular', sans-serif;
    font-size: clamp(12px, 3vw, 16px);
    padding: 10px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    text-align: ${({$align}) => $align || 'left'}; // align 속성을 $align으로 변경

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

// CommonStyles.jsx에서
export const SortIcon = styled.span`
    margin-left: 5px;
    font-size: ${({$active}) => ($active ? '14px' : '10px')};
    color: ${({$active}) => ($active ? '#007bff' : '#aaa')};
    opacity: ${({$active}) => ($active ? '1' : '0.5')};
    transition: font-size 0.3s, color 0.3s, opacity 0.3s;
`;

export const SearchInput = styled.input`
    width: 40%; /* 입력 필드의 너비를 50%로 조정 */
    padding: 6px 8px; /* 패딩을 줄여서 작게 보이도록 설정 */
    border: 1px solid #ccc; /* 테두리 색상 조금 더 연하게 변경 */
    border-radius: 4px; /* 둥근 모서리 유지 */
    font-size: clamp(12px, 2vw, 14px); /* 폰트 크기 줄이기 */
    box-sizing: border-box; /* 패딩 포함한 너비 계산 */
    margin-top: 8px; /* 위쪽 여백 줄이기 */

    /* 포커스 시 스타일 */
    &:focus {
        border-color: #007bff; /* 포커스 시 파란 테두리 */
        outline: none; /* 기본 포커스 스타일 제거 */
        box-shadow: 0 0 3px rgba(0, 123, 255, 0.5); /* 파란색 그림자 효과 줄이기 */
    }

    @media (max-width: 600px) {
        width: 40%; /* 모바일에서는 전체 너비 차지 */
        font-size: 12px; /* 모바일에서 폰트 크기 줄이기 */
        padding: 6px; /* 모바일에서 패딩 유지 */
    }
`;