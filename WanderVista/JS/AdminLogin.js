document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        collect_data();
    });
    form.addEventListener("reset", clearLoginMessage);
    document.getElementById("ShowPassword").addEventListener("change", togglePasswordVisibility);
});

function collect_data() {
    document.getElementById("LoginMessage").textContent = "";
    const validUsername = validateUsername();
    const validPassword = validatePassword();

    if (!validUsername || !validPassword) {
        return false;
    }
    return loginAccount();
}

function validateUsername() {
    const username = document.getElementById("LoginUsername").value.trim();
    const error = document.getElementById("UsernameError");
    error.textContent = username ? "" : "Enter your username.";
    return username !== "";
}

function validatePassword() {
    const password = document.getElementById("LoginPassword").value;
    const error = document.getElementById("PasswordError");
    error.textContent = password ? "" : "Enter your password.";
    return password !== "";
}

function loginAccount() {
    const message = document.getElementById("LoginMessage");
    const username = document.getElementById("LoginUsername").value.trim();
    const password = document.getElementById("LoginPassword").value;
    message.className = "error";

    if (username !== "admin" || password !== "admin123") {
        message.textContent = "Incorrect username or password. New admin accounts require secure server-side authentication.";
        return false;
    }

    message.className = "notice";
    message.textContent = "Login successful. Opening user management...";
    window.setTimeout(() => {
        window.location.href = "AdminCreateUser.html";
    }, 500);
    return true;
}

function clearLoginMessage() {
    const message = document.getElementById("LoginMessage");
    message.textContent = "";
    message.className = "error";
    document.getElementById("UsernameError").textContent = "";
    document.getElementById("PasswordError").textContent = "";
    document.getElementById("ShowPassword").checked = false;
    document.getElementById("LoginPassword").type = "password";
}

function togglePasswordVisibility() {
    const password = document.getElementById("LoginPassword");
    const showPassword = document.getElementById("ShowPassword").checked;
    password.type = showPassword ? "text" : "password";
}
