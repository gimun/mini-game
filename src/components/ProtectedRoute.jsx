// src/components/ProtectedRoute.jsx
import {useAuth} from '../contexts/AuthContext';

const ProtectedRoute = ({element, onShowLogin}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        // 사용자가 인증되지 않은 경우 로그인 모달을 표시
        onShowLogin();
        return null; // 아무것도 렌더링하지 않음
    }

    return element;
};

export default ProtectedRoute;
