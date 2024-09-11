import {useState} from 'react';
import {Analytics} from '@vercel/analytics/react';
import Header from '../organisms/Header.jsx';
import Footer from '../organisms/Footer.jsx';
import MainContent from '../organisms/MainContent.jsx';
import styled from 'styled-components';
import MemberJsonModule from '../../modules/MemberJsonModule.jsx';
import BattleJsonModule from '../../modules/BattleJsonModule.jsx';
import PhotoGalleryModule from '../../modules/PhotoGalleryModule.jsx';
import HiddenJsonModule from '../../modules/HiddenJsonModule.jsx';

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const AppLayout2 = () => {
    const [activeTab, setActiveTab] = useState('home');

    const tabs = [
        {
            key: 'home',
            label: '냥냥 패밀리2',
            component: <MemberJsonModule/>,
            protected: false,
            footerText: '데이터 최신화: 2024-09-02',
            showFooter: true,
        },
        {
            key: 'clan-battle',
            label: '냥냥 대전2',
            component: <BattleJsonModule/>,
            protected: false,
            footerText: '클랜전 관련 개발 중...',
            showFooter: true,
        },
        {
            key: 'cat-images',
            label: '냥냥 사진관2',
            component: <PhotoGalleryModule/>,
            protected: false,
            footerText: '',
            showFooter: false,
        },
        {
            key: 'cat-tips',
            label: '냥냥 꿀팁방2',
            component: <HiddenJsonModule/>,
            protected: false,
            footerText: '물베님 게시글: https://cafe.naver.com/minigameparty/31951',
            showFooter: true,
        },
    ];

    const handleTabChange = (tabKey) => setActiveTab(tabKey);
    const activeTabInfo = tabs.find((tab) => tab.key === activeTab);

    return (
        <LayoutWrapper>
            <Header activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs}/>
            <MainContent>{activeTabInfo?.component}</MainContent>
            {activeTabInfo?.showFooter && (
                <Footer footerText={activeTabInfo.footerText}/>
                )}
            <Analytics/>
        </LayoutWrapper>
    );
};

export default AppLayout2;
