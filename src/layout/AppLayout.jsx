// src/layout/AppLayout.jsx
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 100vh; /* Ensure the layout takes up at least the full viewport height */
`;

const AppLayout = ({children}) => {
    return (
        <LayoutWrapper>
            <Header/>
            <MainContent>
                {children}
            </MainContent>
            <Footer/>
        </LayoutWrapper>
    );
};

// PropTypes validation
AppLayout.propTypes = {
    children: PropTypes.node
};

export default AppLayout;

