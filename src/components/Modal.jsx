// src/components/Modal.jsx
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px; // 모달 최대 크기 설정
    max-height: 80%;  // 모달 높이 제한
    overflow-y: auto; // 내용이 넘치면 스크롤
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
`;

const Modal = ({ children, onClose }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
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
