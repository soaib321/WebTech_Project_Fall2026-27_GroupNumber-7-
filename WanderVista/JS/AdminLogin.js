function loginAccount() {
    const message = document.getElementById("LoginMessage");
    const username = document.getElementById("LoginUsername").value.trim();
    const password = document.getElementById("LoginPassword").value;
    message.className = "error";

    if (!/^[A-Za-z0-9_]{4,15}$/.test(username)) {
        message.textContent = "Use 4-15 letters, numbers or underscores for your username.";
        return false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        message.textContent = "Use at least 8 characters with uppercase, lowercase and a number.";
        return false;
    }

    message.className = "notice";
    message.textContent = "Username and password formats are valid.";
    return false;
}

function clearLoginMessage() {
    const message = document.getElementById("LoginMessage");
    message.textContent = "";
    message.className = "error";
}
