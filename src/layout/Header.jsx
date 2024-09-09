import styled from 'styled-components';
import Tabs from '../components/templates/Tabs.jsx';
import {SubTitleStyle} from '../styles/Typography.jsx';
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
    font-size: 24px; /* 글자 크기를 크게 */
    font-weight: 700; /* 글자 두께를 두껍게 */
    ${SubTitleStyle}
`;

const IconContainer = styled.div`
    margin-right: 10px;

    img {
        border-radius: 25%; /* 이미지를 동그랗게 */
        border: 2px solid #f5f7fa; /* 테두리 추가 (선택 사항) */
    }
`;

const Header = ({activeTab, onTabChange, tabs}) => {
    return (
        <HeaderWrapper>
            <HeaderSubTitle>
                <IconContainer>
                    <img src="/clan-icon-white-bg.png" alt="고양이는야옹 아이콘" width={72} height={72}/>
                </IconContainer>
                고양이는야옹!
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
