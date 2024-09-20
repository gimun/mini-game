// src/components/organisms/Tabs.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../atoms/styles/media.js';

const TabsWrapper = styled.div`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.footerBackground};
  border-top: ${({ theme, $variant }) =>
    $variant === 'main'
      ? `2px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.primary}`};
  border-bottom: ${({ theme, $variant }) =>
    $variant === 'main'
      ? `2px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.primary}`};
  padding: 0 5px;
  display: flex;
  justify-content: center;

  ${media.mobile`
    flex-direction: column;
    border-top: 1px solid ${({ theme }) => theme.colors.primary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  `}
`;

const TabsContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const TabButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  padding: 10px 0;
  font-size: clamp(13px, 3vw, 17px);
  color: ${({ theme, $active }) =>
    $active ? theme.colors.tabActive : theme.colors.tabInactive};
  font-weight: 450;
  cursor: pointer;
  text-align: center;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }

  ${media.mobile`
    padding: 8px 0;
    font-size: clamp(12px, 4vw, 16px);
  `}
`;

const Tabs = React.memo(({ tabs, activeTab, onTabChange, variant }) => {
  return (
    <TabsWrapper $variant={variant} role="tablist">
      <TabsContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            $active={tab.key === activeTab}
            onClick={() => onTabChange(tab.key)}
            aria-selected={tab.key === activeTab}
            role="tab"
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsContainer>
    </TabsWrapper>
  );
});

// displayName 설정
Tabs.displayName = 'Tabs';

// PropTypes 정의
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['main', 'sub']), // 필요시 variant 추가
};

export default Tabs;
