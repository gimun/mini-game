// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // 로딩 상태를 표시
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
