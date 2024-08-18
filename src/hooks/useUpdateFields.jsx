// src/hooks/useUpdateFields.js
import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const useUpdateFields = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const updateFields = async (updates) => {
        const functions = getFunctions();
        const updateUserFields = httpsCallable(functions, 'updateUserFields');

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await updateUserFields({ updates });
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
