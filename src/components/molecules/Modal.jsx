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
    padding-top: 40px; /* 상단에 닫기 버튼과의 여백 추가 */
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto;
    position: relative; /* 엑스 버튼의 절대 위치를 위해 relative 추가 */
    color: black;

    @media (prefers-color-scheme: dark) {
        background-color: #333;
        color: white;
    }

    @media (max-width: 600px) {
        width: 90%;  /* 너비를 90%로 설정 */
        max-width: 400px; /* 최대 너비를 400px로 제한 */
        padding: 15px;
        padding-top: 50px; /* 모바일에서 더 많은 상단 여백 */
    }
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 2rem;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    padding: 5px;
    z-index: 10; /* 닫기 버튼이 항상 앞에 표시되도록 설정 */
    color: black;

    @media (prefers-color-scheme: dark) {
        color: white;
    }

    @media (max-width: 600px) {
        font-size: 2.5rem; /* 모바일에서 닫기 버튼 크기 증가 */
    }
`;

const Modal = ({children, onClose}) => {
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
