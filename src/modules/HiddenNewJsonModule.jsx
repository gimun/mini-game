// src/modules/HiddenNewJsonModule.jsx
import missionData from '../assets/data/new_mission_data.json';
import HiddenJsonModuleBase from './HiddenJsonModuleBase.jsx';

const HiddenNewJsonModule = () => {
  return <HiddenJsonModuleBase missionData={missionData} showFooter={false} />;
};

export default HiddenNewJsonModule;
