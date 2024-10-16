// src/components/pages/Tab2Page.jsx
import { Suspense, useState } from 'react';
import styled from 'styled-components';
import Tabs from '../organisms/Tabs.jsx';
import BattleRankModule from '../../modules/BattleRankModule.jsx';
import BattleJsonModule from '../../modules/BattleJsonModule.jsx';
import { media } from '../atoms/styles/media.js';

const SubTabsWrapper = styled.main`
  background: none;
  padding: ${({ theme }) => theme.spacing.small};

  ${media.mobile`
    padding: ${({ theme }) => theme.spacing.small};
  `}
`;

const Tab2Page = () => {
  const [activeSubTab, setActiveSubTab] = useState('subTab1');

  const subTabs = [
    { key: 'subTab1', label: '종합 랭킹', component: <BattleRankModule isMonthly={false} /> },
    { key: 'subTab2', label: '월간 랭킹', component: <BattleRankModule isMonthly={true} /> },
    { key: 'subTab3', label: '히스토리', component: <BattleJsonModule /> },
  ];

  const handleSubTabChange = (tabKey) => setActiveSubTab(tabKey);
  const activeSubTabInfo = subTabs.find((tab) => tab.key === activeSubTab);

  return (
    <SubTabsWrapper>
      <Tabs
        tabs={subTabs}
        activeTab={activeSubTab}
        onTabChange={handleSubTabChange}
        variant="sub"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <div>{activeSubTabInfo?.component}</div>
      </Suspense>
    </SubTabsWrapper>
  );
};

export default Tab2Page;
