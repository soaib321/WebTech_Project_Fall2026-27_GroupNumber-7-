const accountStorageKey = "wandervista-tourist-accounts";
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

function collectProfile(form) {
    const profile = {};
    for (const control of form.elements) {
        const key = control.name || control.id;
        if (!key || control.type === "password" || control.type === "file" ||
            ["submit", "reset", "button"].includes(control.type) ||
            (["radio", "checkbox"].includes(control.type) && !control.checked)) {
            continue;
        }
        if (Object.hasOwn(profile, key)) {
            profile[key] = Array.isArray(profile[key]) ? [...profile[key], control.value] : [profile[key], control.value];
        } else {
            profile[key] = control.value;
        }
    }
    return profile;
}

function validateTouristForm() {
    const checks = [];
    checks.push(showError("NameError", value("TouristName").length >= 2 ? "" : "Enter your full name."));
    const age = Number(value("TouristAge"));
    checks.push(showError("AgeError", Number.isInteger(age) && age >= 1 && age <= 120 ? "" : "Enter an age from 1 to 120."));
    checks.push(showError("EmailError", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("TouristEmail")) ? "" : "Enter a valid email address."));
    checks.push(showError("PhoneError", isValidPhone(value("TouristPhone")) ? "" : "Enter a valid phone number."));
    checks.push(showError("GenderError", document.querySelector('input[name="gender"]:checked') ? "" : "Select a gender."));
    checks.push(showError("DestinationError", value("Destination") ? "" : "Select a preferred destination."));
    checks.push(showError("AddressError", value("Address").length >= 10 ? "" : "Address must be at least 10 characters."));
    checks.push(showError("NationalityError", value("Nationality") ? "" : "Select a nationality."));
    checks.push(showError("InterestError", document.querySelector('input[name="interest"]:checked') ? "" : "Select at least one travel interest."));

    const emergencyPhone = value("EmergencyPhone");
    const phoneValid = isValidPhone(emergencyPhone);
    const samePhone = emergencyPhone.replace(/\D/g, "") === value("TouristPhone").replace(/\D/g, "");
    checks.push(showError("EmergencyError", !phoneValid ? "Enter a valid emergency contact number." : samePhone ? "Emergency contact must differ from your phone." : ""));

    const file = field("TravelDocument").files[0];
    const allowedFile = !file || (/\.(pdf|jpe?g|png)$/i.test(file.name) && file.size <= 2 * 1024 * 1024);
    checks.push(showError("FileError", allowedFile ? "" : "Choose a PDF, JPG or PNG file up to 2 MB."));
    checks.push(showError("UserNameError", /^[A-Za-z0-9_]{4,15}$/.test(value("UserName")) ? "" : "Use 4-15 letters, numbers or underscores."));
    const password = field("Password").value;
    checks.push(showError("PasswordError", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) ? "" : "Use at least 8 characters with uppercase, lowercase and a number."));
    checks.push(showError("ConfirmError", password && password === field("ConfirmPassword").value ? "" : "Passwords do not match."));

    if (!checks.every(Boolean)) {
        showResult(false, "Please correct the highlighted fields.");
        return false;
    }
    return saveTouristAccount();
}

function saveTouristAccount() {
    try {
        const accounts = JSON.parse(localStorage.getItem(accountStorageKey) || "[]");
        if (!Array.isArray(accounts)) {
            throw new Error("Stored account data is invalid.");
        }
        const username = value("UserName");
        if (accounts.some((account) => account.username.toLowerCase() === username.toLowerCase())) {
            showError("UserNameError", "That username is already registered for this role.");
            showResult(false, "Please choose a different username.");
            return false;
        }
        const profile = collectProfile(field("submit").form);
        accounts.push({ username, password: field("Password").value, name: value("TouristName"), profile });
        localStorage.setItem(accountStorageKey, JSON.stringify(accounts));
        showResult(true, `Tourist ${value("TouristName")} registered successfully.`);
        field("LoginAfterRegister").style.display = "inline-block";
        return false;
    } catch (error) {
        showResult(false, "Could not save this account in browser storage. Check that storage is enabled and try again.");
        return false;
    }
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
    field("LoginAfterRegister").style.display = "none";
}
