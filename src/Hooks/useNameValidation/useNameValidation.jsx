import React, { useState } from 'react';

export default function useNameValidation() {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);

    const validateName = (input) => {
        const testResult = input.length >= 6;
        setIsNameValid(testResult);
        setName(input);
    };

    return [name, isNameValid, validateName];
}
