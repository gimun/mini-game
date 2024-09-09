import {useState} from 'react';
import UnderConstruction from '../pages/UnderConstruction';
import UnderConstruction2 from '../pages/UnderConstruction2';
import UnderConstruction3 from '../pages/UnderConstruction3';
import SubTabs from '../components/templates/SubTabs.jsx';

const Tab2Page = () => {
    const [activeSubTab, setActiveSubTab] = useState('subTab1');

    const subTabs = [
        {key: 'subTab1', label: 'Sub Tab 1', component: <UnderConstruction/>},
        {key: 'subTab2', label: 'Sub Tab 2', component: <UnderConstruction2/>},
        {key: 'subTab3', label: 'Sub Tab 3', component: <UnderConstruction3/>},
    ];

    const renderSubTabContent = () => {
        const activeSubTabInfo = subTabs.find(tab => tab.key === activeSubTab);
        return activeSubTabInfo ? activeSubTabInfo.component : null;
    };

    return (
        <div>
            <SubTabs
                subTabs={subTabs}
                activeSubTab={activeSubTab}
                onSubTabChange={setActiveSubTab}
            />
            <div>
                {renderSubTabContent()}
            </div>
        </div>
    );
};

export default Tab2Page;
