// src/components/pages/Tab2Tip.jsx
import { Suspense, useState } from 'react';
import styled from 'styled-components';
import Tabs from '../organisms/Tabs.jsx';
import HiddenNewJsonModule from '../../modules/HiddenNewJsonModule.jsx';
import HiddenJsonModule from '../../modules/HiddenJsonModule.jsx';
import UnderConstruction3 from '../pages/UnderConstruction3.jsx';
import { media } from '../atoms/styles/media.js';

const SubTabsWrapper = styled.main`
  background: none;
  padding: ${({ theme }) => theme.spacing.small};

  ${media.mobile`
    padding: ${({ theme }) => theme.spacing.small};
  `}
`;

const Tab2Tip = () => {
  const [activeSubTab, setActiveSubTab] = useState('subTab1');

  const subTabs = [
    { key: 'subTab1', label: '신규 히든', component: <HiddenNewJsonModule /> },
    { key: 'subTab2', label: '클래식 히든', component: <HiddenJsonModule /> },
    { key: 'subTab3', label: 'Sub Tab 3', component: <UnderConstruction3 /> },
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

export default Tab2Tip;
