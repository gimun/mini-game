import { useState } from 'react';
import { DarkModeStyle } from '../atoms/styles/Typography.jsx';
import styled from 'styled-components';
import SubTabs from '../organisms/SubTabs.jsx';
import BattleRankModule from '../../modules/BattleRankModule.jsx';
import BattleJsonModule from '../../modules/BattleJsonModule.jsx';
import UnderConstruction3 from '../pages/UnderConstruction3.jsx';

const SubTabsWrapper = styled.main`
  background: none;

  ${DarkModeStyle}
`;

const Tab2Page = () => {
  const [activeSubTab, setActiveSubTab] = useState('subTab1');

  const subTabs = [
    { key: 'subTab1', label: '종합 랭킹', component: <BattleRankModule /> },
    { key: 'subTab2', label: '히스토리', component: <BattleJsonModule /> },
    { key: 'subTab3', label: 'Sub Tab 3', component: <UnderConstruction3 /> },
  ];

  const handleSubTabChange = (tabKey) => setActiveSubTab(tabKey);
  const activeSubTabInfo = subTabs.find((tab) => tab.key === activeSubTab);

  return (
    <SubTabsWrapper>
      <SubTabs
        subTabs={subTabs}
        activeSubTab={activeSubTab}
        onSubTabChange={handleSubTabChange}
      />
      <div>{activeSubTabInfo?.component}</div>
    </SubTabsWrapper>
  );
};

export default Tab2Page;
