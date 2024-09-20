// src/components/organisms/MainContent.jsx
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../atoms/styles/media.js';

const MainContentWrapper = styled.main`
  margin-top: 10px;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};

  ${media.mobile`
    padding: ${({ theme }) => theme.spacing.small};
  `}
`;

const MainContent = ({ children }) => {
  return <MainContentWrapper>{children}</MainContentWrapper>;
};

MainContent.propTypes = {
  children: PropTypes.node,
};

export default MainContent;
