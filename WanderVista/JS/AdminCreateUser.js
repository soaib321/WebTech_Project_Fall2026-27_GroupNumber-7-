document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        collect_data();
    });
    form.addEventListener("reset", clearCreateUserForm);
    document.getElementById("AssignedRole").addEventListener("change", showRoleFields);
    showRoleFields();
});

const userField = (id) => document.getElementById(id);
const userValue = (id) => userField(id).value.trim();
const roleFieldIds = ["TouristFields", "TourManagerFields", "HotelManagerFields"];
const roleErrorIds = [
    "TouristDestinationError", "TouristStyleError", "TouristBudgetError",
    "TMSpecializationError", "TMExperienceError", "TMLicenseError", "TMLanguageError", "TMMaxToursError",
    "HMHotelNameError", "HMAddressError", "HMStarsError", "HMRoomsError", "HMLicenseError", "HMFacilityError"
];

function showRoleFields() {
    roleFieldIds.forEach((id) => {
        userField(id).hidden = true;
    });
    roleErrorIds.forEach((id) => {
        userField(id).textContent = "";
    });

    const roleFields = {
        "Tourist": "TouristFields",
        "Tour Manager": "TourManagerFields",
        "Hotel Manager": "HotelManagerFields"
    };
    const selectedFields = roleFields[userValue("AssignedRole")];
    if (selectedFields) {
        userField(selectedFields).hidden = false;
    }

    userField("ResultError").textContent = "";
    userField("ResultError").hidden = true;
    userField("ResultSuccess").textContent = "";
    userField("ResultSuccess").hidden = true;
}

function setUserError(id, message) {
    userField(id).textContent = message;
    return message === "";
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return /^\+?[\d\s()-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}

function isChecked(name) {
    return document.querySelector('input[name="' + name + '"]:checked') !== null;
}

function isNumberBetween(text, min, max) {
    const number = Number(text);
    return text !== "" && Number.isInteger(number) && number >= min && number <= max;
}

function isPastOrToday(dateText) {
    if (!dateText) {
        return false;
    }
    const date = new Date(dateText + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !Number.isNaN(date.getTime()) && date <= today;
}

function collect_data() {
    const role = userValue("AssignedRole");
    const checks = [
        validateName(),
        validateEmail(),
        validatePhone(),
        validateGender(),
        validateNationality(),
        validateDateOfBirth(),
        validateAddress(),
        validateEmergencyContact(),
        validateRole(),
        validateUsername(),
        validatePassword(),
        validatePasswordConfirmation(),
        validateAccountStatus(),
        validateAccountNote(),
        validateConfirmation()
    ];

    if (role === "Tourist") {
        checks.push(validateTravelerDetails());
    } else if (role === "Tour Manager") {
        checks.push(validateTourManagerDetails());
    } else if (role === "Hotel Manager") {
        checks.push(validateHotelManagerDetails());
    }

    const resultError = userField("ResultError");
    const resultSuccess = userField("ResultSuccess");
    if (!checks.every(Boolean)) {
        resultError.hidden = false;
        resultError.textContent = "Please correct the highlighted fields.";
        return false;
    }

    const roleLabel = role === "Tourist" ? "Traveler" : role;
    userField("TempPassword").value = "";
    userField("ConfirmTemp").value = "";
    resultError.textContent = "";
    resultError.hidden = true;
    resultSuccess.hidden = false;
    resultSuccess.textContent = "Details validated for a " + roleLabel + " account. No account or credentials were stored.";
    return true;
}

function validateName() {
    return setUserError("NameError", userValue("UserFullName").length >= 2 ? "" : "Enter the user's full name.");
}

function validateEmail() {
    return setUserError("EmailError", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userValue("UserEmail")) ? "" : "Enter a valid email address.");
}

function validatePhone() {
    return setUserError("PhoneError", isValidPhone(userValue("UserPhone")) ? "" : "Enter a valid phone number.");
}

function validateGender() {
    return setUserError("GenderError", isChecked("UserGender") ? "" : "Select a gender.");
}

function validateNationality() {
    return setUserError("NationalityError", userValue("UserNationality") ? "" : "Select a nationality.");
}

function validateDateOfBirth() {
    return setUserError("DOBError", isPastOrToday(userValue("UserDOB")) ? "" : "Enter a valid date of birth that is not in the future.");
}

function validateAddress() {
    return setUserError("AddressError", userValue("UserAddress").length >= 5 ? "" : "Enter a complete home address.");
}

function validateEmergencyContact() {
    const phone = userValue("UserEmergency");
    return setUserError("EmergencyError", !phone || isValidPhone(phone) ? "" : "Enter a valid emergency contact number.");
}

function validateRole() {
    const validRoles = ["Tourist", "Tour Manager", "Hotel Manager"];
    return setUserError("RoleError", validRoles.includes(userValue("AssignedRole")) ? "" : "Select an account type.");
}

function validateUsername() {
    return setUserError("UserNameError", /^[A-Za-z0-9_]{4,15}$/.test(userValue("NewUserName")) ? "" : "Use 4-15 letters, numbers, or underscores.");
}

function validatePassword() {
    const password = userField("TempPassword").value;
    return setUserError("PasswordError", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) ? "" : "Use 8+ characters with uppercase, lowercase, and a number.");
}

function validatePasswordConfirmation() {
    const password = userField("TempPassword").value;
    const confirmation = userField("ConfirmTemp").value;
    return setUserError("ConfirmError", password && password === confirmation ? "" : "Passwords do not match.");
}

function validateAccountStatus() {
    return setUserError("StatusError", userValue("AccountStatus") ? "" : "Select an account status.");
}

function validateAccountNote() {
    return setUserError("NotesError", userValue("Notes").length <= 200 ? "" : "Keep the account note under 200 characters.");
}

function validateConfirmation() {
    return setUserError("ConfirmBoxError", userField("Confirm").checked ? "" : "Confirm that the details are correct.");
}

function validateTravelerDetails() {
    const destinationValid = setUserError("TouristDestinationError", userValue("TouristDestination") ? "" : "Select a preferred destination.");
    const styleValid = setUserError("TouristStyleError", isChecked("TouristStyle") ? "" : "Select a travel style.");
    const budgetValid = setUserError("TouristBudgetError", userValue("TouristBudget") ? "" : "Select a typical travel budget.");
    return destinationValid && styleValid && budgetValid;
}

function validateTourManagerDetails() {
    const specializationValid = setUserError("TMSpecializationError", userValue("TMSpecialization") ? "" : "Select a tour specialization.");
    const experienceValid = setUserError("TMExperienceError", isNumberBetween(userValue("TMExperience"), 0, 50) ? "" : "Enter 0 to 50 years of experience.");
    const licenseValid = setUserError("TMLicenseError", userValue("TMLicense").length >= 4 ? "" : "Enter a valid license number.");
    const languagesValid = setUserError("TMLanguageError", isChecked("TMLanguage") ? "" : "Select at least one language.");
    const toursValid = setUserError("TMMaxToursError", isNumberBetween(userValue("TMMaxTours"), 1, 20) ? "" : "Enter a number from 1 to 20.");
    return specializationValid && experienceValid && licenseValid && languagesValid && toursValid;
}

function validateHotelManagerDetails() {
    const nameValid = setUserError("HMHotelNameError", userValue("HMHotelName").length >= 2 ? "" : "Enter the hotel name.");
    const addressValid = setUserError("HMAddressError", userValue("HMAddress").length >= 5 ? "" : "Enter the hotel's location.");
    const ratingValid = setUserError("HMStarsError", userValue("HMStars") ? "" : "Select the hotel's rating.");
    const roomsValid = setUserError("HMRoomsError", isNumberBetween(userValue("HMRooms"), 1, 500) ? "" : "Enter a room capacity from 1 to 500.");
    const licenseValid = setUserError("HMLicenseError", userValue("HMLicense").length >= 4 ? "" : "Enter the hotel's license number.");
    const facilitiesValid = setUserError("HMFacilityError", isChecked("HMFacility") ? "" : "Select at least one facility.");
    return nameValid && addressValid && ratingValid && roomsValid && licenseValid && facilitiesValid;
}

function clearCreateUserForm() {
    document.querySelectorAll('p[id$="Error"]').forEach((item) => {
        item.textContent = "";
    });
    userField("ResultError").hidden = true;
    userField("ResultSuccess").textContent = "";
    userField("ResultSuccess").hidden = true;
    window.setTimeout(showRoleFields, 0);
}
