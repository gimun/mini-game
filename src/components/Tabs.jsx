// src/components/Tabs.jsx
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Tabs 스타일링
const TabsContainer = styled.div`
    display: flex;
    justify-content: space-evenly; /* 탭 간격을 전체 너비에서 균등하게 나누기 */
    position: relative;
    width: 100%; /* 전체 너비를 차지하도록 설정 */
    border-top: 2px solid #2e8b57; /* 상단 가로선 */
    border-bottom: 2px solid #2e8b57; /* 하단 가로선 */
    box-sizing: border-box; /* 패딩과 보더를 포함하여 전체 너비를 계산 */
    padding: 0 20px; /* 좌우 패딩 */
    background-color: #f8f9fa; /* 배경색 설정 */
`;

const Tab = styled.button`
    flex: 1;
    background: none;
    border: none;
    padding: 10px;
    font-size: 16px;
    color: ${props => (props.active ? 'rgba(234, 179, 8)' : '#2e8b57')}; /* 선택된 탭 색상 */
    font-weight: ${props => (props.active ? '700' : '400')}; /* 선택된 탭 굵기 */
    cursor: pointer;
    text-align: center;
    transition: color 0.3s;

    &:focus {
        outline: none;
    }
`;

const Tabs = ({tabs, activeTab, onTabChange}) => {
    return (
        <TabsContainer>
            {tabs.map(tab => (
                <Tab
                    key={tab.key}
                    active={tab.key === activeTab}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </Tab>
            ))}
        </TabsContainer>
    );
};

// PropTypes validation
Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired
};

export default Tabs;
