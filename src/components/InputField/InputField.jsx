// src/components/InputField/InputField.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledInput = styled.input`
    margin-left: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const StyledLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
    margin: 0;
`;

const InputField = ({name, value, onChange, label, type = 'text', required = false, error}) => (
    <div>
        <StyledLabel>
            {label}
            <StyledInput
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </StyledLabel>
        {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
);

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string
};

export default InputField;
