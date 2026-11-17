
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

function loginManager()
{
    clearMessages();
    let username = document.getElementById("LoginUsername").value.trim();
    let password = document.getElementById("LoginPassword").value;
    let valid = true;

    if(username == "") { 
        showError("LoginUsernameError", "Enter username"); 
        valid = false; }
    if(password == "") { 
        showError("LoginPasswordError", "Enter password"); 
        valid = false; }

    if(valid == true)
    {
        let result = document.getElementById("ResultText");
        result.textContent = "Login form is valid. Credentials are not verified.";
        result.classList.add("validation-success");
    }
    return false;
}
