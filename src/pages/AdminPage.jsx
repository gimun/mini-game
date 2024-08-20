// src/pages/AdminPage.jsx
import useUpdateFields from '../hooks/useUpdateFields';
import UpdateForm from '../components/UpdateForm/UpdateForm.jsx';
import styled from 'styled-components';

const AdminWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f4f4f4;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
`;

const Message = styled.p`
    font-size: 1rem;
    color: ${props => props.error ? 'red' : 'green'};
    margin-top: 15px;
`;

const LoadingMessage = styled.p`
    font-size: 1rem;
    color: #007bff;
    margin-top: 15px;
`;

const AdminPage = () => {
    const {updateFields, loading, error, success} = useUpdateFields();

    const handleUpdate = (updates) => {
        updateFields(updates);
    };

    return (
        <AdminWrapper>
            <Title>Admin Page</Title>
            <UpdateForm onUpdate={handleUpdate}/>
            {loading && <LoadingMessage>Loading...</LoadingMessage>}
            {error && <Message error>{error}</Message>}
            {success && <Message>{success}</Message>}
        </AdminWrapper>
    );
};

export default AdminPage;
