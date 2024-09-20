// src/components/organisms/SubTabs.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../atoms/styles/media.js';

const SubTabsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  border-bottom: 1px solid #d3d3d3;
  box-sizing: border-box;
  padding: 0 15px;
  margin-bottom: 10px;

  ${media.mobile`
    flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 0 10px;
    margin-bottom: 8px;
  `}
`;

const SubTabButton = styled.button`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: clamp(13px, 3vw, 17px);
  color: ${({ theme, $active }) =>
    $active ? theme.colors.subTabActive : theme.colors.subTabInactive};
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  cursor: pointer;
  text-align: center;
  transition: color 0.3s;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
  }

  ${media.mobile`
    padding: 8px;
    font-size: clamp(12px, 4vw, 16px);
  `}
`;

// 명명된 함수로 SubTabs 컴포넌트 정의
const SubTabsComponent = ({ subTabs, activeSubTab, onSubTabChange }) => {
  return (
    <SubTabsContainer role="tablist">
      {subTabs.map((tab) => (
        <SubTabButton
          key={tab.key}
          $active={tab.key === activeSubTab}
          onClick={() => onSubTabChange(tab.key)}
          aria-selected={tab.key === activeSubTab}
          role="tab"
        >
          {tab.label}
        </SubTabButton>
      ))}
    </SubTabsContainer>
  );
};

// PropTypes 정의
SubTabsComponent.propTypes = {
  subTabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeSubTab: PropTypes.string.isRequired,
  onSubTabChange: PropTypes.func.isRequired,
};

// React.memo로 최적화된 SubTabs 컴포넌트 생성
const SubTabs = React.memo(SubTabsComponent);

export default SubTabs;
