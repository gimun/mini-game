import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { DarkModeStyle } from '../atoms/styles/Typography.jsx';
import { FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';

// styled-components로 스타일 정의 (반응형)
const GalleryWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 10px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  color: #55679c; /* 제목 색상 */
  font-weight: normal;
  margin: 0;
  text-align: left;
  transition: color 0.3s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #55679c; /* 제목 hover 시 색상 */
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }

  ${DarkModeStyle}
`;

const StyledIcon = styled(FiExternalLink)`
  margin-left: 10px;
  color: #1e2a5e; /* 아이콘 색상 */
  font-size: 20px;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #1e2a5e; /* 아이콘 hover 시 색상 */
  }

  @media (max-width: 600px) {
    font-size: 18px;
    margin-left: 5px;
  }

  ${DarkModeStyle}
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  svg {
    margin-left: 5px;
    color: #05486e;
    font-size: 24px;

    ${DarkModeStyle}
  }

  &:hover {
    svg {
      color: #04608e;
    }
  }

  @media (max-width: 600px) {
    padding: 0;

    svg {
      font-size: 20px;
    }
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &[aria-hidden='true'] {
    pointer-events: none;
    user-select: none;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }

  .slick-slide,
  img,
  .slick-track,
  .slick-list {
    outline: none;
    user-select: none;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: width 0.3s ease-in-out;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    width: 300px;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

// react-slick 슬라이더 설정
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  pauseOnHover: true,
  draggable: true,
  focusOnSelect: false,
};

// UI 컴포넌트
const PhotoSlider = ({
  title,
  isExpanded,
  toggleSlider,
  imageList,
  onGalleryClick,
}) => {
  if (!imageList.length) {
    return <p>No images found</p>;
  }

  return (
    <GalleryWrapper>
      <HeaderWrapper>
        <TitleWrapper>
          <StyledTitle onClick={onGalleryClick}>{title}</StyledTitle>
          <StyledIcon onClick={onGalleryClick} /> {/* 상세보기 아이콘 */}
        </TitleWrapper>
        <ToggleButton onClick={toggleSlider}>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </ToggleButton>
      </HeaderWrapper>
      <SliderContainer aria-hidden={!isExpanded}>
        {isExpanded && (
          <Slider {...settings}>
            {imageList.map((image, index) => (
              <ImageWrapper key={index}>
                <img src={image.src} alt={image.alt} tabIndex="-1" />
              </ImageWrapper>
            ))}
          </Slider>
        )}
      </SliderContainer>
    </GalleryWrapper>
  );
};

// PropTypes 정의
PhotoSlider.propTypes = {
  title: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  toggleSlider: PropTypes.func.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onGalleryClick: PropTypes.func.isRequired, // 갤러리 클릭 핸들러 추가
};

export default PhotoSlider;
