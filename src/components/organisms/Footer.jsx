// src/components/organisms/Footer.jsx
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../atoms/styles/media.js';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.footerBackground};
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.footerText};
  padding: ${({ theme }) => theme.spacing.small};

  ${media.mobile`
    font-size: 0.8em;
    padding: ${({ theme }) => theme.spacing.xsmall};
  `}
`;

const Footer = ({ footerText = '개발 중...' }) => {
  return (
    <FooterWrapper>
      <p>{footerText}</p>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  footerText: PropTypes.string, // footer 문장은 문자열로 받아옵니다
};

export default Footer;
