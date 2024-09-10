import styled from 'styled-components';
import Tabs from '../components/templates/Tabs.jsx';
import {SubTitleStyle} from '../styles/Typography.jsx';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.header`
    background-color: #ffffff;
    margin-top: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    position: relative;
`;

const IconAndTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;  /* 아이콘과 텍스트를 수직 배치 */
    align-items: center;
    margin-bottom: 10px; /* 아이콘과 탭 사이 여백 추가 */
`;

const IconContainer = styled.div`
    margin-bottom: 5px;  /* 아이콘과 텍스트 사이 간격 */

    img {
        border-radius: 25%; /* 이미지를 동그랗게 */
        border: 2px solid #f5f7fa; /* 테두리 추가 (선택 사항) */
    }
`;

const HeaderSubTitle = styled.div`
    margin-left: 12px;
    ${SubTitleStyle}
`;

const Header = ({activeTab, onTabChange, tabs}) => {
    return (
        <HeaderWrapper>
            <IconAndTitleWrapper>
                <IconContainer>
                    <img src="/clan-icon-white-bg.png" alt="고양이는야옹 아이콘" width={72} height={72}/>
                </IconContainer>
                <HeaderSubTitle>
                    고양이는야옹
                </HeaderSubTitle>
            </IconAndTitleWrapper>
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
