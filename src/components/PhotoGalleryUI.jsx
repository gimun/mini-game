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
    padding: 20px;
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
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
`;

const StyledTitle = styled.h2`
    font-size: 20px;
    color: #607d8b;
    font-weight: normal;
    letter-spacing: 1px;
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
    padding: 10px 10px;
    background-color: #fffefe;
    color: #05486e;
    border: 1px solid #607d8b;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e6fdd2;
    }

    svg {
        margin-left: 5px;
    }
`;

const SliderContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
    transition: height 0.3s ease-in-out;

    /* aria-hidden과 inert를 통해 포커스를 차단 */
    &[aria-hidden='true'] {
        pointer-events: none; /* 클릭 차단 */
        user-select: none; /* 텍스트 선택 차단 */
    }

    /* 슬라이더가 열려 있어도 포커스를 막음 */
    .slick-slide, img, .slick-track, .slick-list {
        outline: none; /* 포커스 outline 제거 */
        user-select: none; /* 사용자 상호작용 차단 */
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
        pointer-events: none; /* 이미지의 포커스와 클릭 차단 */
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
    focusOnSelect: false, // 선택 시 포커스 방지
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
                    {isExpanded ? '냥이 감추기' : '냥이 보기'}
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
