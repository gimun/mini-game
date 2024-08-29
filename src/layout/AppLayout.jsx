// src/layout/AppLayout.jsx
import {useState} from 'react';
import {Analytics} from "@vercel/analytics/react";
import {useAuth} from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import styled from 'styled-components';
import Tab2Page from '../pages/Tab2Page';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import MemberJsonModule from "../modules/MemberJsonModule.jsx";
import BattleJsonModule from "../modules/BattleJsonModule.jsx";

const LayoutWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 100vh;
`;

const AppLayout = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingTab, setPendingTab] = useState(null);
    const {isAuthenticated} = useAuth();

    // TODO: lastUpdated 하드 코딩 제거
    const tabs = [
        {
            key: 'home',
            label: 'Home',
            //component: <MemberModule/>,
            component: <MemberJsonModule/>,
            protected: false,
            lastUpdated: '2024-08-19',
            showFooter: true
        },
        {
            key: 'clan-battle',
            label: '클랜 배틀',
            component: <BattleJsonModule/>,
            protected: false,
            lastUpdated: '2024-08-26',
            showFooter: false
        },
        {
            key: 'tab2',
            label: 'Tab 2',
            component: <Tab2Page/>,
            protected: false,
            lastUpdated: '-',
            showFooter: false
        },
        ...(isAuthenticated ? [{
            key: 'admin',
            label: 'Admin',
            component: <AdminPage/>,
            protected: true,
            lastUpdated: '2024-08-05',
            showFooter: false
        }] : [])
    ];

    const handleTabChange = (tabKey) => {
        const selectedTab = tabs.find(tab => tab.key === tabKey);

        if (selectedTab.protected && !isAuthenticated) {
            setPendingTab(tabKey);
            setShowLoginModal(true);
        } else {
            setActiveTab(tabKey);
        }
    };

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
        if (isAuthenticated && pendingTab) {
            setActiveTab(pendingTab);
            setPendingTab(null);
        }
    };

    const handleLogout = () => {
        setActiveTab('home'); // 로그아웃 시 홈 탭으로 이동
    };

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        if (pendingTab) {
            setActiveTab(pendingTab);
            setPendingTab(null);
        }
    };

    const renderContent = () => {
        const activeTabInfo = tabs.find(tab => tab.key === activeTab);
        if (activeTabInfo) {
            return activeTabInfo.protected ? (
                <ProtectedRoute element={activeTabInfo.component} onShowLogin={handleLoginClick}/>
            ) : (
                activeTabInfo.component
            );
        }
        return null;
    };

    const activeTabInfo = tabs.find(tab => tab.key === activeTab);

    return (
        <LayoutWrapper>
            <Header
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onLoginClick={handleLoginClick}
                onLogout={handleLogout}
                tabs={tabs}
            />
            <MainContent>{renderContent()}</MainContent>
            {activeTabInfo?.showFooter && (
                <Footer lastUpdated={activeTabInfo.lastUpdated}/>
            )}
            {showLoginModal && (
                <LoginPage onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess}/>
            )}
            <Analytics/>
        </LayoutWrapper>
    );
};

export default AppLayout;
