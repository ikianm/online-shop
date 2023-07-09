import React, { useState } from 'react'

export default function usePasswordValidation() {
    const [password, setPassword] = useState('');
    const [isPassValid, setIsPassValid] = useState(false);

    const validatePassword = (input) => {
        const testResult = input.length >= 8;
        setIsPassValid(testResult);
        setPassword(input);
    };
    return [password, isPassValid, validatePassword];

}
