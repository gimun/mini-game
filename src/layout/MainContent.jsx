import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContentWrapper = styled.main`
    margin-top: 10px;
    background-color: white;
    color: black;

    /* 다크 모드일 경우 */
    @media (prefers-color-scheme: dark) {
        background-color: #121212;
        color: white;
    }
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
