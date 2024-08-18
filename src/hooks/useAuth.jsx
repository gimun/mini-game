// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // 사용자가 인증되었는지 여부 설정
            setLoading(false); // 로딩 완료
        });

        return () => unsubscribe(); // 언마운트 시 구독 해제
    }, []);

    return { isAuthenticated, loading };
};

export default useAuth;
