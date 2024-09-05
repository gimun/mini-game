// Typography.jsx
import { css } from 'styled-components';

// 기본 타이틀 스타일
export const TitleStyle = css`
    font-family: 'Giants-Inline', sans-serif;
    font-size: clamp(20px, 2.5vw, 35px);
    color: #2e8b57;
    font-weight: normal;
    letter-spacing: 3px;
`;

// 기본 서브 타이틀 스타일
export const SubTitleStyle = css`
    font-family: 'SUITE_Regular', sans-serif;
    font-size: clamp(16px, 2vw, 24px);
    color: #607d8b;
    font-weight: 200;
`;

// 기본 본문 텍스트 스타일
export const BodyTextStyle = css`
    font-family: 'SUITE_Regular', sans-serif;
    font-size: clamp(14px, 1.5vw, 18px);
    color: #607d8b;
    line-height: 1.5;
`;
