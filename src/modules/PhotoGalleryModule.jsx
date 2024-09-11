import { useState } from 'react';
import PhotoSlider from '../components/paegs/PhotoSlider.jsx';
import PhotoGallery from '../components/paegs/PhotoGallery.jsx';
import { getMemberName } from '../utils/memberHelper.jsx';

// 가로형 이미지 가져오기
const horizontalImages = import.meta.glob('../assets/images/cats/horizontal/*.jpg', {
    eager: true,
    query: { w: 800, format: 'webp' }
});

// 세로형 이미지 가져오기
const verticalImages = import.meta.glob('../assets/images/cats/vertical/*.jpg', {
    eager: true,
    query: { h: 800, format: 'webp' }
});

// 가로형 이미지를 배열로 변환
const horizontalImageList = Object.entries(horizontalImages).map(([path, module]) => ({
    src: module.default,
    alt: `Horizontal cat image from ${path.split('/').pop()}`,
    name: path.split('/').pop(),
}));

// 세로형 이미지를 배열로 변환
const verticalImageList = Object.entries(verticalImages).map(([path, module]) => ({
    src: module.default,
    alt: `Vertical cat image from ${path.split('/').pop()}`,
    name: path.split('/').pop(),
}));

// 전체 이미지 리스트 (가로형과 세로형을 합침)
const imageList = [...horizontalImageList, ...verticalImageList];
const imageOwnerIds = [3, 4, 1, 23, 5];

// 멤버 ID에 따른 커스텀 타이틀을 정의하는 함수
const getCustomTitle = (id) => {
    const memberName = getMemberName(id); // 멤버 이름 가져오기
    const customTitles = {
        1: `냥집사 대리인 '${memberName}' 님`,
    };

    // 커스텀 타이틀이 있으면 사용하고, 없으면 기본 타이틀을 반환
    return customTitles[id] || `냥집사 '${memberName}' 님`;
};

// 멤버의 ID를 기반으로 타이틀을 생성하는 함수
const getMemberTitles = (memberIds) => {
    return memberIds.map((id) => ({
        member_id: id,
        title: getCustomTitle(id), // 커스텀 타이틀 함수 호출
    }));
};

// PhotoGalleryModule: 슬라이더를 열고 닫는 로직을 제공하는 모듈
const PhotoGalleryModule = () => {
    const [galleries] = useState(getMemberTitles(imageOwnerIds));
    const [activeGalleries, setActiveGalleries] = useState([]);
    const [selectedGallery, setSelectedGallery] = useState(null);  // 선택된 갤러리 상태 추가

    const toggleSlider = (member_id) => {
        if (activeGalleries.includes(member_id)) {
            setActiveGalleries(activeGalleries.filter(id => id !== member_id));
        } else {
            setActiveGalleries([...activeGalleries, member_id]);
        }
    };

    const getFilteredImages = (member_id) => {
        return imageList.filter(image => image.name.startsWith(`${member_id}_`));
    };

    // 멤버 이름 클릭 시 갤러리로 이동
    const openGallery = (member_id) => {
        const selected = galleries.find(gallery => gallery.member_id === member_id);
        setSelectedGallery({
            title: selected.title,
            imageList: getFilteredImages(member_id),
        });
    };

    const closeGallery = () => {
        setSelectedGallery(null);
    };

    return (
        <>
            {selectedGallery ? (
                // 멤버 이름을 클릭한 후 PhotoGallery 컴포넌트를 보여줌
                <PhotoGallery
                    title={selectedGallery.title}
                    imageList={selectedGallery.imageList}
                    onBackClick={closeGallery}
                />
            ) : (
                // 기본 PhotoSlider 화면
                galleries.map((gallery) => (
                    <PhotoSlider
                        key={gallery.member_id}
                        title={gallery.title}
                        isExpanded={activeGalleries.includes(gallery.member_id)}
                        toggleSlider={() => toggleSlider(gallery.member_id)}
                        imageList={getFilteredImages(gallery.member_id)}
                        onGalleryClick={() => openGallery(gallery.member_id)}  // 이름 클릭 시 갤러리로 이동
                    />
                ))
            )}
        </>
    );
};

export default PhotoGalleryModule;
