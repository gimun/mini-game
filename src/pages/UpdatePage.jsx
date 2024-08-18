// src/pages/UpdatePage.jsx
import React from 'react';
import UpdateForm from '../components/UpdateForm/UpdateForm.jsx';
import {getFirestore, writeBatch, doc} from 'firebase/firestore';
import {COLLECTIONS} from '../constants/Keys.js';

const UpdateFieldsInBatch = async (updates) => {
    const db = getFirestore();
    const batch = writeBatch(db);

    updates.forEach(({id, fields}) => {
        const docRef = doc(db, COLLECTIONS.MEMBER, id);
        batch.update(docRef, fields);
    });

    try {
        await batch.commit();
        console.log('Batch update successful');
    } catch (error) {
        console.error('Error updating documents: ', error);
    }
};

const UpdatePage = () => {
    const handleUpdate = async (updates) => {
        try {
            await UpdateFieldsInBatch(updates);
            alert('Update successful'); // 사용자에게 성공 메시지
        } catch (error) {
            alert('Update failed'); // 사용자에게 실패 메시지
        }
    };

    return (
        <div>
            <h1>Update Firestore Fields in Batch</h1>
            <UpdateForm onUpdate={handleUpdate} />
        </div>
    );
};

export default UpdatePage;
