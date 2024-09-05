import { useState } from 'react';
import PhotoGalleryUI from '../components/PhotoGalleryUI.jsx';
import { getMemberName } from '../utils/memberHelper.js';

// 가로형 이미지 가져오기
const horizontalImages = import.meta.glob('../images/cats/horizontal/*.jpg', {
    eager: true,
    query: { w: 800, format: 'webp' }
});

// 세로형 이미지 가져오기
const verticalImages = import.meta.glob('../images/cats/vertical/*.jpg', {
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

// 멤버의 ID를 기반으로 타이틀을 생성하는 함수
const getMemberTitles = (memberIds) => {
    return memberIds.map((id) => ({
        member_id: id,
        title: `냥집사 '${getMemberName(id)}' 님`,
    }));
};

// PhotoGalleryModule: 슬라이더를 열고 닫는 로직을 제공하는 모듈
const PhotoGalleryModule = () => {
    // member_id 목록에 따라 타이틀을 생성
    const [galleries] = useState(getMemberTitles([3, 4])); // 멤버 ID를 전달하여 타이틀 생성

    const [activeGalleries, setActiveGalleries] = useState([]);

    // 슬라이더 토글 핸들러 (여러 개를 동시에 열 수 있도록 설정)
    const toggleSlider = (member_id) => {
        if (activeGalleries.includes(member_id)) {
            // 이미 열려 있으면 닫기 (배열에서 해당 member_id 제거)
            setActiveGalleries(activeGalleries.filter(id => id !== member_id));
        } else {
            // 열리지 않은 경우 추가 (배열에 member_id 추가)
            setActiveGalleries([...activeGalleries, member_id]);
        }
    };

    // 특정 member_id에 해당하는 이미지 리스트 필터링
    const getFilteredImages = (member_id) => {
        return imageList.filter(image => image.name.startsWith(`${member_id}_`)); // member_id로 시작하는 이미지 필터링
    };

    return (
        <>
            {galleries.map((gallery) => (
                <PhotoGalleryUI
                    key={gallery.member_id}
                    title={gallery.title}
                    isExpanded={activeGalleries.includes(gallery.member_id)} // 활성화된 갤러리만 열림
                    toggleSlider={() => toggleSlider(gallery.member_id)}
                    imageList={getFilteredImages(gallery.member_id)} // 필터링된 이미지 리스트 전달
                />
            ))}
        </>
    );
};

export default PhotoGalleryModule;
