// src/components/pages/Tab2Page.jsx
import { Suspense, useState } from 'react';
import styled from 'styled-components';
import Tabs from '../organisms/Tabs.jsx';
import BattleRankNewModule from '../../modules/BattleRankNewModule.jsx';
import BattleRankNewWeekly from '../../modules/BattleRankNewWeekly.jsx';
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
    {
      key: 'subTab1',
      label: '월간 랭킹 (new)',
      component: <BattleRankNewModule gameCount={12} />,
    },
    {
      key: 'subTab11',
      label: '주간 랭킹',
      component: <BattleRankNewWeekly gameCount={3} />,
    },
    {
      key: 'subTab20',
      label: '종합 랭킹 (~24.11.24)',
      component: <BattleRankModule isMonthly={false} />,
    },
    {
      key: 'subTab21',
      label: '히스토리 (~24.11.24)',
      component: <BattleJsonModule />,
    },
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
