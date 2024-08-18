// src/hooks/useUpdateFields.js
import {useState} from 'react';
import {getFunctions, httpsCallable} from 'firebase/functions';
import {getApp} from 'firebase/app';

const useUpdateFields = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const updateFields = async (updates) => {
        const app = getApp(); // Firebase App 인스턴스 가져오기
        //const functions = getFunctions(app, 'us-central1');
        const functions = getFunctions(app, 'asia-northeast3');
        const updateUserFields = httpsCallable(functions, 'updateUserFields');

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await updateUserFields({updates});
            console.log('Batch update successful:', result.data);
            setSuccess('Batch update successful!');
        } catch (error) {
            console.error('Error updating documents:', error);
            setError('Error updating documents.');
        } finally {
            setLoading(false);
        }
    };

    return {
        updateFields,
        loading,
        error,
        success,
    };
};

export default useUpdateFields;
