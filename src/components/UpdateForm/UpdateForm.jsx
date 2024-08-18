// src/components/UpdateForm/UpdateForm.jsx
import React from 'react';
import PropTypes from 'prop-types';
import useValidation from '../../hooks/useValidation.jsx';
import validateUpdateForm from '../../utils/validateUpdateForm.js';
import styled from 'styled-components';
import InputField from '../InputField';

const FormWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
`;

const UpdateForm = ({ onUpdate }) => {
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
            const { id, role, totalScore } = formData;
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
        <FormWrapper>
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
        </FormWrapper>
    );
};

// PropTypes validation
UpdateForm.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

export default UpdateForm;
