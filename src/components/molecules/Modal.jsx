// src/components/molecules/Modal.jsx
import { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { media } from '../atoms/styles/media.js';

// 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.modalOverlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 항상 위에 표시되도록 설정 */
  transition: background-color 0.3s ease;

  /* 애니메이션 추가 (옵션) */
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

// 모달 콘텐츠 스타일
const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 40px 20px 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  ${media.mobile`
    width: 90%;
    max-width: 400px;
    padding: 50px 15px 15px;
  `}
`;

// 닫기 버튼 스타일
const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  padding: 5px;
  z-index: 10;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  ${media.mobile`
    font-size: 2.5rem;
  `}
`;

// 모달 컴포넌트
const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // 모달이 열릴 때 키보드 이벤트 리스너 추가
    document.addEventListener('keydown', handleKeyDown);

    // 클린업 함수: 모달이 닫힐 때 키보드 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalOverlay
      role="dialog"
      aria-modal="true"
      onClick={onClose} // 오버레이 클릭 시 모달 닫기
    >
      <ModalContent
        onClick={(e) => e.stopPropagation()} // 모달 콘텐츠 클릭 시 오버레이 클릭 방지
      >
        <CloseButton onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
