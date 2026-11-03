function showError(id, message)
{
    document.getElementById(id).innerHTML = message;
}

function clearMessages()
{
    let errors = document.getElementsByTagName("small");
    for(let i = 0; i < errors.length; i++)
    {
        errors[i].innerHTML = "";
    }
    let result = document.getElementById("ResultText");
    if(result != null)
    {
        result.innerHTML = "";
        result.classList.remove("validation-success");
    }
}

function registerManager()
{
    clearMessages();
    let name = document.getElementById("FullName").value.trim();
    let email = document.getElementById("Email").value.trim();
    let phone = document.getElementById("Phone").value.trim();
    let age = document.getElementById("Age").value;
    let managerId = document.getElementById("ManagerId").value.trim();
    let experience = document.getElementById("Experience").value;
    let specialty = document.getElementById("Specialty").value;
    let location = document.getElementById("Location").value.trim();
    let username = document.getElementById("Username").value.trim();
    let password = document.getElementById("Password").value;
    let confirmPassword = document.getElementById("ConfirmPassword").value;
    let genders = document.getElementsByName("gender");
    let days = document.getElementsByName("days");
    let genderSelected = false;
    let dayCount = 0;
    let valid = true;

    for(let i = 0; i < genders.length; i++)
    {
        if(genders[i].checked == true)
        {
            genderSelected = true;
        }
    }
    for(let i = 0; i < days.length; i++)
    {
        if(days[i].checked == true)
        {
            dayCount++;
        }
    }

    if(name.length < 3) { 
        showError("NameError", "Enter at least 3 characters"); valid = false; }
    if(email == "" || email.indexOf("@") <= 0 || email.lastIndexOf(".") < email.indexOf("@") + 2 || email.lastIndexOf(".") == email.length - 1) { showError("EmailError", "Enter a valid email"); valid = false; }
    if(phone.length != 11 || phone.substring(0, 2) != "01") { showError("PhoneError", "Enter an 11 digit phone number starting with 01"); valid = false; }
    else
    {
        for(let i = 0; i < phone.length; i++)
        {
            if(phone[i] < "0" || phone[i] > "9")
            {
                showError("PhoneError", "Only numbers are allowed"); valid = false;
                break;
            }
        }
    }
    if(age == "" || age < 18 || age > 100 || age % 1 != 0) { 
        showError("AgeError", "Age must be 18 to 100"); valid = false; }
    if(genderSelected == false) { 
        showError("GenderError", "Select gender"); valid = false; }
    if(managerId == "") {
        showError("ManagerIdError", "Enter manager ID"); valid = false; }
    if(experience == "" || experience < 0 || experience > 60 || experience % 1 != 0) { 
        showError("ExperienceError", "Enter experience from 0 to 60"); valid = false; }
    if(specialty == "") { 
        showError("SpecialtyError", "Select specialty"); valid = false; }
    if(location == "") { 
        showError("LocationError", "Enter location"); valid = false; }
    if(dayCount < 2) { 
        showError("DaysError", "Select at least 2 days"); valid = false; }
    if(username.length < 4) { 
        showError("UsernameError", "Username must have at least 4 characters"); valid = false; }
    if(password.length < 6) { 
        showError("PasswordError", "Password must have at least 6 characters"); valid = false; }
    if(confirmPassword == "" || password != confirmPassword) { 
        showError("ConfirmError", "Passwords do not match"); valid = false; }

    if(valid == true)
    {
        let result = document.getElementById("ResultText");
        result.textContent = "Registration form is valid.";
        result.classList.add("validation-success");
    }
    return false;
}

function loginManager()
{
    clearMessages();
    let username = document.getElementById("LoginUsername").value.trim();
    let password = document.getElementById("LoginPassword").value;
    let valid = true;

    if(username == "") { 
        showError("LoginUsernameError", "Enter username"); valid = false; }
    if(password == "") { 
        showError("LoginPasswordError", "Enter password"); valid = false; }
    if(valid == true) {
        let result = document.getElementById("ResultText");
        result.textContent = "Login form is valid. Credentials are not verified.";
        result.classList.add("validation-success");
    }
    return false;
}

function logoutManager()
{
    window.location.href = "TourManagerLogin.html";
}

let welcome = document.getElementById("WelcomeText");
if(welcome != null)
{
    welcome.textContent = "Welcome, Tour Manager!";
}
