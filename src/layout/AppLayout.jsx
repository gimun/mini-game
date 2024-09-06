// src/layout/AppLayout.jsx
import {useState} from 'react';
import {Analytics} from "@vercel/analytics/react";
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import styled from 'styled-components';
//import Tab2Page from '../pages/Tab2Page';
import MemberJsonModule from "../modules/MemberJsonModule.jsx";
import BattleJsonModule from "../modules/BattleJsonModule.jsx";
import PhotoGalleryModule from "../modules/PhotoGalleryModule.jsx";
import HiddenJsonModule from "../modules/HiddenJsonModule.jsx";

const LayoutWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 100vh;
`;

const AppLayout = () => {
    const [activeTab, setActiveTab] = useState('home');

    // TODO: lastUpdated 하드 코딩 제거
    const tabs = [
        {
            key: 'home',
            label: 'Home',
            //component: <MemberModule/>,
            component: <MemberJsonModule/>,
            protected: false,
            lastUpdated: '2024-09-02',
            showFooter: true
        },
        {
            key: 'clan-battle',
            label: '클랜전',
            component: <BattleJsonModule/>,
            protected: false,
            lastUpdated: '2024-09-02',
            showFooter: false
        },
        {
            key: 'cat-images',
            label: '냥냥 사진관',
            component: <PhotoGalleryModule/>,
            protected: false,
            lastUpdated: '2024-09-02',
            showFooter: false
        },
        {
            key: '냥냥 꿀팁방',
            label: 'test',
            component: <HiddenJsonModule/>,
            protected: false,
            lastUpdated: '2024-09-06',
            showFooter: false
        }
        // ,
        // {
        //     key: 'tab2',
        //     label: 'Tab 2',
        //     component: <Tab2Page/>,
        //     protected: false,
        //     lastUpdated: '-',
        //     showFooter: false
        // }
    ];

    const handleTabChange = (tabKey) => setActiveTab(tabKey);
    const activeTabInfo = tabs.find(tab => tab.key === activeTab);

    return (
        <LayoutWrapper>
            <Header
                activeTab={activeTab}
                onTabChange={handleTabChange}
                tabs={tabs}
            />
            <MainContent>{activeTabInfo?.component}</MainContent>
            {activeTabInfo?.showFooter && (
                <Footer lastUpdated={activeTabInfo.lastUpdated}/>
            )}
            <Analytics/>
        </LayoutWrapper>
    );
};

export default AppLayout;
