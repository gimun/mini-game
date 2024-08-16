// src/layout/MainContent.jsx
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContentWrapper = styled.main`
    padding: 20px;
    flex: 1; /* Main content should take up the remaining space */
`;

const MainContent = ({children}) => {
    return (
        <MainContentWrapper>
            {children}
        </MainContentWrapper>
    );
};

// PropTypes validation
MainContent.propTypes = {
    children: PropTypes.node
};

export default MainContent;
