console.log("TouristLogin.js Connected");
function showError(message) {
    let loginMessage = document.getElementById("LoginMessage");
    loginMessage.className = "error";
    loginMessage.textContent = message;
}

function showSuccess(message) {
    let loginMessage = document.getElementById("LoginMessage");
    loginMessage.className = "success";
    loginMessage.textContent = message;
}

function validateUsername(username) {
    return username !== "";
}

function validatePassword(password) {
    return password !== "";
}

function loginAccount(role) {

    let username = document.getElementById("LoginUsername").value.trim();
    let password = document.getElementById("LoginPassword").value;

    let validUsername = validateUsername(username);
    let validPassword = validatePassword(password);

    if (role !== "Tourist") {
        showError("This page is only for tourists.");
        return false;
    }

    if (!validUsername || !validPassword) {
        showError("Enter your username and password.");
        return false;
    }

    let accounts = JSON.parse(
        localStorage.getItem("wandervista-tourist-accounts") || "[]"
    );

    let account = null;

    for (let i = 0; i < accounts.length; i++) {

        if (
            accounts[i].username.toLowerCase() === username.toLowerCase() &&
            accounts[i].password === password
        ) {
            account = accounts[i];
            break;
        }
    }

    if (account === null) {
        showError("Invalid username or password.");
    }
    else {
        showSuccess("Login successful. Welcome, " + account.name + "!");

        sessionStorage.setItem("wandervista-tourist-username", account.username);

        setTimeout(function() {
            window.location.href = "TouristDashboard.html";
        }, 800);
    }

    return false;
}

function clearLoginMessage() {

    let loginMessage = document.getElementById("LoginMessage");

    loginMessage.textContent = "";
    loginMessage.className = "";
}
