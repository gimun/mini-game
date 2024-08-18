// src/pages/AdminPage.jsx
import React from 'react';
import useUpdateFields from '../hooks/useUpdateFields';
import UpdateForm from '../components/UpdateForm/UpdateForm.jsx';

const AdminPage = () => {
    const { updateFields, loading, error, success } = useUpdateFields();

    const handleUpdate = (updates) => {
        updateFields(updates);
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <UpdateForm onUpdate={handleUpdate} />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AdminPage;
