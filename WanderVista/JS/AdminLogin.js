function loginAccount() {
    const message = document.getElementById("LoginMessage");
    const username = document.getElementById("LoginUsername").value.trim();
    const password = document.getElementById("LoginPassword").value;
    message.className = "login-error";

    if (!username || !password) {
        message.textContent = "Enter your username and password.";
        return false;
    }

    message.className = "login-notice";
    message.textContent = "Your fields are valid. Login is unavailable until account verification is implemented.";
    return false;
}
