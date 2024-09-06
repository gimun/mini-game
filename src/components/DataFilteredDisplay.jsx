// src/components/DataFilteredDisplay.jsx
import PropTypes from 'prop-types';
import { SORT } from '../constants/Keys.js';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useState } from 'react';
import Modal from './Modal'; // 모달 컴포넌트 가져오기
import {
    Container,
    HighlightValue,
    InfoContainer,
    SearchContainer,
    SortIcon,
} from '../styles/CommonStyles.jsx';

import styled from 'styled-components';

// TableWrapper 스타일 수정
const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;  // 수평 스크롤을 허용
    -webkit-overflow-scrolling: touch;  // 모바일에서 부드러운 스크롤
`;

const Table = styled.table`
    width: 100%;  // 테이블은 100% 너비로 표시
    border-collapse: collapse;
    table-layout: auto;
`;

const TableHeader = styled.th`
    padding: 8px;
    text-align: center;  // 헤더를 가운데 정렬
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
    font-size: clamp(12px, 2vw, 16px);  // 반응형 폰트 크기 적용
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableData = styled.td`
    padding: 8px;
    text-align: ${({ align }) => (align ? align : 'left')};
    white-space: nowrap;  // 텍스트 줄바꿈 방지
    font-size: clamp(10px, 1.8vw, 14px);  // 반응형 폰트 크기 적용

    &.clickable {
        cursor: pointer;
        background-color: #f9f9f9;  // 배경 유지
        &:hover {
            background-color: #e6e6e6;  // 호버 시 배경색 변경
        }
    }
`;

const MissionText = styled.span`
    display: inline-block;
    cursor: pointer;
    text-decoration: none;  // 버튼처럼 보이지 않도록
    font-size: clamp(10px, 1.8vw, 14px);  // 미션 텍스트에 반응형 폰트 크기 적용
    &:hover {
        text-decoration: underline;  // 호버 시 강조
    }
`;

// DataFilteredDisplay 컴포넌트
const DataFilteredDisplay = (props) => {
    const { data, columns, onSort, config, onSearchChange } = props;

    const keyColumn = columns.find((col) => col.isKey);

    const getSortIcon = (columnKey) => {
        if (config.sort.key !== columnKey) {
            return (
                <SortIcon active={false}>
                    <FaSort />
                </SortIcon>
            );
        }

        return config.sort.direction === SORT.ASC ? (
            <SortIcon active>
                <FaSortUp />
            </SortIcon>
        ) : (
            <SortIcon active>
                <FaSortDown />
            </SortIcon>
        );
    };

    const formatNumber = (number) => {
        const safeNumber = number != null && !isNaN(number) ? number : 0;
        return new Intl.NumberFormat().format(safeNumber);
    };

    // 모달 관련 상태 관리
    const [selectedMission, setSelectedMission] = useState(null);

    return (
        <Container>
            <TableWrapper>
                <SearchContainer>
                    <InfoContainer>
                        조회된 목록 수: <HighlightValue>{data.length}</HighlightValue>
                    </InfoContainer>
                    <input
                        type="text"
                        value={config.search.term}
                        onChange={onSearchChange}
                        placeholder={`Search by ${config.search.placeholder}`}
                    />
                </SearchContainer>
                <Table>
                    <thead>
                    <tr>
                        {columns.map(
                            (col) =>
                                col !== keyColumn && (
                                    <TableHeader
                                        key={col.key}
                                        onClick={() => onSort(col.key)}
                                        flex={col.flex}
                                    >
                                        {col.label}
                                        {getSortIcon(col.key)}
                                    </TableHeader>
                                )
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <TableRow key={item[keyColumn.key]}>
                            {columns.map((col) =>
                                col !== keyColumn ? (
                                    <TableData key={col.key} align={col.align} className={col.key === 'mission' ? 'clickable' : ''}>
                                        {col.key === 'mission' ? (
                                            <MissionText onClick={() => setSelectedMission(item[col.key] || 'No mission available')}>
                                                {(item[col.key] && item[col.key].slice(0, 30)) || 'No mission'}...
                                            </MissionText>
                                        ) : col.type === 'number' ? (
                                            formatNumber(item[col.key])
                                        ) : (
                                            item[col.key]
                                        )}
                                    </TableData>
                                ) : null
                            )}
                        </TableRow>
                    ))}
                    </tbody>
                </Table>
            </TableWrapper>

            {/* 모달 표시 */}
            {selectedMission && (
                <Modal onClose={() => setSelectedMission(null)}>
                    <p>{selectedMission}</p>
                </Modal>
            )}
        </Container>
    );
};

// PropTypes validation
DataFilteredDisplay.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            flex: PropTypes.number.isRequired,
            align: PropTypes.string,
            type: PropTypes.string.isRequired,
            isKey: PropTypes.bool,
        })
    ).isRequired,
    onSort: PropTypes.func.isRequired,
    config: PropTypes.shape({
        sort: PropTypes.shape({
            key: PropTypes.string.isRequired,
            direction: PropTypes.string.isRequired,
        }).isRequired,
        search: PropTypes.shape({
            term: PropTypes.string,
            placeholder: PropTypes.string,
        }),
    }).isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default DataFilteredDisplay;
