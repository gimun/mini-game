import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DarkModeStyle } from '../atoms/styles/Typography.jsx';

// TabsContainer는 그대로 유지
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  border-top: 2px solid #2e8b57;
  border-bottom: 2px solid #2e8b57;
  padding: 0 5px;
  background-color: #f8f9fa;

  ${DarkModeStyle}
`;

// Tab에서 active를 $active로 변경하여 transient prop으로 설정
const Tab = styled.button`
  flex: 1;
  background: none;
  border: none;
  padding: 10px 0;
  font-size: clamp(13px, 3vw, 17px);
  color: ${(props) =>
    props.$active ? 'rgba(234, 179, 8)' : '#2e8b57'}; // $active로 변경
  font-weight: 450;
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

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          $active={tab.key === activeTab} // $active로 변경하여 DOM에 전달되지 않도록 처리
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Tabs;
