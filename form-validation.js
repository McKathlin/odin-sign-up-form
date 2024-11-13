const form = document.getElementById('sign-up-form');
const signUpFieldset = document.getElementById('sign-up-inputs');

const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phone-number');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const PHONE_NUMBER_REGEX = /^[0-9 .()+\-]+$/;

form.addEventListener('submit', (event) => {
    if (!isFormValid()) {
        event.preventDefault();
        if (!signUpFieldset.classList.contains('post-submit')) {
            signUpFieldset.classList.add('post-submit');
        }
    }
});

emailInput.addEventListener("input", (event) => {
    if (emailInput.validity.valid) {
        clearValidationMessage(emailInput);
    } else if (emailInput.validity.valueMissing) {
        setValidationMessage(emailInput, "Email address is required");
    } else {
        setValidationMessage(emailInput, "Please enter a valid email address");
    }
});

phoneNumberInput.addEventListener("input", (event) => {
    if (PHONE_NUMBER_REGEX.test(phoneNumberInput.value)) {
        clearValidationMessage(phoneNumberInput);
    } else {
        setValidationMessage(phoneNumberInput, "Enter a phone number: e.g. 800-555-1234");
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