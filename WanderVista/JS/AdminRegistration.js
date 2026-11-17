document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        collect_data();
    });
    form.addEventListener("reset", clearAllErrors);
    document.getElementById("AdminRole").addEventListener("change", setAdminRolePermissions);
    setAdminRolePermissions();
});

const field = (id) => document.getElementById(id);
const value = (id) => field(id).value.trim();

function showError(id, message) {
    field(id).textContent = message;
    return message === "";
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return /^\+?[\d\s()-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}

function setAdminRolePermissions() {
    const rolePermissions = {
        "Super Admin": ["TourManagers", "HotelManagers", "Tourists", "Reports"],
        "Tour Operations Admin": ["TourManagers", "Tourists"],
        "Hotel & Booking Admin": ["HotelManagers", "Reports"]
    };
    const selectedPermissions = rolePermissions[value("AdminRole")] || [];

    document.querySelectorAll('input[name="permission"]').forEach((permission) => {
        permission.checked = selectedPermissions.includes(permission.value);
        permission.disabled = true;
    });
    showError("PermissionError", "");
}

function collect_data() {
    const validName = validateName();
    const validAdminID = validateAdminID();
    const validEmail = validateEmail();
    const validPhone = validatePhone();
    const validRole = validateRole();
    const validPermission = validatePermission();
    const validUsername = validateUsername();
    const validPassword = validatePassword();
    const validConfirmation = validatePasswordConfirmation();
    const isValid = validName && validAdminID && validEmail && validPhone && validRole &&
        validPermission && validUsername && validPassword && validConfirmation;

    if (!isValid) {
        showResult(false, "Please correct the highlighted fields.");
        return false;
    }

    field("Password").value = "";
    field("ConfirmPassword").value = "";
    showResult(true, "Registration successful. Details were validated only; no account or credentials were stored. Redirecting to admin login...");
    window.setTimeout(() => {
        window.location.href = "AdminLogin.html";
    }, 800);
    return true;
}

function validateName() {
    return showError("NameError", value("AdminName").length >= 2 ? "" : "Enter your full name.");
}

function validateAdminID() {
    return showError("AdminIDError", /^ADM-\d{4}$/.test(value("AdminID")) ? "" : "Use the format ADM-1234.");
}

function validateEmail() {
    return showError("EmailError", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("AdminEmail")) ? "" : "Enter a valid email address.");
}

function validatePhone() {
    return showError("PhoneError", isValidPhone(value("AdminPhone")) ? "" : "Enter a valid phone number.");
}

function validateRole() {
    return showError("RoleError", value("AdminRole") ? "" : "Select an admin role.");
}

function validatePermission() {
    const selectedPermission = document.querySelector('input[name="permission"]:checked');
    return showError("PermissionError", selectedPermission ? "" : "Select an admin role to assign access.");
}

function validateUsername() {
    return showError("UserNameError", /^[A-Za-z0-9_]{4,15}$/.test(value("UserName")) ? "" : "Use 4-15 letters, numbers or underscores.");
}

function validatePassword() {
    const password = field("Password").value;
    return showError("PasswordError", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) ? "" : "Use at least 8 characters with uppercase, lowercase and a number.");
}

function validatePasswordConfirmation() {
    const password = field("Password").value;
    const confirmation = field("ConfirmPassword").value;
    return showError("ConfirmError", password && password === confirmation ? "" : "Passwords do not match.");
}

function showResult(success, message) {
    const error = field("ResultError");
    const successMessage = field("ResultSuccess");
    error.textContent = "";
    successMessage.textContent = "";
    error.hidden = success;
    successMessage.hidden = !success;
    (success ? successMessage : error).textContent = message;
}

function clearAllErrors() {
    document.querySelectorAll('p[id$="Error"]').forEach((item) => {
        item.textContent = "";
    });
    field("ResultError").hidden = true;
    field("ResultSuccess").textContent = "";
    field("ResultSuccess").hidden = true;
    window.setTimeout(setAdminRolePermissions, 0);
}
