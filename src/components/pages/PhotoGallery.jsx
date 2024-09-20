// src/components/pages/PhotoGallery.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io'; // 새로운 아이콘 가져오기
import { media } from '../atoms/styles/media.js'; // 미디어 헬퍼 임포트

// 스타일 컴포넌트 정의
const GalleryWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  ${media.mobile`
    max-width: 100%;
    padding: 15px;
  `}
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.titleText};
  text-align: center;
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.titleHover};
  }

  ${media.mobile`
    font-size: 18px;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.iconColor};
  padding: 0;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.iconHover};
    outline: none;
  }

  ${media.mobile`
    font-size: 20px;
    top: 5px;
    right: 5px;
  `}
`;

const StyledImageGallery = styled(ImageGallery)`
  .image-gallery-slide img {
    max-height: 600px;
    object-fit: contain;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }
  }

  .image-gallery-thumbnail img {
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    transition: border-color 0.3s ease-in-out;

    &.active {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  .image-gallery-icon {
    color: ${({ theme }) => theme.colors.iconColor};
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.iconHover};
    }
  }
`;

const NoImagesText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fonts.primary};

  ${media.mobile`
    font-size: 14px;
  `}
`;

// 명명된 함수로 PhotoGallery 컴포넌트 정의
const PhotoGalleryComponent = ({ title, imageList, onBackClick }) => {
  // ImageGallery에 맞게 이미지 배열을 변환 (description 제거)
  const galleryImages = imageList.map((image) => ({
    original: image.src, // 원본 이미지 (확대 시 표시)
    thumbnail: image.src, // 썸네일로 표시
    originalAlt: image.alt,
    thumbnailAlt: image.alt,
  }));

  if (!imageList.length) {
    return (
      <GalleryWrapper>
        <StyledTitle>{title}</StyledTitle>
        <NoImagesText>No images found</NoImagesText>
      </GalleryWrapper>
    );
  }

  return (
    <GalleryWrapper>
      {/* 오른쪽 상단에 아이콘 버튼 추가 */}
      <CloseButton onClick={onBackClick} aria-label="Close Gallery">
        <IoMdClose />
      </CloseButton>

      {/* 타이틀 */}
      <StyledTitle>{title}</StyledTitle>

      {/* 이미지 갤러리 */}
      <StyledImageGallery
        items={galleryImages}
        showThumbnails={true} // 썸네일을 보여줍니다.
        showFullscreenButton={true} // 전체 화면 보기 버튼을 보여줍니다.
        showPlayButton={false} // 슬라이드쇼 버튼을 숨깁니다.
        showBullets={false} // 이미지 하단 네비게이션 점 표시
        useBrowserFullscreen={true} // 브라우저 전체 화면 대신 모달 사용
        lazyLoad={true} // 이미지를 필요할 때 로드합니다.
        showNav={false} // 양옆 화살표를 숨깁니다
        additionalClass="photo-gallery" // 커스텀 클래스를 추가할 수 있습니다.
        renderItem={(item) => (
          <div>
            <img
              src={item.original}
              alt={item.originalAlt}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
        renderThumbInner={(item) => (
          <img src={item.thumbnail} alt={item.thumbnailAlt} />
        )}
      />
    </GalleryWrapper>
  );
};

// PropTypes 정의
PhotoGalleryComponent.propTypes = {
  title: PropTypes.string.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired, // 뒤로가기 버튼 클릭 시 실행될 함수
};

// React.memo로 최적화된 PhotoGallery 컴포넌트 생성
const PhotoGallery = React.memo(PhotoGalleryComponent);

// displayName 설정
PhotoGallery.displayName = 'PhotoGallery';

export default PhotoGallery;
