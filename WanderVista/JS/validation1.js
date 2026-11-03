
console.log("validation.js Connected");


//Show Error Message

function showError(errorId, message)
{
    document.getElementById(errorId).innerHTML = message;
}

//Clear Error Message 

function clearError(errorId)
{
    document.getElementById(errorId).innerHTML = "";
}


//Make Text Safe

function safeText(text)
{
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;");
}


//Name Validation

function validateName(inputId, errorId)
{
    let name = document.getElementById(inputId).value.trim();
    let expression = /^[A-Za-z. ]+$/;

    if (name === "")
    {
        showError(errorId, "Please enter the name");
        return false;
    }

    if (name.length < 3)
    {
        showError(errorId, "Name must be at least 3 characters");
        return false;
    }

    if (!expression.test(name))
    {
        showError(errorId, "Name can contain only letters, spaces and dots");
        return false;
    }

    clearError(errorId);
    return true;
}


//Email Validation

function validateEmail(inputId, errorId)
{
    let email = document.getElementById(inputId).value.trim();
    let expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "")
    {
        showError(errorId, "Please enter the email");
        return false;
    }

    if (!expression.test(email))
    {
        showError(errorId, "Please enter a valid email");
        return false;
    }

    clearError(errorId);
    return true;
}


//Phone Validation

function validatePhone(inputId, errorId)
{
    let phone = document.getElementById(inputId).value.trim();
    let expression = /^01[3-9][0-9]{8}$/;

    if (phone === "")
    {
        showError(errorId, "Please enter the phone number");
        return false;
    }

    if (!expression.test(phone))
    {
        showError(errorId, "Phone must be 11 digits and start with 013 - 019");
        return false;
    }

    clearError(errorId);
    return true;
}


//Number Validation

function validateNumber(inputId, errorId, label, min, max)
{
    let value = document.getElementById(inputId).value.trim();

    if (value === "")
    {
        showError(errorId, "Please enter the " + label.toLowerCase());
        return false;
    }

    let number = Number(value);

    if (!Number.isInteger(number))
    {
        showError(errorId, label + " must be a whole number");
        return false;
    }

    if (number < min || number > max)
    {
        showError(errorId, label + " must be between " + min + " and " + max);
        return false;
    }

    clearError(errorId);
    return true;
}


//Pattern Validation

// function validatePattern(inputId, errorId, label, expression, example)
// {
//     let value = document.getElementById(inputId).value.trim().toUpperCase();

//     if (value === "")
//     {
//         showError(errorId, "Please enter the " + label);
//         return false;
//     }

//     if (!expression.test(value))
//     {
//         showError(errorId, label + " must look like " + example);
//         return false;
//     }

//     clearError(errorId);
//     return true;
// }


//Dropdown Validation

function validateSelect(selectId, errorId, label)
{
    let value = document.getElementById(selectId).value;

    if (value === "")
    {
        showError(errorId, "Please select the " + label.toLowerCase());
        return false;
    }

    clearError(errorId);
    return true;
}


//Radio Button Validation

function validateRadio(groupName, errorId, label)
{
    let options = document.querySelectorAll('input[name="' + groupName + '"]');
    let selected = "";

    for (let i = 0; i < options.length; i++)
    {
        if (options[i].checked)
        {
            selected = options[i].value;
            break;
        }
    }

    if (selected === "")
    {
        showError(errorId, "Please select the " + label.toLowerCase());
        return false;
    }

    clearError(errorId);
    return true;
}


//Checkbox Validation

// function validateCheckbox(groupName, errorId, label, minimum)
// {
//     let boxes = document.querySelectorAll('input[name="' + groupName + '"]');
//     let selected = [];

//     for (let i = 0; i < boxes.length; i++)
//     {
//         if (boxes[i].checked)
//         {
//             selected.push(boxes[i].value);
//         }
//     }

//     if (selected.length < minimum)
//     {
//         if (minimum === 1)
//         {
//             showError(errorId, "Please select at least one " + label);
//         }
//         else
//         {
//             showError(errorId, "Please select at least " + minimum + " " + label + "s");
//         }

//         return false;
//     }

//     console.log("Selected " + label + "s: " + selected.join(", "));

//     clearError(errorId);
//     return true;
// }


//Date of Birth Validation

function validateDOB(inputId, errorId, minAge)
{
    let value = document.getElementById(inputId).value;

    if (value === "")
    {
        showError(errorId, "Please select the date of birth");
        return false;
    }

    let parts = value.split("-");
    let dob = new Date(parts[0], parts[1] - 1, parts[2]);
    let today = new Date();

    if (dob > today)
    {
        showError(errorId, "Date of birth cannot be in the future");
        return false;
    }

    // Calculate age in full years

    let age = today.getFullYear() - dob.getFullYear();

    let monthGap = today.getMonth() - dob.getMonth();

    if (monthGap < 0 || (monthGap === 0 && today.getDate() < dob.getDate()))
    {
        age--;
    }

    if (age < minAge)
    {
        showError(errorId, "You must be at least " + minAge + " years old");
        return false;
    }

    if (age > 120)
    {
        showError(errorId, "Please enter a valid date of birth");
        return false;
    }

    clearError(errorId);
    return true;
}


//Text Length Validation 

function validateTextLength(inputId, errorId, label, minLength)
{
    let text = document.getElementById(inputId).value.trim();

    if (text === "")
    {
        showError(errorId, "Please enter the " + label.toLowerCase());
        return false;
    }

    if (text.length < minLength)
    {
        showError(errorId, label + " must be at least " + minLength + " characters");
        return false;
    }

    clearError(errorId);
    return true;
}


//Username Validation

function validateUsername(inputId, errorId)
{
    let username = document.getElementById(inputId).value.trim();

    let expression = /^[A-Za-z][A-Za-z0-9_]{3,14}$/;

    if (username === "")
    {
        showError(errorId, "Please enter a username");
        return false;
    }

    if (username.length < 4 || username.length > 15)
    {
        showError(errorId, "Username must be 4 - 15 characters");
        return false;
    }

    if (!expression.test(username))
    {
        showError(errorId, "Start with a letter; use only letters, numbers and _");
        return false;
    }

    clearError(errorId);
    return true;
}


//Password Validation

function validatePassword(inputId, errorId)
{
    let password = document.getElementById(inputId).value;

    if (password === "")
    {
        showError(errorId, "Please enter a password");
        return false;
    }

    if (password.length < 8)
    {
        showError(errorId, "Password must be at least 8 characters");
        return false;
    }

    if (!/[A-Z]/.test(password))
    {
        showError(errorId, "Password needs at least one uppercase letter");
        return false;
    }

    if (!/[a-z]/.test(password))
    {
        showError(errorId, "Password needs at least one lowercase letter");
        return false;
    }

    if (!/[0-9]/.test(password))
    {
        showError(errorId, "Password needs at least one number");
        return false;
    }

    clearError(errorId);
    return true;
}


// Confirm Password Validation

function validateConfirmPassword(passwordId, confirmId, errorId)
{
    let password = document.getElementById(passwordId).value;

    let confirm = document.getElementById(confirmId).value;

    if (confirm === "")
    {
        showError(errorId, "Please confirm the password");
        return false;
    }

    if (confirm !== password)
    {
        showError(errorId, "Passwords do not match");
        return false;
    }

    clearError(errorId);
    return true;
}


//File Validation

// function validateFile(inputId, errorId, allowedTypes)
// {
//     let fileInput = document.getElementById(inputId);

//     if (fileInput.files.length === 0)
//     {
//         clearError(errorId);
//         return true;
//     }

//     let file = fileInput.files[0];

//     let fileName = file.name.toLowerCase();

//     let extension = fileName.slice(fileName.lastIndexOf(".") + 1);

//     if (!allowedTypes.includes(extension))
//     {
//         showError(errorId, "Only " + allowedTypes.join(", ") + " files are allowed");
//         return false;
//     }

//     if (file.size > 2 * 1024 * 1024)
//     {
//         showError(errorId, "File must be 2 MB or smaller");
//         return false;
//     }

//     clearError(errorId);
//     return true;
// }


// Show Final Result 

function showResult(isValid, successMessage)
{
    let result = document.getElementById("ResultText");

    if (isValid)
    {
        result.className = "success";
        result.innerHTML = successMessage;
    }
    else
    {
        result.className = "failed";
        result.innerHTML = "Please fix the errors marked in red.";
    }
}


//Clear All Errors

function clearAllErrors()
{
    let errors = document.querySelectorAll(".error");

    for (let i = 0; i < errors.length; i++)
    {
        errors[i].innerHTML = "";
    }

    let result = document.getElementById("ResultText");

    result.className = "";
    result.innerHTML = "";
}


console.log("All Validation Functions Loaded");
