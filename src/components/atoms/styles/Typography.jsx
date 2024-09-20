// src/atoms/styles/Typography.jsx
import { css } from 'styled-components';

export const TitleStyle = css`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: clamp(16px, 5vw, 24px);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: normal;
  letter-spacing: 3px;
`;

export const SubTitleStyle = css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: clamp(16px, 5vw, 24px);
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  letter-spacing: 1px;
`;

export const BodyTextStyle = css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: clamp(12px, 3vw, 16px);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;
