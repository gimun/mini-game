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

export const HighlightValue = styled.span`
  color: rgba(177, 41, 41, 0.8);
  font-weight: bold;
`;

const UnderConstruction = () => {
  return (
    <UnderConstructionWrapper>
      <HighlightValue>개발 진행 중입니다....3</HighlightValue>
    </UnderConstructionWrapper>
  );
};

export default UnderConstruction;
