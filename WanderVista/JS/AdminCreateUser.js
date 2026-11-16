const field = (id) => document.getElementById(id);
const value = (id) => field(id).value.trim();

// Which extra section belongs to which role
const roleSections = {
    "Tourist": "TouristSection",
    "Tour Manager": "TourManagerSection",
    "Hotel Manager": "HotelManagerSection"
};

// Short description shown under the role dropdown
const roleNotes = {
    "Tourist": "Tourists book tours and hotels. Set their travel details and what they may do.",
    "Tour Manager": "Tour managers create and run tours. Set their expertise and tour permissions.",
    "Hotel Manager": "Hotel managers run a hotel. Set the hotel details and reservation permissions."
};

// Prefix used in the ids and names of each role's fields
const rolePrefix = { "Tourist": "Tourist", "Tour Manager": "TM", "Hotel Manager": "HM" };

function showError(id, message) {
    field(id).textContent = message;
    return !message;
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return /^\+?[\d\s()-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}

// Returns true if the person born on this date is between 18 and 100 today
function isAdult(dateText) {
    if (!dateText) {
        return false;
    }
    const birth = new Date(dateText);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }
    return age >= 18 && age <= 100;
}

function isFutureDate(dateText) {
    if (!dateText) {
        return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateText) > today;
}

// True if the text is a whole number between min and max
function isNumberBetween(text, min, max) {
    const number = Number(text);
    return text !== "" && Number.isInteger(number) && number >= min && number <= max;
}

const isChecked = (name) => document.querySelector('input[name="' + name + '"]:checked') !== null;

// Runs when the role dropdown changes: hide every role section, show only the chosen one
function showRoleOptions() {
    Object.values(roleSections).forEach((id) => field(id).classList.add("registration-hidden"));
    const role = value("AssignedRole");
    if (roleSections[role]) {
        field(roleSections[role]).classList.remove("registration-hidden");
    }
    field("RoleNote").textContent = roleNotes[role] || "Select a role to see the options for that role.";
    field("RoleError").textContent = "";
}

// Runs when an access level is picked: tick the permissions that match it
function setAccessLevel(groupId, level) {
    const boxes = document.querySelectorAll("#" + groupId + " input[type=checkbox]");
    boxes.forEach((box, index) => {
        if (level === "Full") {
            box.checked = true;
        } else if (level === "Limited") {
            box.checked = index < 2;
        } else {
            box.checked = index === 0;
        }
        box.disabled = true;
    });
}

function checkTourist(checks) {
    checks.push(showError("TouristDestinationError", value("TouristDestination") ? "" : "Select a destination type."));
    checks.push(showError("TouristStyleError", isChecked("TouristStyle") ? "" : "Select a travel style."));
    checks.push(showError("TouristBudgetError", value("TouristBudget") ? "" : "Select a budget range."));
    checks.push(showError("TouristMembershipError", value("TouristMembership") ? "" : "Select a membership."));
}

function checkTourManager(checks) {
    checks.push(showError("TMSpecializationError", value("TMSpecialization") ? "" : "Select a specialization."));
    checks.push(showError("TMExperienceError", isNumberBetween(value("TMExperience"), 0, 50) ? "" : "Enter 0 to 50 years."));
    checks.push(showError("TMLicenseError", /^TM-\d{4}$/.test(value("TMLicense")) ? "" : "Use the format TM-1234."));
    checks.push(showError("TMLanguageError", isChecked("TMLanguage") ? "" : "Select at least one language."));
    checks.push(showError("TMMaxToursError", isNumberBetween(value("TMMaxTours"), 1, 20) ? "" : "Enter a number from 1 to 20."));
}

function checkHotelManager(checks) {
    checks.push(showError("HMHotelNameError", value("HMHotelName").length >= 2 ? "" : "Enter the hotel name."));
    checks.push(showError("HMStarsError", value("HMStars") ? "" : "Select a star rating."));
    checks.push(showError("HMRoomsError", isNumberBetween(value("HMRooms"), 1, 500) ? "" : "Enter a number from 1 to 500."));
    checks.push(showError("HMLicenseError", /^HM-\d{4}$/.test(value("HMLicense")) ? "" : "Use the format HM-1234."));
    checks.push(showError("HMFacilityError", isChecked("HMFacility") ? "" : "Select at least one facility."));
}

function validateCreateUserForm() {
    const checks = [];
    const role = value("AssignedRole");

    checks.push(showError("NameError", value("UserFullName").length >= 2 ? "" : "Enter the user's full name."));
    checks.push(showError("EmailError", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("UserEmail")) ? "" : "Enter a valid email address."));
    checks.push(showError("PhoneError", isValidPhone(value("UserPhone")) ? "" : "Enter a valid phone number."));
    checks.push(showError("GenderError", isChecked("UserGender") ? "" : "Select a gender."));
    checks.push(showError("NationalityError", value("UserNationality").length >= 2 ? "" : "Enter the user's nationality."));
    checks.push(showError("AddressError", value("UserAddress").length >= 5 ? "" : "Enter the user's address."));
    const emergencyContact = value("UserEmergency");
    checks.push(showError("EmergencyError", !emergencyContact || isValidPhone(emergencyContact) ? "" : "Enter a valid emergency contact number."));
    checks.push(showError("DOBError", isAdult(value("UserDOB")) ? "" : "Enter a valid date of birth (18 years or older)."));
    checks.push(showError("RoleError", role ? "" : "Select a role."));

    // Only the chosen role's fields are checked
    if (role) {
        const prefix = rolePrefix[role];
        if (role === "Tourist") {
            checkTourist(checks);
        } else if (role === "Tour Manager") {
            checkTourManager(checks);
        } else {
            checkHotelManager(checks);
        }
        checks.push(showError(prefix + "AccessError", isChecked(prefix + "Access") ? "" : "Select an access level."));
        checks.push(showError(prefix + "PermissionError", isChecked(prefix + "Permission") ? "" : "Select at least one permission."));
    }

    checks.push(showError("StatusError", value("AccountStatus") ? "" : "Select an account status."));
    checks.push(showError("ValidError", isFutureDate(value("ValidUntil")) ? "" : "Choose a future date."));
    checks.push(showError("UserNameError", /^[A-Za-z0-9_]{4,15}$/.test(value("NewUserName")) ? "" : "Use 4-15 letters, numbers or underscores."));
    const password = field("TempPassword").value;
    checks.push(showError("PasswordError", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) ? "" : "Use at least 8 characters with uppercase, lowercase and a number."));
    checks.push(showError("ConfirmError", password && password === field("ConfirmTemp").value ? "" : "Passwords do not match."));
    const notes = value("Notes");
    checks.push(showError("NotesError", notes.length >= 20 && notes.length <= 200 ? "" : "Write 20 to 200 characters."));
    checks.push(showError("ConfirmBoxError", field("Confirm").checked ? "" : "Please confirm the details."));

    if (!checks.every(Boolean)) {
        showResult(false, "Please correct the highlighted fields.");
        return false;
    }

    const prefix = rolePrefix[role];
    const level = document.querySelector('input[name="' + prefix + 'Access"]:checked').value;
    const count = document.querySelectorAll('input[name="' + prefix + 'Permission"]:checked').length;
    showResult(true, "Account created for " + value("UserFullName") + " as " + role + " (" + level + " access, " + count + " permissions, " + value("AccountStatus") + ").");
    return false;
}

function showResult(success, message) {
    const result = field("ResultText");
    result.textContent = message;
    result.className = success ? "registration-success" : "registration-error";
}

function clearAllErrors() {
    document.querySelectorAll(".registration-error").forEach((item) => item.textContent = "");
    field("ResultText").textContent = "";
    field("ResultText").className = "";
    // The form values reset after this event, so update the role sections just after
    setTimeout(showRoleOptions, 0);
}
