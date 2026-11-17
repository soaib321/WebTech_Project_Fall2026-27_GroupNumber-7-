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
        document.getElementById(roleErrorIds[i]).textContent = "";
    }

    const role = document.getElementById("AssignedRole").value;

    if (role === "Tourist") {
        document.getElementById("TouristFields").hidden = false;
    } else if (role === "Tour Manager") {
        document.getElementById("TourManagerFields").hidden = false;
    } else if (role === "Hotel Manager") {
        document.getElementById("HotelManagerFields").hidden = false;
    }

    document.getElementById("ResultError").textContent = "";
    document.getElementById("ResultError").hidden = true;
    document.getElementById("ResultSuccess").textContent = "";
    document.getElementById("ResultSuccess").hidden = true;
}

function setUserError(id, message) {
    document.getElementById(id).textContent = message;
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    const hasAllowedCharacters = /^\+?[\d\s()-]+$/.test(phone);

    if (!hasAllowedCharacters || digits.length < 7 || digits.length > 15) {
        return false;
    }

    return true;
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

    if (text === "" || number % 1 !== 0 || number < min || number > max) {
        return false;
    }

    return true;
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
    let allValid = true;

    if (!validateName()) {
        allValid = false;
    }
    if (!validateEmail()) {
        allValid = false;
    }
    if (!validatePhone()) {
        allValid = false;
    }
    if (!validateGender()) {
        allValid = false;
    }
    if (!validateNationality()) {
        allValid = false;
    }
    if (!validateDateOfBirth()) {
        allValid = false;
    }
    if (!validateAddress()) {
        allValid = false;
    }
    if (!validateEmergencyContact()) {
        allValid = false;
    }
    if (!validateRole()) {
        allValid = false;
    }
    if (!validateUsername()) {
        allValid = false;
    }
    if (!validatePassword()) {
        allValid = false;
    }
    if (!validatePasswordConfirmation()) {
        allValid = false;
    }
    if (!validateAccountStatus()) {
        allValid = false;
    }
    if (!validateAccountNote()) {
        allValid = false;
    }
    if (!validateConfirmation()) {
        allValid = false;
    }

    if (role === "Tourist") {
        if (!validateTravelerDetails()) {
            allValid = false;
        }
    } else if (role === "Tour Manager") {
        if (!validateTourManagerDetails()) {
            allValid = false;
        }
    } else if (role === "Hotel Manager") {
        if (!validateHotelManagerDetails()) {
            allValid = false;
        }
    }

    const resultError = document.getElementById("ResultError");
    const resultSuccess = document.getElementById("ResultSuccess");

    if (!allValid) {
        resultError.hidden = false;
        resultError.textContent = "Please correct the highlighted fields.";
        return false;
    }

    let roleLabel = role;
    if (role === "Tourist") {
        roleLabel = "Traveler";
    }

    document.getElementById("TempPassword").value = "";
    document.getElementById("ConfirmTemp").value = "";
    resultError.textContent = "";
    resultError.hidden = true;
    resultSuccess.hidden = false;
    resultSuccess.textContent = "Details validated for a " + roleLabel + " account. No account or credentials were stored.";
    return true;
}

function validateName() {
    const name = document.getElementById("UserFullName").value.trim();
    const error = document.getElementById("NameError");

    if (name.length < 2) {
        error.textContent = "Enter the user's full name.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateEmail() {
    const email = document.getElementById("UserEmail").value.trim();
    const error = document.getElementById("EmailError");
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailFormat.test(email)) {
        error.textContent = "Enter a valid email address.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validatePhone() {
    const phone = document.getElementById("UserPhone").value.trim();
    const error = document.getElementById("PhoneError");

    if (!isValidPhone(phone)) {
        error.textContent = "Enter a valid phone number.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateGender() {
    const error = document.getElementById("GenderError");

    if (!isChecked("UserGender")) {
        error.textContent = "Select a gender.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateNationality() {
    const nationality = document.getElementById("UserNationality").value;
    const error = document.getElementById("NationalityError");

    if (nationality === "") {
        error.textContent = "Select a nationality.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateDateOfBirth() {
    const dateOfBirth = document.getElementById("UserDOB").value;
    const error = document.getElementById("DOBError");

    if (!isPastOrToday(dateOfBirth)) {
        error.textContent = "Enter a valid date of birth that is not in the future.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateAddress() {
    const address = document.getElementById("UserAddress").value.trim();
    const error = document.getElementById("AddressError");

    if (address.length < 5) {
        error.textContent = "Enter a complete home address.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateEmergencyContact() {
    const phone = document.getElementById("UserEmergency").value.trim();
    const error = document.getElementById("EmergencyError");

    if (phone !== "" && !isValidPhone(phone)) {
        error.textContent = "Enter a valid emergency contact number.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateRole() {
    const role = document.getElementById("AssignedRole").value;
    const error = document.getElementById("RoleError");

    if (role !== "Tourist" && role !== "Tour Manager" && role !== "Hotel Manager") {
        error.textContent = "Select an account type.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateUsername() {
    const username = document.getElementById("NewUserName").value.trim();
    const error = document.getElementById("UserNameError");
    const usernameFormat = /^[A-Za-z0-9_]{4,15}$/;

    if (!usernameFormat.test(username)) {
        error.textContent = "Use 4-15 letters, numbers, or underscores.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validatePassword() {
    const password = document.getElementById("TempPassword").value;
    const error = document.getElementById("PasswordError");
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < 8 || !hasLowercase || !hasUppercase || !hasNumber) {
        error.textContent = "Use 8+ characters with uppercase, lowercase, and a number.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validatePasswordConfirmation() {
    const password = document.getElementById("TempPassword").value;
    const confirmation = document.getElementById("ConfirmTemp").value;
    const error = document.getElementById("ConfirmError");

    if (password === "" || password !== confirmation) {
        error.textContent = "Passwords do not match.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateAccountStatus() {
    const status = document.getElementById("AccountStatus").value;
    const error = document.getElementById("StatusError");

    if (status === "") {
        error.textContent = "Select an account status.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateAccountNote() {
    const notes = document.getElementById("Notes").value.trim();
    const error = document.getElementById("NotesError");

    if (notes.length > 200) {
        error.textContent = "Keep the account note under 200 characters.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateConfirmation() {
    const confirmation = document.getElementById("Confirm").checked;
    const error = document.getElementById("ConfirmBoxError");

    if (!confirmation) {
        error.textContent = "Confirm that the details are correct.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateTravelerDetails() {
    let allValid = true;

    if (document.getElementById("TouristDestination").value === "") {
        setUserError("TouristDestinationError", "Select a preferred destination.");
        allValid = false;
    } else {
        setUserError("TouristDestinationError", "");
    }

    if (!isChecked("TouristStyle")) {
        setUserError("TouristStyleError", "Select a travel style.");
        allValid = false;
    } else {
        setUserError("TouristStyleError", "");
    }

    if (document.getElementById("TouristBudget").value === "") {
        setUserError("TouristBudgetError", "Select a typical travel budget.");
        allValid = false;
    } else {
        setUserError("TouristBudgetError", "");
    }

    return allValid;
}

function validateTourManagerDetails() {
    let allValid = true;

    if (document.getElementById("TMSpecialization").value === "") {
        setUserError("TMSpecializationError", "Select a tour specialization.");
        allValid = false;
    } else {
        setUserError("TMSpecializationError", "");
    }

    if (!isNumberBetween(document.getElementById("TMExperience").value, 0, 50)) {
        setUserError("TMExperienceError", "Enter 0 to 50 years of experience.");
        allValid = false;
    } else {
        setUserError("TMExperienceError", "");
    }

    if (document.getElementById("TMLicense").value.trim().length < 4) {
        setUserError("TMLicenseError", "Enter a valid license number.");
        allValid = false;
    } else {
        setUserError("TMLicenseError", "");
    }

    if (!isChecked("TMLanguage")) {
        setUserError("TMLanguageError", "Select at least one language.");
        allValid = false;
    } else {
        setUserError("TMLanguageError", "");
    }

    if (!isNumberBetween(document.getElementById("TMMaxTours").value, 1, 20)) {
        setUserError("TMMaxToursError", "Enter a number from 1 to 20.");
        allValid = false;
    } else {
        setUserError("TMMaxToursError", "");
    }

    return allValid;
}

function validateHotelManagerDetails() {
    let allValid = true;

    if (document.getElementById("HMHotelName").value.trim().length < 2) {
        setUserError("HMHotelNameError", "Enter the hotel name.");
        allValid = false;
    } else {
        setUserError("HMHotelNameError", "");
    }

    if (document.getElementById("HMAddress").value.trim().length < 5) {
        setUserError("HMAddressError", "Enter the hotel's location.");
        allValid = false;
    } else {
        setUserError("HMAddressError", "");
    }

    if (document.getElementById("HMStars").value === "") {
        setUserError("HMStarsError", "Select the hotel's rating.");
        allValid = false;
    } else {
        setUserError("HMStarsError", "");
    }

    if (!isNumberBetween(document.getElementById("HMRooms").value, 1, 500)) {
        setUserError("HMRoomsError", "Enter a room capacity from 1 to 500.");
        allValid = false;
    } else {
        setUserError("HMRoomsError", "");
    }

    if (document.getElementById("HMLicense").value.trim().length < 4) {
        setUserError("HMLicenseError", "Enter the hotel's license number.");
        allValid = false;
    } else {
        setUserError("HMLicenseError", "");
    }

    if (!isChecked("HMFacility")) {
        setUserError("HMFacilityError", "Select at least one facility.");
        allValid = false;
    } else {
        setUserError("HMFacilityError", "");
    }

    return allValid;
}

function clearCreateUserForm() {
    const errorMessages = document.querySelectorAll('p[id$="Error"]');

    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    document.getElementById("ResultError").hidden = true;
    document.getElementById("ResultSuccess").textContent = "";
    document.getElementById("ResultSuccess").hidden = true;

    window.setTimeout(showRoleFields, 0);
}
