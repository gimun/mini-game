// src/hooks/useValidation.jsx
import {useState} from 'react';

const useValidation = (initialData, validateForm) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return {
        formData,
        errors,
        handleChange,
        validateForm: validate,
        setFormData
    };
};

export default useValidation;
