document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const showPasswordBox = document.getElementById("ShowPassword");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        checkLoginForm();
    });

    form.addEventListener("reset", resetLoginForm);

    if (showPasswordBox) {
        showPasswordBox.addEventListener("change", togglePasswordVisibility);
    }
});

function checkLoginForm() {
    clearLoginMessage();

    const usernameIsValid = validateUsername();
    const passwordIsValid = validatePassword();

    if (!usernameIsValid || !passwordIsValid) {
        return false;
    }

    return loginAdmin();
}

function validateUsername() {
    const username = document.getElementById("LoginUsername").value.trim();
    const errorBox = document.getElementById("UsernameError");

    if (username === "") {
        errorBox.textContent = "Enter your username.";
        return false;
    }

    errorBox.textContent = "";
    return true;
}

function validatePassword() {
    const password = document.getElementById("LoginPassword").value;
    const errorBox = document.getElementById("PasswordError");

    if (password === "") {
        errorBox.textContent = "Enter your password.";
        return false;
    }

    errorBox.textContent = "";
    return true;
}

function loginAdmin() {
    const errorBox = document.getElementById("LoginError");
    const successBox = document.getElementById("LoginSuccess");
    const username = document.getElementById("LoginUsername").value.trim();
    const password = document.getElementById("LoginPassword").value;

    errorBox.hidden = true;
    successBox.hidden = true;
    errorBox.textContent = "";
    successBox.textContent = "";

    if (username !== "admin" || password !== "admin123") {
        errorBox.textContent = "Incorrect username or password. New admin accounts require secure server-side authentication.";
        errorBox.hidden = false;
        return false;
    }

    successBox.textContent = "Login successful. Opening user management...";
    successBox.hidden = false;

    window.setTimeout(function () {
        window.location.href = "AdminCreateUser.html";
    }, 500);

    return true;
}

function clearLoginMessage() {
    const errorBox = document.getElementById("LoginError");
    const successBox = document.getElementById("LoginSuccess");
    const usernameError = document.getElementById("UsernameError");
    const passwordError = document.getElementById("PasswordError");
    const passwordField = document.getElementById("LoginPassword");
    const showPasswordBox = document.getElementById("ShowPassword");

    if (errorBox) {
        errorBox.textContent = "";
        errorBox.hidden = true;
    }

    if (successBox) {
        successBox.textContent = "";
        successBox.hidden = true;
    }

    if (usernameError) {
        usernameError.textContent = "";
    }

    if (passwordError) {
        passwordError.textContent = "";
    }

    if (showPasswordBox) {
        showPasswordBox.checked = false;
    }

    if (passwordField) {
        passwordField.type = "password";
    }
}

function resetLoginForm() {
    clearLoginMessage();
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById("LoginPassword");
    const showPasswordBox = document.getElementById("ShowPassword");

    if (!passwordField || !showPasswordBox) {
        return;
    }

    if (showPasswordBox.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}
