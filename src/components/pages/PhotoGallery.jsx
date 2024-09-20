import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io'; // 새로운 아이콘 가져오기
import { DarkModeStyle } from '../atoms/styles/Typography.jsx';

// styled-components로 스타일 정의
const GalleryWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 10px;
  position: relative;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  color: #607d8b;
  text-align: center;
  margin-bottom: 20px;

  ${DarkModeStyle}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #607d8b;
  padding: 0;

  &:hover {
    color: #455a64;
  }

  ${DarkModeStyle}
`;

const PhotoGallery = ({ title, imageList, onBackClick }) => {
  // ImageGallery에 맞게 이미지 배열을 변환 (description 제거)
  const galleryImages = imageList.map((image) => ({
    original: image.src, // 원본 이미지 (확대 시 표시)
    thumbnail: image.src, // 썸네일로 표시
  }));

  return (
    <GalleryWrapper>
      {/* 오른쪽 상단에 아이콘 버튼 추가 */}
      <CloseButton onClick={onBackClick}>
        <IoMdClose />
      </CloseButton>

      {/* 타이틀 */}
      <StyledTitle>{title}</StyledTitle>

      {/* 이미지 갤러리 */}
      <ImageGallery
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
              alt=""
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
      />
    </GalleryWrapper>
  );
};

// PropTypes 정의
PhotoGallery.propTypes = {
  title: PropTypes.string.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired, // 뒤로가기 버튼 클릭 시 실행될 함수
};

export default PhotoGallery;
