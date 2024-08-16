// src/components/IconComponent.jsx
import PropTypes from 'prop-types';
import catIcon from '../assets/icons/cat.svg';

const IconComponent = ({ width, height }) => {
    return <img src={catIcon} width={width} height={height} alt="Cat Icon" />;
};

IconComponent.propTypes = {
    width: PropTypes.number,   // 너비를 숫자로 정의
    height: PropTypes.number   // 높이를 숫자로 정의
};

IconComponent.defaultProps = {
    width: 30,  // 기본 너비 설정
    height: 30  // 기본 높이 설정
};

export default IconComponent;
