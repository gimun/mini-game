import PropTypes from 'prop-types';
import {SORT} from '../constants/Keys.js';
import {FaSort, FaSortDown, FaSortUp} from 'react-icons/fa';
import {useState, useEffect, useRef} from 'react';
import Modal from './Modal'; // 모달 컴포넌트 가져오기
import {
    HighlightValue,
    InfoContainer,
    SearchContainer,
    SortIcon,
    SearchInput
} from '../styles/CommonStyles.jsx';

import styled from 'styled-components';

// 테이블 컨테이너 스타일 수정 (모바일 고려)
const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto; // 수평 스크롤 허용
    -webkit-overflow-scrolling: touch; // 모바일에서 부드러운 스크롤

    @media (max-width: 600px) {
        padding: 10px;  // 모바일에서 테이블 좌우 여백 추가
    }
`;

// TableContainer로 이름 변경하여 중복 피함
const TableContainer = styled.div`
    padding: 20px;

    @media (max-width: 600px) {
        padding: 10px;  // 모바일에서 패딩 줄이기
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: auto; // 열의 너비가 콘텐츠에 맞게 조정

    @media (max-width: 600px) {
        font-size: 12px;  // 모바일에서 폰트 크기 줄이기
    }
`;

const TableHeader = styled.th`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
    font-size: clamp(12px, 2vw, 16px);
    background-color: #f9f9f9;
    border-right: 1px solid #e0e0e0;
    flex: ${({$flex}) => $flex || '1'}; // $flex 사용

    &:last-child {
        border-right: none;
    }

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2; // 짝수 행의 배경색
    }

    &:nth-child(odd) {
        background-color: #ffffff; // 홀수 행의 배경색
    }

    &:hover {
        background-color: #e6f7ff; // 호버 시 강조 효과
    }

    @media (max-width: 600px) {
        &:hover {
            background-color: inherit; // 모바일에서는 호버 효과 제거
        }
    }
`;

const TableData = styled.td`
    padding: 8px;
    text-align: ${({$align}) => $align || 'left'}; // $align으로 변경
    white-space: nowrap; // 텍스트 줄바꿈 방지
    font-size: clamp(10px, 1.8vw, 14px); // 반응형 폰트 크기 적용
    border-right: 1px solid #e0e0e0; // 연한 회색 계열의 수직선 추가

    &:last-child {
        border-right: none; // 마지막 열의 경계선 제거
    }

    &:hover {
        background-color: #e6e6e6; // 클릭 가능한 셀에 호버 시 배경색 변경
    }

    @media (max-width: 600px) {
        font-size: 12px;  // 모바일에서 폰트 크기 줄이기
        padding: 6px;  // 모바일에서 패딩 줄이기
    }
`;

const MissionText = styled.span`
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    font-size: clamp(10px, 1.8vw, 14px);
    white-space: nowrap; // 줄바꿈을 하지 않음
    overflow: hidden; // 넘칠 경우 숨김
    text-overflow: ellipsis; // 넘칠 경우 점점점 처리
    max-width: 100%;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

// MissionTextComponent
const MissionTextComponent = ({ text, onClick }) => {
    const textRef = useRef(null);
    const [isEllipsis, setIsEllipsis] = useState(false);
    const [isDragging, setIsDragging] = useState(false); // 드래그 상태 추가
    const touchStartX = useRef(0); // 터치 시작 X좌표

    useEffect(() => {
        if (textRef.current) {
            setIsEllipsis(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
    }, [text]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX; // 터치 시작 위치 저장
        setIsDragging(false); // 드래그 상태 초기화
    };

    const handleTouchMove = (e) => {
        const touchMoveX = e.touches[0].clientX; // 현재 터치 이동 위치
        if (Math.abs(touchMoveX - touchStartX.current) > 10) {
            setIsDragging(true); // 드래그 상태로 전환
        }
    };

    const handleClick = (e) => {
        if (!isDragging) {
            onClick(); // 드래그 상태가 아닐 때만 클릭 이벤트 실행
        }
    };

    return (
        <MissionText
            ref={textRef}
            title={isEllipsis ? text : ''}
            onClick={handleClick} // 클릭 이벤트
            onTouchStart={handleTouchStart} // 터치 시작 이벤트
            onTouchMove={handleTouchMove} // 터치 이동 이벤트
        >
            {text}
        </MissionText>
    );
};

// DataFilteredDisplay 컴포넌트
const DataFilteredDisplay = (props) => {
    const {data, columns, onSort, config, onSearchChange} = props;

    const keyColumn = columns.find((col) => col.isKey);

    const getSortIcon = (columnKey) => {
        if (config.sort.key !== columnKey) {
            return (
                <SortIcon $active={false}>
                    <FaSort/>
                </SortIcon>
            );
        }

        return config.sort.direction === SORT.ASC ? (
            <SortIcon $active={true}>
                <FaSortUp/>
            </SortIcon>
        ) : (
            <SortIcon $active={true}>
                <FaSortDown/>
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
        <TableContainer> {/* Container 대신 TableContainer 사용 */}
            <TableWrapper>
                <SearchContainer>
                    <InfoContainer>
                        Total Count: <HighlightValue>{data.length}</HighlightValue>
                    </InfoContainer>
                    <SearchInput
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
                                        $flex={col.flex}  // $flex 사용
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
                                    <TableData
                                        key={col.key}
                                        $align={col.align}  // $align 사용
                                        className={col.key === 'mission' ? 'clickable' : ''}
                                    >
                                        {col.key === 'mission' ? (
                                            <MissionTextComponent
                                                text={item[col.key] || 'No mission available'}
                                                onClick={() => setSelectedMission(item[col.key] || 'No mission available')}
                                            />
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
        </TableContainer>
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
