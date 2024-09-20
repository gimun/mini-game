// src/components/IconComponent.jsx
import PropTypes from 'prop-types';
import catIcon from '../../assets/icons/cat.svg';

const IconComponent = ({ width = 30, height = 30 }) => {
  return <img src={catIcon} width={width} height={height} alt="Cat Icon" />;
};

IconComponent.propTypes = {
  width: PropTypes.number, // 너비를 숫자로 정의
  height: PropTypes.number, // 높이를 숫자로 정의
};

export default IconComponent;
