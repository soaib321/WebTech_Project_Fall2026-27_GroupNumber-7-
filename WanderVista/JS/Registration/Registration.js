function showError(id, message)
{
    document.getElementById(id).innerHTML = message;
}

function clearMessages()
{
   let errors = document.getElementsByClassName("error");
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
        showError("NameError", "Enter at least 3 characters"); 
        valid = false; }

     let expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email == "")
    {
        showError("EmailError", "Enter a valid email");
        valid = false;
    }
    else if(!expression.test(email))
    {
        showError("EmailError", "Enter a valid email");
        valid = false;
    }
 
let phoneExpression = /^01[3-9][0-9]{8}$/;

if(phone == "")
{
    showError("PhoneError", "Enter your phone number");
    valid = false;
}
else if(!phoneExpression.test(phone))
{
    showError("PhoneError", "Enter a valid 11 digit phone number");
    valid = false;
}

    if(age == "" || age < 18 || age > 100 || age % 1 != 0) { 
        showError("AgeError", "Age must be 18 to 100"); 
        valid = false; }
    if(genderSelected == false) { 
        showError("GenderError", "Select gender"); 
        valid = false; }
    if(managerId == "") {
        showError("ManagerIdError", "Enter manager ID"); 
        valid = false; }
    if(experience == "" || experience < 0 || experience > 60 || experience % 1 != 0) { 
        showError("ExperienceError", "Enter experience from 0 to 60"); 
        valid = false; }
    if(specialty == "") { 
        showError("SpecialtyError", "Select specialty"); 
        valid = false; }
    if(location == "") { 
        showError("LocationError", "Enter location"); 
        valid = false; }
    if(dayCount < 2) { 
        showError("DaysError", "Select at least 2 days"); 
        valid = false; }
    if(username.length < 4) { 
        showError("UsernameError", "Username must have at least 4 characters"); 
        valid = false; }
    if(password.length < 6) { 
        showError("PasswordError", "Password must have at least 6 characters"); 
        valid = false; }
    if(confirmPassword == "" || password != confirmPassword) { 
        showError("ConfirmError", "Passwords do not match"); 
        valid = false; }

    if(valid == true)
    {
        let result = document.getElementById("ResultText");
        result.textContent = "Registration form is valid.";
        result.classList.add("validation-success");
    }
    return false;
}

