document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            collectData();
        });

        form.addEventListener("reset", clearAllErrors);
    }

    const roleField = document.getElementById("AdminRole");

    if (roleField) {
        roleField.addEventListener("change", setAdminRolePermissions);
        setAdminRolePermissions();
    }
});

function setAdminRolePermissions() {
    const role = document.getElementById("AdminRole").value;
    const permissions = document.querySelectorAll('input[name="permission"]');

    for (let i = 0; i < permissions.length; i++) {
        permissions[i].checked = false;
        permissions[i].disabled = true;

        if (role === "Super Admin") {
            permissions[i].checked = true;
        } else if (role === "Tour Operations Admin") {
            if (permissions[i].value === "TourManagers" || permissions[i].value === "Tourists") {
                permissions[i].checked = true;
            }
        } else if (role === "Hotel & Booking Admin") {
            if (permissions[i].value === "HotelManagers" || permissions[i].value === "Reports") {
                permissions[i].checked = true;
            }
        }
    }

    document.getElementById("PermissionError").innerHTML = "";
}

function collectData() {
    const nameIsValid = validateName();
    const idIsValid = validateAdminID();
    const emailIsValid = validateEmail();
    const phoneIsValid = validatePhone();
    const roleIsValid = validateRole();
    const permissionIsValid = validatePermission();
    const usernameIsValid = validateUsername();
    const passwordIsValid = validatePassword();
    const confirmationIsValid = validatePasswordConfirmation();

    if (!nameIsValid || !idIsValid || !emailIsValid || !phoneIsValid ||
        !roleIsValid || !permissionIsValid || !usernameIsValid ||
        !passwordIsValid || !confirmationIsValid) {
        showResult(false, "Please correct the highlighted fields.");
        return false;
    }

    document.getElementById("Password").value = "";
    document.getElementById("ConfirmPassword").value = "";

    showResult(true, "Registration successful. Details were validated only; no account or credentials were stored. Redirecting to admin login...");

    window.setTimeout(function () {
        window.location.href = "AdminLogin.html";
    }, 800);

    return true;
}

function validateName() {
    const name = document.getElementById("AdminName").value.trim();
    const error = document.getElementById("NameError");

    if (name.length < 2) {
        error.innerHTML = "Enter your full name.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validateAdminID() {
    const adminID = document.getElementById("AdminID").value.trim();
    const error = document.getElementById("AdminIDError");

    if (!/^ADM-\d{4}$/.test(adminID)) {
        error.innerHTML = "Use the format ADM-1234.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validateEmail() {
    const email = document.getElementById("AdminEmail").value.trim();
    const error = document.getElementById("EmailError");
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailFormat.test(email)) {
        error.innerHTML = "Enter a valid email address.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validatePhone() {
    const phone = document.getElementById("AdminPhone").value.trim();
    const error = document.getElementById("PhoneError");
    const containsOnlyDigits = /^\d+$/.test(phone);
    const hasElevenDigits = phone.length === 11;

    if (!containsOnlyDigits || !hasElevenDigits) {
        error.innerHTML = "Enter an 11-digit phone number.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validateRole() {
    const role = document.getElementById("AdminRole").value;
    const error = document.getElementById("RoleError");

    if (role === "") {
        error.innerHTML = "Select an admin role.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validatePermission() {
    const permission = document.querySelector('input[name="permission"]:checked');
    const error = document.getElementById("PermissionError");

    if (!permission) {
        error.innerHTML = "Select an admin role to assign access.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validateUsername() {
    const username = document.getElementById("UserName").value.trim();
    const error = document.getElementById("UserNameError");
    const usernameFormat = /^[A-Za-z0-9_]{4,15}$/;

    if (!usernameFormat.test(username)) {
        error.innerHTML = "Use 4-15 letters, numbers or underscores.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validatePassword() {
    const password = document.getElementById("Password").value;
    const error = document.getElementById("PasswordError");
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < 8 || !hasLowercase || !hasUppercase || !hasNumber) {
        error.innerHTML = "Use at least 8 characters with uppercase, lowercase and a number.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validatePasswordConfirmation() {
    const password = document.getElementById("Password").value;
    const confirmation = document.getElementById("ConfirmPassword").value;
    const error = document.getElementById("ConfirmError");

    if (password === "" || password !== confirmation) {
        error.innerHTML = "Passwords do not match.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function showResult(success, message) {
    const error = document.getElementById("ResultError");
    const successMessage = document.getElementById("ResultSuccess");

    error.innerHTML = "";
    successMessage.innerHTML = "";
    error.hidden = success;
    successMessage.hidden = !success;

    if (success) {
        successMessage.innerHTML = message;
    } else {
        error.innerHTML = message;
    }
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('p[id$="Error"]');

    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].innerHTML = "";
    }

    document.getElementById("ResultError").hidden = true;
    document.getElementById("ResultSuccess").innerHTML = "";
    document.getElementById("ResultSuccess").hidden = true;

    window.setTimeout(setAdminRolePermissions, 0);
}
