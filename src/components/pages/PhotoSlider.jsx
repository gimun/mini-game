// src/components/pages/PhotoSlider.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import { media } from '../atoms/styles/media.js'; // 미디어 헬퍼 임포트

// 스타일 컴포넌트 정의
const GalleryWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${media.mobile`
    max-width: 100%;
    padding: 10px;
  `}
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 10px;

  ${media.mobile`
    flex-direction: row;
    align-items: center;
  `}
`;

const TitleButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.titleText};
  font-weight: normal;
  cursor: pointer;
  text-align: left;
  transition: color 0.3s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.titleHover};
    outline: none;
  }

  ${media.mobile`
    font-size: 14px;
  `}
`;

const StyledIcon = styled(FiExternalLink)`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.iconColor};
  font-size: 20px;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.iconHover};
    outline: none;
  }

  ${media.mobile`
    font-size: 18px;
    margin-left: 5px;
  `}
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
    color: ${({ theme }) => theme.colors.toggleIconColor};
    font-size: 24px;
    transition: color 0.3s ease-in-out;
  }

  &:hover,
  &:focus {
    svg {
      color: ${({ theme }) => theme.colors.toggleIconHover};
    }
    outline: none;
  }

  ${media.mobile`
    padding: 0;

    svg {
      font-size: 20px;
    }
  `}
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

  ${media.mobile`
    max-width: 100%;
  `}

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

  ${media.mobile`
    width: 300px;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
    }
  `}
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

// 추가된 스타일 컴포넌트: NoImagesText
const NoImagesText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: 20px;

  ${media.mobile`
    font-size: 14px;
  `}
`;

// 명명된 함수로 PhotoSlider 컴포넌트 정의
const PhotoSliderComponent = ({
  title,
  isExpanded,
  toggleSlider,
  imageList,
  onGalleryClick,
}) => {
  if (!imageList.length) {
    return <NoImagesText>No images found</NoImagesText>;
  }

  return (
    <GalleryWrapper>
      <HeaderWrapper>
        <TitleButton
          onClick={onGalleryClick}
          aria-label={`View gallery: ${title}`}
        >
          {title}
          <StyledIcon aria-hidden="true" />
        </TitleButton>
        <ToggleButton
          onClick={toggleSlider}
          aria-label={isExpanded ? 'Collapse Slider' : 'Expand Slider'}
        >
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
PhotoSliderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  toggleSlider: PropTypes.func.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onGalleryClick: PropTypes.func.isRequired, // 갤러리 클릭 핸들러
};

// React.memo로 최적화된 PhotoSlider 컴포넌트 생성
const PhotoSlider = React.memo(PhotoSliderComponent);

// displayName 설정
PhotoSlider.displayName = 'PhotoSlider';

export default PhotoSlider;
