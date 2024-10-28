// src/modules/HiddenJsonModule.jsx
import missionData from '../assets/data/mission_data.json';
import HiddenJsonModuleBase from './HiddenJsonModuleBase.jsx';

const HiddenJsonModule = () => {
  return <HiddenJsonModuleBase missionData={missionData} showFooter={true} />;
};

export default HiddenJsonModule;
