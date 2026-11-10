
console.log("HotelManager.js Connected");

// Validate website (optional field)
function validateHotelWebsite()
{
    let website = document.getElementById("HotelWebsite").value.trim();
    let expression = /^https?:\/\/[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\/.*)?$/;

    if (website === "")
    {
        clearError("WebsiteError");
        return true;
    }

    if (!expression.test(website))
    {
        showError("WebsiteError", "Please enter a valid website URL");
        return false;
    }

    clearError("WebsiteError");
    return true;
}


// Main Hotel Manager Registration Validation
function validateHotelManagerForm()
{
    let validName = validateName("ManagerName", "NameError");

    let validEmail = validateEmail("ManagerEmail", "EmailError");

    let validPhone = validatePhone("ManagerPhone", "PhoneError");

    let validGender = validateRadio("gender", "GenderError", "Gender");

    let validDOB = validateDOB("ManagerDOB", "DOBError", 18);


    // Hotel Information
    let validHotelName = validateTextLength( "HotelName", "HotelNameError", "Hotel Name", 2);

    let validHotelType = validateSelect("HotelType", "HotelTypeError", "Hotel Type");

    let validAddress = validateTextLength("HotelAddress", "AddressError", "Hotel Address", 10);

    let validCity = validateTextLength( "HotelCity", "CityError", "City / District", 2);

    let validRooms = validateNumber("RoomNumber", "RoomError", "Number of Rooms", 1, 10000);

    let validWebsite = validateHotelWebsite();


    // Professional Information
    let validPosition = validateSelect("Position", "PositionError", "Position");

    let validExperience = validateNumber("Experience", "ExperienceError", "Experience", 0, 40 );

    let validLicense = validateTextLength("LicenseNo", "LicenseError", "Hotel License No", 3);

    let validBusinessReg = validateTextLength("BusinessRegNo", "BusinessRegError",
        "Business Registration No", 3);


    // Account Information
    let validUsername = validateUsername("UserName", "UserNameError");

    let validPassword = validatePassword("Password", "PasswordError");

    let validConfirm = validateConfirmPassword("Password", "ConfirmPassword", "ConfirmError");


    // Check all validation results
    let isValid = validName && validEmail && validPhone && validGender && validDOB &&
                  validHotelName && validHotelType &&
                  validAddress && validCity && validRooms && validWebsite &&
                  validPosition && validExperience &&
                  validLicense && validBusinessReg &&
                  validUsername && validPassword && validConfirm;


    if (isValid)
{
    showResult(true, "Registration successful! Redirecting to login...");

    window.location.href = "HotelManagerLogin.html";
}
else
{
    showResult(false);
}

return false;
}
console.log("Hotel Manager Login Connected");

// Hotel Manager Login Validation
function validateHotelManagerLogin()
{
    let validUsername = validateUsername("UserName", "UserNameError");

    let password = document.getElementById("Password").value;

    let validPassword = true;

    if (password === "")
    {
        showError("PasswordError", "Please enter your password");
        validPassword = false;
    }
    else
    {
        clearError("PasswordError");
    }


    if (!validUsername || !validPassword)
    {
        showResult(false);
        return false;
    }


    let username = document.getElementById("UserName").value.trim();


    // Check Dummy Login Credentials
    if (username === "noor" && password === "Nn123456")
    {
        sessionStorage.setItem("hotelManagerLoggedIn", "true");

        sessionStorage.setItem("hotelManagerName", "Noor");

        window.location.href = "HotelManagerDashboard.html";
    }
    else
    {
        showError("PasswordError", "Incorrect username or password");

        showResult(false);
    }

    return false;
}

console.log("Hotel Manager Dashboard Connected");

// Check whether the manager is logged in
function checkHotelManagerLogin()
{
    let loginStatus = sessionStorage.getItem("hotelManagerLoggedIn");

    if (loginStatus !== "true")
    {
        window.location.replace("HotelManagerLogin.html");
        return;
    }

    let managerName = sessionStorage.getItem("hotelManagerName");

    document.getElementById("dashboardUserName").textContent = managerName;
}



