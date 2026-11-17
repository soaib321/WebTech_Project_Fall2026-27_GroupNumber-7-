document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const roleField = document.getElementById("AssignedRole");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            collectData();
        });
        form.addEventListener("reset", clearCreateUserForm);
    }

    if (roleField) {
        roleField.addEventListener("change", showRoleFields);
        showRoleFields();
    }
});

const roleFieldIds = ["TouristFields", "TourManagerFields", "HotelManagerFields"];
const roleErrorIds = [
    "TouristDestinationError", "TouristStyleError", "TouristBudgetError",
    "TMSpecializationError", "TMExperienceError", "TMLicenseError", "TMLanguageError", "TMMaxToursError",
    "HMHotelNameError", "HMAddressError", "HMStarsError", "HMRoomsError", "HMLicenseError", "HMFacilityError"
];

function showRoleFields() {
    for (let i = 0; i < roleFieldIds.length; i++) {
        document.getElementById(roleFieldIds[i]).hidden = true;
    }

    for (let i = 0; i < roleErrorIds.length; i++) {
        document.getElementById(roleErrorIds[i]).innerHTML = "";
    }

    const role = document.getElementById("AssignedRole").value;

    if (role === "Tourist") {
        document.getElementById("TouristFields").hidden = false;
    } else if (role === "Tour Manager") {
        document.getElementById("TourManagerFields").hidden = false;
    } else if (role === "Hotel Manager") {
        document.getElementById("HotelManagerFields").hidden = false;
    }

    document.getElementById("ResultError").innerHTML = "";
    document.getElementById("ResultError").hidden = true;
    document.getElementById("ResultSuccess").innerHTML = "";
    document.getElementById("ResultSuccess").hidden = true;
}

function checkField(isValid, errorId, message) {
    const error = document.getElementById(errorId);

    if (isValid) {
        error.innerHTML = "";
        return true;
    }

    error.innerHTML = message;
    return false;
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    const hasAllowedCharacters = /^\+?[\d\s()-]+$/.test(phone);
    return hasAllowedCharacters && digits.length >= 7 && digits.length <= 15;
}

function isChecked(name) {
    const choices = document.querySelectorAll('input[name="' + name + '"]');

    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            return true;
        }
    }

    return false;
}

function isNumberBetween(text, min, max) {
    const number = Number(text);
    return text !== "" && number % 1 === 0 && number >= min && number <= max;
}

function isPastOrToday(dateText) {
    if (!dateText) {
        return false;
    }

    const date = new Date(dateText + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(date.getTime()) || date > today) {
        return false;
    }

    return true;
}

function collectData() {
    const role = document.getElementById("AssignedRole").value;
    const validations = [
        validateName,
        validateEmail,
        validatePhone,
        validateGender,
        validateNationality,
        validateDateOfBirth,
        validateAddress,
        validateEmergencyContact,
        validateRole,
        validateUsername,
        validatePassword,
        validatePasswordConfirmation,
        validateAccountStatus,
        validateAccountNote,
        validateConfirmation
    ];

    if (role === "Tourist") {
        validations.push(validateTravelerDetails);
    } else if (role === "Tour Manager") {
        validations.push(validateTourManagerDetails);
    } else if (role === "Hotel Manager") {
        validations.push(validateHotelManagerDetails);
    }

    let allValid = true;

    for (let i = 0; i < validations.length; i++) {
        if (!validations[i]()) {
            allValid = false;
        }
    }

    const resultError = document.getElementById("ResultError");
    const resultSuccess = document.getElementById("ResultSuccess");

    if (!allValid) {
        resultError.hidden = false;
        resultError.innerHTML = "Please correct the highlighted fields.";
        return false;
    }

    let roleLabel = role;
    if (role === "Tourist") {
        roleLabel = "Traveler";
    }

    document.getElementById("TempPassword").value = "";
    document.getElementById("ConfirmTemp").value = "";
    resultError.innerHTML = "";
    resultError.hidden = true;
    resultSuccess.hidden = false;
    resultSuccess.innerHTML = "Details validated for a " + roleLabel + " account. No account or credentials were stored.";
    return true;
}

function validateName() {
    const name = document.getElementById("UserFullName").value.trim();
    return checkField(name.length >= 2, "NameError", "Enter the user's full name.");
}

function validateEmail() {
    const email = document.getElementById("UserEmail").value.trim();
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return checkField(emailFormat.test(email), "EmailError", "Enter a valid email address.");
}

function validatePhone() {
    const phone = document.getElementById("UserPhone").value.trim();
    return checkField(isValidPhone(phone), "PhoneError", "Enter a valid phone number.");
}

function validateGender() {
    return checkField(isChecked("UserGender"), "GenderError", "Select a gender.");
}

function validateNationality() {
    const nationality = document.getElementById("UserNationality").value;
    return checkField(nationality !== "", "NationalityError", "Select a nationality.");
}

function validateDateOfBirth() {
    const dateOfBirth = document.getElementById("UserDOB").value;
    const validDate = isPastOrToday(dateOfBirth);
    return checkField(validDate, "DOBError", "Enter a valid date of birth that is not in the future.");
}

function validateAddress() {
    const address = document.getElementById("UserAddress").value.trim();
    return checkField(address.length >= 5, "AddressError", "Enter a complete home address.");
}

function validateEmergencyContact() {
    const phone = document.getElementById("UserEmergency").value.trim();
    const validPhone = phone === "" || isValidPhone(phone);
    return checkField(validPhone, "EmergencyError", "Enter a valid emergency contact number.");
}

function validateRole() {
    const role = document.getElementById("AssignedRole").value;
    return checkField(role !== "", "RoleError", "Select an account type.");
}

function validateUsername() {
    const username = document.getElementById("NewUserName").value.trim();
    const usernameFormat = /^[A-Za-z0-9_]{4,15}$/;
    return checkField(usernameFormat.test(username), "UserNameError", "Use 4-15 letters, numbers, or underscores.");
}

function validatePassword() {
    const password = document.getElementById("TempPassword").value;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const validPassword = password.length >= 8 && hasLowercase && hasUppercase && hasNumber;
    return checkField(validPassword, "PasswordError", "Use 8+ characters with uppercase, lowercase, and a number.");
}

function validatePasswordConfirmation() {
    const password = document.getElementById("TempPassword").value;
    const confirmation = document.getElementById("ConfirmTemp").value;
    const passwordsMatch = password !== "" && password === confirmation;
    return checkField(passwordsMatch, "ConfirmError", "Passwords do not match.");
}

function validateAccountStatus() {
    const status = document.getElementById("AccountStatus").value;
    return checkField(status !== "", "StatusError", "Select an account status.");
}

function validateAccountNote() {
    const notes = document.getElementById("Notes").value.trim();
    return checkField(notes.length <= 200, "NotesError", "Keep the account note under 200 characters.");
}

function validateConfirmation() {
    const confirmation = document.getElementById("Confirm").checked;
    return checkField(confirmation, "ConfirmBoxError", "Confirm that the details are correct.");
}

function validateTravelerDetails() {
    let allValid = true;

    if (!checkField(document.getElementById("TouristDestination").value !== "", "TouristDestinationError", "Select a preferred destination.")) {
        allValid = false;
    }
    if (!checkField(isChecked("TouristStyle"), "TouristStyleError", "Select a travel style.")) {
        allValid = false;
    }
    if (!checkField(document.getElementById("TouristBudget").value !== "", "TouristBudgetError", "Select a typical travel budget.")) {
        allValid = false;
    }

    return allValid;
}

function validateTourManagerDetails() {
    let allValid = true;

    if (!checkField(document.getElementById("TMSpecialization").value !== "", "TMSpecializationError", "Select a tour specialization.")) {
        allValid = false;
    }
    if (!checkField(isNumberBetween(document.getElementById("TMExperience").value, 0, 50), "TMExperienceError", "Enter 0 to 50 years of experience.")) {
        allValid = false;
    }
    if (!checkField(document.getElementById("TMLicense").value.trim().length >= 4, "TMLicenseError", "Enter a valid license number.")) {
        allValid = false;
    }
    if (!checkField(isChecked("TMLanguage"), "TMLanguageError", "Select at least one language.")) {
        allValid = false;
    }
    if (!checkField(isNumberBetween(document.getElementById("TMMaxTours").value, 1, 20), "TMMaxToursError", "Enter a number from 1 to 20.")) {
        allValid = false;
    }

    return allValid;
}

function validateHotelManagerDetails() {
    let allValid = true;

    if (!checkField(document.getElementById("HMHotelName").value.trim().length >= 2, "HMHotelNameError", "Enter the hotel name.")) {
        allValid = false;
    }
    if (!checkField(document.getElementById("HMAddress").value.trim().length >= 5, "HMAddressError", "Enter the hotel's location.")) {
        allValid = false;
    }
    if (!checkField(document.getElementById("HMStars").value !== "", "HMStarsError", "Select the hotel's rating.")) {
        allValid = false;
    }
    if (!checkField(isNumberBetween(document.getElementById("HMRooms").value, 1, 500), "HMRoomsError", "Enter a room capacity from 1 to 500.")) {
        allValid = false;
    }
    if (!checkField(document.getElementById("HMLicense").value.trim().length >= 4, "HMLicenseError", "Enter the hotel's license number.")) {
        allValid = false;
    }
    if (!checkField(isChecked("HMFacility"), "HMFacilityError", "Select at least one facility.")) {
        allValid = false;
    }

    return allValid;
}

function clearCreateUserForm() {
    const errorMessages = document.querySelectorAll('p[id$="Error"]');

    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].innerHTML = "";
    }

    document.getElementById("ResultError").hidden = true;
    document.getElementById("ResultSuccess").innerHTML = "";
    document.getElementById("ResultSuccess").hidden = true;

    window.setTimeout(showRoleFields, 0);
}
