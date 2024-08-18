// src/components/UpdateForm/UpdateForm.jsx
import React from 'react';
import PropTypes from 'prop-types';
import useValidation from '../../hooks/useValidation.jsx';
import validateUpdateForm from '../../utils/validateUpdateForm.js';
import styled from 'styled-components';
import InputField from '../InputField';


// Styled Form Component
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: auto;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:disabled {
        background-color: #6c757d;
    }
`;

const UpdateForm = ({onUpdate}) => {
    const initialData = {
        id: '',
        role: '',
        totalScore: '',
    };

    const {
        formData,
        errors,
        handleChange,
        validateForm,
        setFormData
    } = useValidation(initialData, validateUpdateForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const {id, role, totalScore} = formData;
            const updates = [
                {
                    id,
                    fields: {
                        role,
                        total_score: parseInt(totalScore, 10),
                    }
                }
            ];
            onUpdate(updates);
            // 폼 제출 후 초기화
            setFormData(initialData);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputField
                name="id"
                value={formData.id}
                onChange={handleChange}
                label="Document ID:"
                required
                error={errors.id}
            />
            <InputField
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role:"
                error={errors.role}
            />
            <InputField
                name="totalScore"
                value={formData.totalScore}
                onChange={handleChange}
                label="Total Score:"
                type="number"
                required
                error={errors.totalScore}
            />
            <Button type="submit">Update</Button>
        </Form>
    );
};

// PropTypes validation
UpdateForm.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

export default UpdateForm;


