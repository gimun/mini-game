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
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto;
    position: relative; // 엑스 버튼의 절대 위치를 위해 relative 추가
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 10px;
    right: 10px;  // 모달의 오른쪽 모서리와 가깝게 설정
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
