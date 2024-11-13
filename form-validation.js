const form = document.getElementById('sign-up-form');
const signUpFieldset = document.getElementById('sign-up-inputs');

const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phone-number');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const PHONE_NUMBER_REGEX = /^[0-9 .()+\-]+$/;

const MIN_PASSWORD_LENGTH = 8;
passwordInput.setAttribute('minlength', "8");
confirmPasswordInput.setAttribute('minlength', "8");

form.addEventListener('submit', (event) => {
    if (!isFormValid()) {
        event.preventDefault();
        if (!signUpFieldset.classList.contains('post-submit')) {
            signUpFieldset.classList.add('post-submit');
        }
    }
});

emailInput.addEventListener('input', (event) => {
    if (emailInput.validity.valid) {
        clearValidationMessage(emailInput);
    } else if (emailInput.validity.valueMissing) {
        setValidationMessage(emailInput, "Email address is required");
    } else {
        setValidationMessage(emailInput,
            "Please enter a valid email address");
    }
});

phoneNumberInput.addEventListener('input', (event) => {
    if (PHONE_NUMBER_REGEX.test(phoneNumberInput.value)) {
        clearValidationMessage(phoneNumberInput);
    } else {
        setValidationMessage(phoneNumberInput,
            "Enter a phone number: e.g. 800-555-1234");
    }
});

passwordInput.addEventListener('input', (event) => {
    if (passwordInput.validity.valid) {
        clearValidationMessage(passwordInput);
    } else if (passwordInput.validity.valueMissing) {
        setValidationMessage(passwordInput, "Password is required");
    } else if (passwordInput.validity.tooShort) {
        setValidationMessage(passwordInput,
            `Must be at least ${MIN_PASSWORD_LENGTH} characters long`)
    } else if (!passwordsMatch()) {
        setValidationMessage(passwordInput, "Passwords do not match");
    } else {
        setValidationMessage(passwordInput, "Invalid password");
    }
});

confirmPasswordInput.addEventListener('input', (event) => {
    if (confirmPasswordInput.validity.valueMissing) {
        setValidationMessage(confirmPasswordInput,
            "Please confirm your password");
    } else {
        clearValidationMessage(confirmPasswordInput);
    }
    
    if (passwordInput.validity.valid) {
        if (passwordsMatch()) {
            clearValidationMessage(passwordInput);
        } else {
            setValidationMessage(passwordInput, "Passwords do not match");
        }
    }
});

// Custom validation checkers

function isFormValid() {
    return form.checkValidity() && passwordsMatch();
}

function passwordsMatch() {
    return passwordInput.value == confirmPasswordInput.value;
}

// Validation message setters

function setValidationMessage(element, message) {
    let messageNode = element.parentNode.querySelector(".validation-message");
    messageNode.textContent = "* " + message;
}

function clearValidationMessage(element) {
    let messageNode = element.parentNode.querySelector(".validation-message");
    messageNode.textContent = "";
}