// src/utils/validateUpdateForm.js
const validateUpdateForm = (data) => {
    const errors = {};

    if (!data.id) errors.id = 'ID is required.';
    if (!data.role) errors.role = 'Role is required.';
    if (!data.totalScore) errors.totalScore = 'Total Score is required.';
    else if (isNaN(data.totalScore)) errors.totalScore = 'Total Score must be a number.';

    return errors;
};

export default validateUpdateForm;
