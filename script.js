document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const phone = document.getElementById("phone");
    const zip = document.getElementById("zip");

    firstName.addEventListener("input", () => validateField(firstName, "O campo Nome é obrigatório."));
    lastName.addEventListener("input", () => validateField(lastName, "O campo Sobrenome é obrigatório."));
    email.addEventListener("input", () => validateEmailField(email));
    password.addEventListener("input", () => validatePasswordField(password));
    confirmPassword.addEventListener("input", () => validateConfirmPasswordField(confirmPassword, password));
    phone.addEventListener("input", () => validatePhoneField(phone));
    zip.addEventListener("input", () => validateZipField(zip));

    form.addEventListener("submit", function (event) {
        clearErrors();
        let isValid = validateForm();
        if (!isValid) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let isValid = true;
        isValid = validateField(firstName, "O campo Nome é obrigatório.") && isValid;
        isValid = validateField(lastName, "O campo Sobrenome é obrigatório.") && isValid;
        isValid = validateEmailField(email) && isValid;
        isValid = validatePasswordField(password) && isValid;
        isValid = validateConfirmPasswordField(confirmPassword, password) && isValid;
        isValid = validatePhoneField(phone) && isValid;
        isValid = validateZipField(zip) && isValid;

        const courses = document.querySelectorAll('input[name="course"]:checked');
        if (courses.length === 0) {
            alert('Por favor, selecione pelo menos um curso.');
            isValid = false;
        }

        return isValid;
    }

    function validateField(field, errorMessage) {
        if (field.value.trim() === "") {
            showError(field, errorMessage);
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    function validateEmailField(field) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
            showError(field, "Por favor, insira um e-mail válido.");
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    function validatePasswordField(field) {
        if (field.value.length < 6) {
            showError(field, "A senha deve ter pelo menos 6 caracteres.");
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    function validateConfirmPasswordField(confirmField, passwordField) {
        if (confirmField.value !== passwordField.value) {
            showError(confirmField, "As senhas não correspondem.");
            return false;
        } else {
            clearError(confirmField);
            return true;
        }
    }

    function validatePhoneField(field) {
        const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!phonePattern.test(field.value.trim())) {
            showError(field, "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.");
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    function validateZipField(field) {
        const zipPattern = /^\d{5}-\d{3}$/;
        if (!zipPattern.test(field.value.trim())) {
            showError(field, "Por favor, insira um CEP válido no formato XXXXX-XXX.");
            return false;
        } else {
            clearError(field);
            return true;
        }
    }

    function showError(input, message) {
        clearError(input);
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = message;
        input.classList.add("error");
        input.parentNode.appendChild(error);
    }

    function clearError(input) {
        const error = input.parentNode.querySelector(".error-message");
        if (error) {
            error.remove();
        }
        input.classList.remove("error");
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((error) => error.remove());

        const errorInputs = document.querySelectorAll(".error");
        errorInputs.forEach((input) => input.classList.remove("error"));
    }
});

document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
