function loginAccount() {
    const message = document.getElementById("LoginMessage");
    const username = document.getElementById("LoginUsername").value.trim();
    const password = document.getElementById("LoginPassword").value;
    message.className = "error";

    if (!username || !password) {
        message.textContent = "Enter both your username and password.";
        return false;
    }

    let registeredCredentials;
    try {
        const savedCredentials = localStorage.getItem("wanderVistaAdminCredentials");
        registeredCredentials = savedCredentials ? JSON.parse(savedCredentials) : null;
    } catch (error) {
        message.textContent = "Saved admin account data could not be read. Please register again.";
        return false;
    }

    const isDemoAdmin = username === "admin" && password === "admin123";
    const isRegisteredAdmin = registeredCredentials &&
        username === registeredCredentials.username &&
        password === registeredCredentials.password;

    if (!isDemoAdmin && !isRegisteredAdmin) {
        message.textContent = "Incorrect username or password.";
        return false;
    }

    message.className = "notice";
    message.textContent = "Login successful. Opening user management...";
    window.setTimeout(() => {
        window.location.href = "AdminCreateUser.html";
    }, 500);
    return false;
}

function clearLoginMessage() {
    const message = document.getElementById("LoginMessage");
    message.textContent = "";
    message.className = "error";
    document.getElementById("ShowPassword").checked = false;
    document.getElementById("LoginPassword").type = "password";
}

function togglePasswordVisibility() {
    const password = document.getElementById("LoginPassword");
    const showPassword = document.getElementById("ShowPassword").checked;
    password.type = showPassword ? "text" : "password";
}
