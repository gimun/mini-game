// src/layout/AppLayout.jsx
import {useState} from 'react';
import {Analytics} from "@vercel/analytics/react";
import {useAuth} from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import styled from 'styled-components';
import UnderConstruction from '../pages/UnderConstruction';
import UserManager from '../pages/UserManager';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';

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
            component: <UserManager/>,
            protected: false,
            lastUpdated: '2024-08-19',
            showFooter: true
        },
        {
            key: 'tab1',
            label: 'Tab 1',
            component: <UnderConstruction/>,
            protected: false,
            lastUpdated: '-',
            showFooter: true
        },
        {
            key: 'tab2',
            label: 'Tab 2',
            component: <UnderConstruction/>,
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
