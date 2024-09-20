import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { DarkModeStyle } from '../atoms/styles/Typography.jsx';
import Header from '../organisms/Header.jsx';
import Footer from '../organisms/Footer.jsx';
import MainContent from '../organisms/MainContent.jsx';
import styled from 'styled-components';
import MemberJsonModule from '../../modules/MemberJsonModule.jsx';
import PhotoGalleryModule from '../../modules/PhotoGalleryModule.jsx';
import HiddenJsonModule from '../../modules/HiddenJsonModule.jsx';
import Tab2Page from './Tab2Page.jsx';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  ${DarkModeStyle}
`;

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    {
      key: 'home',
      label: '냥냥 패밀리',
      component: <MemberJsonModule />,
      protected: false,
      footerText: '데이터 최신화: 2024-09-18',
      showFooter: true,
    },
    {
      key: 'clan-battle',
      label: '냥냥 대전',
      component: <Tab2Page />,
      protected: false,
      footerText: '클랜전 관련 개발 중...',
      showFooter: true,
    },
    {
      key: 'cat-images',
      label: '냥냥 사진관',
      component: <PhotoGalleryModule />,
      protected: false,
      footerText: '',
      showFooter: false,
    },
    {
      key: 'cat-tips',
      label: '냥냥 꿀팁방',
      component: <HiddenJsonModule />,
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
      <MainContent>{activeTabInfo?.component}</MainContent>
      {activeTabInfo?.showFooter && (
        <Footer footerText={activeTabInfo.footerText} />
      )}
      <Analytics />
    </LayoutWrapper>
  );
};

export default AppLayout;
