import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DarkModeStyle } from '../atoms/styles/Typography.jsx';

const MainContentWrapper = styled.main`
  margin-top: 10px;

  ${DarkModeStyle}
`;

const MainContent = ({ children }) => {
  return <MainContentWrapper>{children}</MainContentWrapper>;
};

// PropTypes validation
MainContent.propTypes = {
  children: PropTypes.node,
};

export default MainContent;
