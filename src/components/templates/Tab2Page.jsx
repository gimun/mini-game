import {useState} from 'react';
import BattleRankModule from '../../modules/BattleRankModule.jsx';
import BattleJsonModule from '../../modules/BattleJsonModule.jsx';
import UnderConstruction3 from '../paegs/UnderConstruction3.jsx';
import SubTabs from '../organisms/SubTabs.jsx';

const Tab2Page = () => {
    const [activeSubTab, setActiveSubTab] = useState('subTab1');

    const subTabs = [
        {key: 'subTab1', label: '종합 랭킹', component: <BattleRankModule/>},
        {key: 'subTab2', label: '히스토리', component: <BattleJsonModule/>},
        {key: 'subTab3', label: 'Sub Tab 3', component: <UnderConstruction3/>},
    ];

    const handleSubTabChange = (tabKey) => setActiveSubTab(tabKey);
    const activeSubTabInfo = subTabs.find((tab) => tab.key === activeSubTab);

    return (
        <div>
            <SubTabs
                subTabs={subTabs}
                activeSubTab={activeSubTab}
                onSubTabChange={handleSubTabChange}
            />
            <div>
                {activeSubTabInfo?.component}
            </div>
        </div>
    );
};

export default Tab2Page;
