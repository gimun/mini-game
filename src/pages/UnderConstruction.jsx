// src/pages/UnderConstruction.jsx
import styled from 'styled-components';

const UnderConstructionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    font-family: 'SUITE_Regular', sans-serif;
    font-size: 24px;
    color: #656565;
`;

const UnderConstruction = () => {
    return (
        <UnderConstructionWrapper>
            개발 진행 중입니다....
        </UnderConstructionWrapper>
    );
};

export default UnderConstruction;
