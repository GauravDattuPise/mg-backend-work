const validateNameRegex = /^[a-zA-Z\s]+$/;
const validateEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validatePhoneRegex = /^\d{10}$/;

const validateName = (name) => {
    return validateNameRegex.test(name);
}

const validateEmail = (email) => {
    return validateEmailRegex.test(email);
}

const validatePhone = (phone) => {
    return validatePhoneRegex.test(phone);
}

module.exports = { validateEmail, validateName, validatePhone };
