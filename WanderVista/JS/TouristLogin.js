function loginAccount(role) {
    const message = document.getElementById("LoginMessage");
    const username = document.getElementById("LoginUsername").value.trim();
    const password = document.getElementById("LoginPassword").value;
    message.className = "error";

    if (role !== "Tourist") {
        message.textContent = "This page can only sign in a tourist account.";
        return false;
    }
    if (!username || !password) {
        message.textContent = "Enter your username and password.";
        return false;
    }

    try {
        const accounts = JSON.parse(localStorage.getItem("wandervista-tourist-accounts") || "[]");
        if (!Array.isArray(accounts)) {
            throw new Error("Stored account data is invalid.");
        }
        const account = accounts.find((item) =>
            item.username.toLowerCase() === username.toLowerCase() && item.password === password
        );
        if (!account) {
            message.textContent = "Tourist account not found. Check your credentials or register first.";
            return false;
        }
        message.className = "success";
        message.textContent = `Login successful. Welcome, ${account.name}.`;
    } catch (error) {
        message.textContent = "Could not read account data from browser storage. Check that storage is enabled and try again.";
    }
    return false;
}
