// src/components/Footer.jsx
import styled from 'styled-components';
import { media } from './atoms/styles/media.js';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.footerBackground};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium} 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.footerText};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    margin: 10px 0;
    line-height: 1.6;
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }

  ${media.mobile`
    font-size: 12px;
    padding: ${({ theme }) => theme.spacing.small};
  `}
`;

const Footer = () => (
  <FooterContainer>
    <p>
      이 페이지는 <strong>물베님</strong>이{' '}
      <strong>미니게임천국 공식 카페</strong>의<strong>공략&Tip 게시판</strong>
      에 게시한 자료를 기반으로 검색 기능을 구현한 것입니다. 출처:
      <a
        href="https://cafe.naver.com/minigameparty/31951"
        target="_blank"
        rel="noopener noreferrer"
      >
        미니게임천국 공식 카페
      </a>
    </p>
    <p>&copy; 2024 고양이는야옹 - 미니게임천국</p>
  </FooterContainer>
);

export default Footer;
