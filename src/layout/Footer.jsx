// src/layout/Header.jsx
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FaSyncAlt} from 'react-icons/fa'; // Refresh icon

const FooterWrapper = styled.footer`
    background-color: #f8f9fa;
    border-top: 1px solid #ddd;
    text-align: center;
    font-size: 0.9em;
    color: #6c757d;
`;

const Footer = ({lastUpdated}) => {
    return (
        <FooterWrapper>
            <p>
                <FaSyncAlt/> 데이터 최신화: {lastUpdated}
            </p>
        </FooterWrapper>
    );
};

Footer.propTypes = {
    lastUpdated: PropTypes.string
};

Footer.defaultProps = {
    lastUpdated: '2024-08-08'
};

export default Footer;
