document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");

    form.addEventListener("submit", function (event) {
        // Limpar mensagens de erro
        clearErrors();

        // Realizar validação
        let isValid = validateForm();

        // Se o formulário não for válido, impedir o envio
        if (!isValid) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let isValid = true;

        // Validação do Nome
        const firstName = document.getElementById("first-name");
        if (firstName.value.trim() === "") {
            showError(firstName, "O campo Nome é obrigatório.");
            isValid = false;
        }

        // Validação do Sobrenome
        const lastName = document.getElementById("last-name");
        if (lastName.value.trim() === "") {
            showError(lastName, "O campo Sobrenome é obrigatório.");
            isValid = false;
        }

        // Validação do E-mail
        const email = document.getElementById("email");
        if (!validateEmail(email.value.trim())) {
            showError(email, "Por favor, insira um e-mail válido.");
            isValid = false;
        }

        // Validação da Senha
        const password = document.getElementById("password");
        if (password.value.length < 6) {
            showError(password, "A senha deve ter pelo menos 6 caracteres.");
            isValid = false;
        }

        // Validação da Confirmação de Senha
        const confirmPassword = document.getElementById("confirm-password");
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "As senhas não correspondem.");
            isValid = false;
        }

        // Validação do Telefone
        const phone = document.getElementById("phone");
        const phonePattern = /^[0-9]{10,11}$/; // Aceita telefones com 10 ou 11 dígitos
        if (!phonePattern.test(phone.value.trim())) {
            showError(phone, "Por favor, insira um telefone válido com 10 ou 11 dígitos.");
            isValid = false;
        }

        // Validação do CEP
        const zip = document.getElementById("zip");
        const zipPattern = /^[0-9]{8}$/; // Aceita apenas CEPs com 8 dígitos
        if (!zipPattern.test(zip.value.trim())) {
            showError(zip, "Por favor, insira um CEP válido com 8 dígitos.");
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = message;
        input.classList.add("error");
        input.parentNode.appendChild(error);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((error) => error.remove());

        const errorInputs = document.querySelectorAll(".error");
        errorInputs.forEach((input) => input.classList.remove("error"));
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
