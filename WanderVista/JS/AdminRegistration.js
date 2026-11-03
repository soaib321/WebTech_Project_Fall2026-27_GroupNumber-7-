const field = (id) => document.getElementById(id);
const value = (id) => field(id).value.trim();

function showError(id, message) {
    field(id).textContent = message;
    return !message;
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return /^\+?[\d\s()-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}

function validateAdminForm() {
    const checks = [];
    checks.push(showError("NameError", value("AdminName").length >= 2 ? "" : "Enter your full name."));
    checks.push(showError("AdminIDError", /^ADM-\d{4}$/.test(value("AdminID")) ? "" : "Use the format ADM-1234."));
    checks.push(showError("EmailError", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("AdminEmail")) ? "" : "Enter a valid email address."));
    checks.push(showError("PhoneError", isValidPhone(value("AdminPhone")) ? "" : "Enter a valid phone number."));
    checks.push(showError("GenderError", document.querySelector('input[name="gender"]:checked') ? "" : "Select a gender."));
    checks.push(showError("RoleError", value("AdminRole") ? "" : "Select an admin role."));
    checks.push(showError("PermissionError", document.querySelector('input[name="permission"]:checked') ? "" : "Select at least one permission."));
    checks.push(showError("UserNameError", /^[A-Za-z0-9_]{4,15}$/.test(value("UserName")) ? "" : "Use 4-15 letters, numbers or underscores."));
    const password = field("Password").value;
    checks.push(showError("PasswordError", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) ? "" : "Use at least 8 characters with uppercase, lowercase and a number."));
    checks.push(showError("ConfirmError", password && password === field("ConfirmPassword").value ? "" : "Passwords do not match."));

    if (!checks.every(Boolean)) {
        showResult(false, "Please correct the highlighted fields.");
        return false;
    }

    showResult(true, "Your details are valid. Admin account approval is pending (demo only).");
    return false;
}

function showResult(success, message) {
    const result = field("ResultText");
    result.textContent = message;
    result.className = success ? "success" : "error";
}

function clearAllErrors() {
    document.querySelectorAll(".error").forEach((item) => item.textContent = "");
    field("ResultText").textContent = "";
    field("ResultText").className = "";
}
