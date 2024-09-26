// src/components/pages/DataFilteredDisplay.jsx
import PropTypes from 'prop-types';
import { SORT } from '../../constants/Keys.js';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import Modal from '../molecules/Modal.jsx'; // 모달 컴포넌트 가져오기
import NoData from '../molecules/NoData.jsx';
import {
  HighlightValue,
  InfoContainer,
  SortIcon,
  Table,
  TableHeader,
  TableRow,
  TableData,
  TableWrapper,
  TableContainer,
} from '../atoms/styles/CommonStyles.jsx'; // 스타일 컴포넌트 import
import styled from 'styled-components';
import { highlightText } from '../../utils/highlight.jsx'; // 수정된 import

// MissionText 스타일링 (별도 styled 컴포넌트)
const MissionText = styled.span`
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  font-size: clamp(12px, 1.5vw, 16px); /* 최소 크기와 최대 크기 조정 */
  white-space: nowrap; /* 줄바꿈을 하지 않음 */
  overflow: hidden; /* 넘칠 경우 숨김 */
  text-overflow: ellipsis; /* 넘칠 경우 점점점 처리 */
  max-width: 100%;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

// MissionTextComponent
const MissionTextComponent = ({ text, onClick, searchTerm }) => {
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

  const handleClick = () => {
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
      {highlightText(text, searchTerm)}
    </MissionText>
  );
};

// PropTypes validation for MissionTextComponent
MissionTextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  searchTerm: PropTypes.string, // 추가된 searchTerm prop
};

// DataFilteredDisplay 컴포넌트
const DataFilteredDisplay = ({ data, columns, onSort, config, searchTerm }) => {
  // 선택된 미션을 관리하는 상태
  const [selectedMission, setSelectedMission] = useState(null);

  // keyColumn 찾기
  const keyColumn = columns.find((col) => col.isKey);

  // 정렬 아이콘 반환 함수
  const getSortIcon = (columnKey) => {
    if (config.sort.key !== columnKey) {
      return (
        <SortIcon $active={false}>
          <FaSort />
        </SortIcon>
      );
    }

    return config.sort.direction === SORT.ASC ? (
      <SortIcon $active={true}>
        <FaSortUp />
      </SortIcon>
    ) : (
      <SortIcon $active={true}>
        <FaSortDown />
      </SortIcon>
    );
  };

  // 숫자 포맷팅 함수
  const formatNumber = (number) => {
    const safeNumber = number != null && !isNaN(number) ? number : 0;
    return new Intl.NumberFormat().format(safeNumber);
  };

  // 각 열의 minWidth을 반환하는 함수
  const getMinWidth = (key) => {
    switch (key) {
      case 'mission_id':
        return '50px'; // No.
      case 'reward_type':
        return '100px'; // 분류
      case 'game_name':
        return '150px'; // 게임
      case 'emblem':
        return '150px'; // 칭호
      case 'reward':
        return '200px'; // 보상
      case 'mission':
        return '250px'; // 미션
      default:
        return '100px'; // 기본값
    }
  };

  return (
    <TableContainer>
      <TableWrapper>
        <InfoContainer>
          총 개수: <HighlightValue>{data.length}</HighlightValue>
        </InfoContainer>
        <Table>
          {/* colgroup을 사용하여 열의 최소 너비 설정 */}
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ minWidth: getMinWidth(col.key) }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map(
                (col) =>
                  col !== keyColumn && (
                    <TableHeader
                      key={col.key}
                      onClick={() => onSort(col.key)}
                      // $flex 제거
                    >
                      {col.label}
                      {getSortIcon(col.key)}
                    </TableHeader>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <NoData message="조회된 데이터가 없습니다." />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <TableRow key={item[keyColumn.key]}>
                  {columns.map((col) =>
                    col !== keyColumn ? (
                      <TableData
                        key={col.key}
                        $align={col.align}
                        className={col.key === 'mission' ? 'clickable' : ''}
                      >
                        {col.key === 'mission' ? (
                          <MissionTextComponent
                            text={item[col.key] || '미션 없음'}
                            onClick={() =>
                              setSelectedMission(item[col.key] || '미션 없음')
                            }
                            searchTerm={searchTerm} // 검색어 전달
                          />
                        ) : col.type === 'number' ? (
                          formatNumber(item[col.key])
                        ) : (
                          highlightText(item[col.key], searchTerm) // 검색어 하이라이트 적용
                        )}
                      </TableData>
                    ) : null
                  )}
                </TableRow>
              ))
            )}
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

// PropTypes validation for DataFilteredDisplay
DataFilteredDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      type: PropTypes.string.isRequired,
      isKey: PropTypes.bool,
      minWidth: PropTypes.string, // 추가된 minWidth prop
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
  searchTerm: PropTypes.string, // 검색어 prop 추가
};

export default DataFilteredDisplay;
