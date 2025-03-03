// src/components/organisms/Header.jsx
import styled from 'styled-components';
import { SubTitleStyle } from '../atoms/styles/Typography.jsx';
import Tabs from './Tabs.jsx';
import PropTypes from 'prop-types';
import { media } from '../atoms/styles/media.js';

const HeaderWrapper = styled.header`
  margin-top: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: ${({ theme }) => theme.spacing.medium};

  ${media.mobile`
    padding: ${({ theme }) => theme.spacing.small};
  `}
`;

const IconAndTitleWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 아이콘과 텍스트를 수직 배치 */
  align-items: center;
  margin-bottom: 10px; /* 아이콘과 탭 사이 여백 추가 */

  ${media.mobile`
    margin-bottom: 8px;
  `}
`;

const IconContainer = styled.div`
  margin-bottom: 5px; /* 아이콘과 텍스트 사이 간격 */

  img {
    border-radius: 50%; /* 이미지를 동그랗게 */
    border: 2px solid ${({ theme }) => theme.colors.primary};
    width: 72px;
    height: 72px;

    ${media.mobile`
      width: 48px;
      height: 48px;
    `}
  }
`;

const HeaderSubTitle = styled.div`
  margin-left: 12px;
  ${SubTitleStyle}

  ${media.mobile`
    margin-left: 8px;
    font-size: clamp(14px, 4vw, 18px);
  `}
`;

const RotatedEmoji = styled.span`
  display: inline-block; /* 회전을 위해 블록 레벨 요소로 변경 */
  transform: rotate(50deg);
  margin-left: 1px;

  ${media.mobile`
    margin-left: 1px;
    font-size: 1.2em;
  `}
`;

const Header = ({ activeTab, onTabChange, tabs }) => {
  return (
    <HeaderWrapper>
      <IconAndTitleWrapper>
        <IconContainer>
          <img
            src="/clan-icon-white-bg.png"
            alt="고양이는야옹 아이콘"
            width={72}
            height={72}
          />
        </IconContainer>
        <HeaderSubTitle>
          고양이는야옹<RotatedEmoji>🐾</RotatedEmoji>
        </HeaderSubTitle>
      </IconAndTitleWrapper>
      <nav aria-label="Main Navigation">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          variant="main"
        />
      </nav>
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
    }),
  ).isRequired,
};

export default Header;
