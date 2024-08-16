// src/layout/Header.jsx
import {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tabs from '../components/Tabs';
import UserManager from '../pages/UserManager';
import UnderConstruction from '../pages/UnderConstruction';

// Header 스타일링
const HeaderWrapper = styled.header`
    background-color: #ffffff;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; /* 전체 너비를 차지하도록 설정 */
    box-sizing: border-box; /* 패딩과 보더를 포함하여 전체 너비를 계산 */
`;

// Title 스타일링
const HeaderTitle = styled.span`
    position: relative;
    font-family: 'Giants-Inline', sans-serif;
    font-size: 35px;
    color: #2e8b57;
    font-weight: normal;
    left: 4px;
    letter-spacing: 3px;
`;

// Subtitle 스타일링
const HeaderSubTitle = styled.span`
    margin-bottom: 3px;
    font-family: 'SUITE_Regular', sans-serif;
    font-size: 20px;
    color: #ff7100;
    font-weight: 200;
`;

// Content 영역 스타일링
const ContentWrapper = styled.div`
    width: 100%;
    padding: 20px;
`;

const Header = () => {
    const [activeTab, setActiveTab] = useState('home');

    const tabs = [
        {key: 'home', label: 'Home'},
        {key: 'tab1', label: 'Tab 1'},
        {key: 'tab2', label: 'Tab 2'}
    ];

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <UserManager/>;
            case 'tab1':
                return <UnderConstruction/>;
            case 'tab2':
                return <UnderConstruction/>;
            default:
                return <UserManager/>;
        }
    };

    return (
        <HeaderWrapper>
            <HeaderTitle>
                Mini Game
            </HeaderTitle>
            <HeaderSubTitle>
                ★고양이는야옹★
            </HeaderSubTitle>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            <ContentWrapper>
                {renderContent()}
            </ContentWrapper>
        </HeaderWrapper>
    );
};

// PropTypes validation
Header.propTypes = {
    onTabChange: PropTypes.func
};

export default Header;
