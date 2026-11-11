
console.log("HotelManager.js Connected");

// Validate website
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

    let validLicense = validateLicenseNo("LicenseNo", "LicenseError");

    let validBusinessReg = validateBusinessRegNo("BusinessRegNo", "BusinessRegError");


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













console.log("Hotel Manager Account Settings Connected");
// Get Current Password
function getHotelManagerPassword()
{
    let savedPassword = sessionStorage.getItem("hotelManagerPassword");

    if (savedPassword === null)
    {
        return "Nn123456";
    }

    return savedPassword;
}


// Account Settings Validation
function validateHotelManagerAccountSettings()
{

    
    let currentPassword = document.getElementById("CurrentPassword").value;

    let validCurrent = true;

    if (currentPassword === "")
    {
        showError("CurrentPasswordError", "Please enter your current password");
        validCurrent = false;
    }
    else if (currentPassword !== getHotelManagerPassword())
    {
        showError("CurrentPasswordError", "Incorrect current password");
        validCurrent = false;
    }
    else
    {
        clearError("CurrentPasswordError");
    }


    let validNew = validatePassword("NewPassword", "NewPasswordError");


    if (validNew && currentPassword === document.getElementById("NewPassword").value)
    {
        showError("NewPasswordError", "New password cannot be the same as current password");
        validNew = false;
    }


    let validConfirm = validateConfirmPassword("NewPassword","ConfirmNewPassword","ConfirmNewPasswordError");


    let isValid = validCurrent && validNew && validConfirm;


    if (isValid)
    {
        sessionStorage.setItem("hotelManagerPassword",document.getElementById("NewPassword").value);

        showResult(true, "Password changed successfully!");

        document.getElementById("CurrentPassword").value = "";
        document.getElementById("NewPassword").value = "";
        document.getElementById("ConfirmNewPassword").value = "";
    }
    else
    {
        showResult(false);
    }

    return false;
}









// Hotel Facilities & Policies Validation


console.log("Hotel Facilities & Policies Connected");

// Facilities Validation (checkboxes)
function validateHotelFacilities()
{
    let facilities = document.querySelectorAll('input[name="facilities"]');

    let selected = false;

    for (let i = 0; i < facilities.length; i++)
    {
        if (facilities[i].checked)
        {
            selected = true;
            break;
        }
    }

    if (!selected)
    {
        showError("FacilitiesError", "Please select at least one facility");
        return false;
    }

    clearError("FacilitiesError");

    return true;
}


// Check-in Time Validation
function validateCheckInTime()
{
    let time = document.getElementById("CheckInTime").value;

    if (time === "")
    {
        showError("CheckInError", "Please select the check-in time");
        return false;
    }

    clearError("CheckInError");

    return true;
}


// Check-out Time Validation
function validateCheckOutTime()
{
    let time = document.getElementById("CheckOutTime").value;

    if (time === "")
    {
        showError("CheckOutError", "Please select the check-out time");
        return false;
    }

    clearError("CheckOutError");

    return true;
}


// Main Hotel Facilities & Policies Validation
function validateHotelFacilitiesForm()
{
    // Hotel Facilities
    let validFacilities = validateHotelFacilities();

    let validDescription = validateTextLength("HotelDescription","DescriptionError","Hotel Description",20);


    // Hotel Policies
    let validCheckIn = validateCheckInTime();

    let validCheckOut = validateCheckOutTime();

    let validCancellation = validateSelect("CancellationPolicy","CancellationError", "Cancellation Policy");

    let validSmoking = validateSelect("SmokingPolicy","SmokingError","Smoking Policy" );

    let validPet = validateSelect("PetPolicy","PetError","Pet Policy");


    // Check All Validation Results
    let isValid = validFacilities && validDescription && validCheckIn && validCheckOut &&
validCancellation && validSmoking && validPet;


    if (isValid)
    {
        showResult(true, "Hotel facilities and policies submitted successfully!");
    }
    else
    {
        showResult(false);
    }

    return false;
}






// Hotel Room Management Validation


console.log("Hotel Room Management Connected");
// Main Room Management Validation
function validateRoomManagementForm()
{
    // Room Information

    let validRoomNumber = validateRoomNumber("RoomNumber","RoomNumberError");

    let validRoomType = validateSelect("RoomType","RoomTypeError","Room Type");


    let validPrice = validateNumber("RoomPrice","RoomPriceError","Price Per Night", 1, 1000000);


    let validCapacity = validateNumber("RoomCapacity","RoomCapacityError","Room Capacity", 1,20);


    let validStatus = validateSelect("RoomStatus", "RoomStatusError","Room Status");


    let validDescription = validateTextLength("RoomDescription","RoomDescriptionError","Room Description",10);


    // Check All Validation Results

    let isValid = validRoomNumber && validRoomType && validPrice && validCapacity && validStatus && validDescription;


    if (isValid)
    {
        showResult(true, "Room information submitted successfully!");
    }
    else
    {
        showResult(false);
    }

    return false;
}







// Hotel Booking Management Validation


console.log("Hotel Booking Management Connected");
// Booking Date Validation
function validateBookingDates()
{
    let checkInValue = document.getElementById("CheckIn").value;

    let checkOutValue = document.getElementById("CheckOut").value;

    let valid = true;


    // Check-in Date
    if (checkInValue === "")
    {
        showError("CheckInError", "Please select the check-in date");
        valid = false;
    }
    else
    {
        let checkIn = new Date(checkInValue + "T00:00:00");

        let today = new Date();

        today.setHours(0, 0, 0, 0);

        if (checkIn < today)
        {
            showError("CheckInError", "Check-in date cannot be in the past");
            valid = false;
        }
        else
        {
            clearError("CheckInError");
        }
    }


    // Check-out Date
    if (checkOutValue === "")
    {
        showError("CheckOutError", "Please select the check-out date");
        valid = false;
    }
    else if (checkInValue !== "" && checkOutValue <= checkInValue)
    {
        showError("CheckOutError", "Check-out date must be after check-in date");
        valid = false;
    }
    else
    {
        clearError("CheckOutError");
    }

    return valid;
}


// Main Hotel Booking Form Validation
function validateHotelBookingForm()
{
    // Guest Information
    let validName = validateName("GuestName","GuestNameError");

    let validEmail = validateEmail("GuestEmail","GuestEmailError");

    let validPhone = validatePhone("GuestPhone","GuestPhoneError" );


    // Booking Information
    let validRoom = validateRoomNumber("BookingRoom","BookingRoomError");

    let validDates = validateBookingDates();

    let validGuests = validateNumber("GuestCount","GuestCountError","Number of Guests",1,20);

    let validStatus = validateSelect("BookingStatus","BookingStatusError","Booking Status");


    // Check All Validation Results
    let isValid = validName && validEmail && validPhone && validRoom && validDates && validGuests && validStatus;

    if (isValid)
    {
        showResult(true, "Booking information submitted successfully!");
    }
    else
    {
        showResult(false);
    }

    return false;
}
