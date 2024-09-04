import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// styled-components로 스타일 정의 (반응형)
const GalleryWrapper = styled.div`
    max-width: 80%;
    margin: 0 auto;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
`;

const StyledTitle = styled.h3`
    font-size: 16px;
    color: #607d8b;
    font-weight: normal;
    margin: 0;
    text-align: left;
    flex-grow: 1;
    transition: color 0.3s ease-in-out;

    &:hover {
        color: #04608e;
    }
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
    }

    &:hover {
        svg {
            color: #04608e;
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

    .slick-slide, img, .slick-track, .slick-list {
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
`;

// react-slick 슬라이더 설정
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true,
    focusOnSelect: false,
};

// UI 컴포넌트
const PhotoGalleryUI = ({ title, isExpanded, toggleSlider, imageList }) => {
    if (!imageList.length) {
        return <p>No images found</p>;
    }

    return (
        <GalleryWrapper>
            <HeaderWrapper>
                <StyledTitle>{title}</StyledTitle>
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
PhotoGalleryUI.propTypes = {
    title: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    toggleSlider: PropTypes.func.isRequired,
    imageList: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PhotoGalleryUI;
