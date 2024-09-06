import styled from 'styled-components';
import IconComponent from '../components/IconComponent';
import Tabs from '../components/Tabs';
import {TitleStyle, SubTitleStyle} from '../styles/Typography.jsx';
import PropTypes from 'prop-types';

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

const HeaderSubTitle = styled.span`
    margin-top: 15px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    ${SubTitleStyle}
`;

const IconContainer = styled.div`
    margin-right: 10px;
`;

const Header = ({activeTab, onTabChange, tabs}) => {
    return (
        <HeaderWrapper>
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

Header.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired, // key 속성으로 변경
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Header;
