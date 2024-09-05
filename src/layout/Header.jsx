// src/layout/Header.jsx
import React from 'react';
import styled from 'styled-components';
import IconComponent from '../components/IconComponent';
import Tabs from '../components/Tabs';
import { TitleStyle, SubTitleStyle, BodyTextStyle } from '../styles/Typography.jsx';

const HeaderWrapper = styled.header`
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    position: relative;
`;

const HeaderTitle = styled.span`
    margin-top: 10px;
    margin-bottom: 10px;
    ${TitleStyle}
`;

const HeaderSubTitle = styled.span`
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    ${SubTitleStyle}
`;

const IconContainer = styled.div`
    margin-right: 10px;
`;

const Header = ({activeTab, onTabChange, tabs}) => {
    return (
        <HeaderWrapper>
            <HeaderTitle>Mini Game</HeaderTitle>
            <HeaderSubTitle>
                <IconContainer>
                    <IconComponent width={30} height={30}/>
                </IconContainer>
                고양이는야옹
            </HeaderSubTitle>
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange}/>
        </HeaderWrapper>
    );
};

export default Header;
