import React, { useState } from 'react'

export default function useEmailValidation() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const emailRegex = /^\S+@\S+\.\S+$/;

    const validateEmail = (input) => {
        const testResult = emailRegex.test(input);
        setIsEmailValid(testResult);
        setEmail(input);
    }
    return [email, isEmailValid, validateEmail];
}
