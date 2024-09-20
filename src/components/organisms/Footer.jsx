import styled from 'styled-components';
import PropTypes from 'prop-types';

const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 0.9em;
  color: #6c757d;
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
