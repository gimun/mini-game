// Typography.jsx
import { css } from 'styled-components';

export const DarkModeStyle = css`
  /* 다크 모드일 경우 */
  @media (prefers-color-scheme: dark) {
    background-color: #121212;
    color: white;
  }
`;

// 기본 타이틀 스타일
export const TitleStyle = css`
  font-family: 'Giants-Inline', sans-serif;
  font-size: clamp(16px, 5vw, 24px);
  color: #2e8b57;
  font-weight: normal;
  letter-spacing: 3px;
`;

// 기본 서브 타이틀 스타일
export const SubTitleStyle = css`
  font-family: 'SUITE_Regular', sans-serif;
  font-size: clamp(16px, 5vw, 24px);
  color: #0f1035;
  font-weight: 550;
  letter-spacing: 1px;

  ${DarkModeStyle}
`;

// 기본 본문 텍스트 스타일
export const BodyTextStyle = css`
  font-family: 'SUITE_Regular', sans-serif;
  font-size: clamp(12px, 3vw, 16px);
  color: #607d8b;
  line-height: 1.5;
`;
