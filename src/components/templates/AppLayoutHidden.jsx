// src/components/templates/AppLayoutHidden.jsx
import React, { Suspense, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { media } from '../atoms/styles/media.js';
import Header from '../organisms/Header.jsx';
import Footer from '../organisms/Footer.jsx';
import styled from 'styled-components';
import Tab2Tip from './Tab2Tip.jsx';

// 스타일 컴포넌트 정의
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.background};

  ${media.mobile`
    padding: 1px;
  `}
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;

  p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.primary};
    transition: color 0.3s ease;

    ${media.mobile`
      font-size: 16px;
    `}
  }
`;

const AppLayoutHiddenComponent = () => {
  const [activeTab, setActiveTab] = useState('cat-tips-hidden');

  const tabs = [
    {
      key: 'cat-tips-hidden',
      label: '냥냥 꿀팁방',
      component: <Tab2Tip />,
      protected: false,
      footerText: '',
      showFooter: false,
    },
  ];

  const handleTabChange = (tabKey) => setActiveTab(tabKey);
  const activeTabInfo = tabs.find((tab) => tab.key === activeTab);

  return (
    <LayoutWrapper>
      <Header activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
      <Suspense
        fallback={
          <LoadingWrapper>
            <p>Loading...</p>
          </LoadingWrapper>
        }
      >
        <ContentWrapper>{activeTabInfo?.component}</ContentWrapper>
      </Suspense>
      {activeTabInfo?.showFooter && (
        <Footer footerText={activeTabInfo.footerText} />
      )}
      <Analytics />
    </LayoutWrapper>
  );
};

// PropTypes 정의
AppLayoutHiddenComponent.propTypes = {};

// displayName 설정
AppLayoutHiddenComponent.displayName = 'AppLayoutHiddenComponent';

// React.memo로 최적화된 AppLayout 컴포넌트 생성
const AppLayoutHidden = React.memo(AppLayoutHiddenComponent);

export default AppLayoutHidden;
