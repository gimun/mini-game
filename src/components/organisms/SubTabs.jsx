import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DarkModeStyle } from '../atoms/styles/Typography.jsx';

// SubTabs 스타일링
const SubTabsContainer = styled.div`
  display: flex;
  justify-content: space-evenly; /* 서브탭 간격을 전체 너비에서 균등하게 나누기 */
  position: relative;
  width: 100%; /* 전체 너비를 차지하도록 설정 */
  border-bottom: 1px solid #d3d3d3; /* 하단 가로선을 연한 회색(#d3d3d3)으로 얇게 설정 */
  box-sizing: border-box; /* 패딩과 보더를 포함하여 전체 너비를 계산 */
  padding: 0 15px; /* 좌우 패딩 */
  margin-bottom: 10px; /* 하단 마진 */

  /* 다크 모드일 경우 */
  @media (prefers-color-scheme: dark) {
    border-bottom: 2px solid #ffffff;
    ${DarkModeStyle}
  }
`;

const SubTab = styled.button`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: clamp(13px, 3vw, 17px);
  color: ${(props) =>
    props.$active ? 'rgba(234, 179, 8)' : '#607d8b'}; /* 선택된 서브탭 색상 */
  font-weight: ${(props) =>
    props.$active ? '500' : '400'}; /* 선택된 서브탭 굵기 */
  cursor: pointer;
  text-align: center;
  transition: color 0.3s;

  &:focus {
    outline: none;
  }

  /* 다크 모드일 경우 */
  @media (prefers-color-scheme: dark) {
    background-color: #121212;
    color: ${(props) =>
      props.$active ? 'rgba(234, 179, 8)' : '#ffffff'}; // $active로 변경
  }
`;

const SubTabs = ({ subTabs, activeSubTab, onSubTabChange }) => {
  return (
    <SubTabsContainer>
      {subTabs.map((tab) => (
        <SubTab
          key={tab.key}
          $active={tab.key === activeSubTab}
          onClick={() => onSubTabChange(tab.key)}
        >
          {tab.label}
        </SubTab>
      ))}
    </SubTabsContainer>
  );
};

// PropTypes validation
SubTabs.propTypes = {
  subTabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeSubTab: PropTypes.string.isRequired,
  onSubTabChange: PropTypes.func.isRequired,
};

export default SubTabs;
