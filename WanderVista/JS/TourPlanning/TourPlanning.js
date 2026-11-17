
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

function planTour()
{
    clearMessages();
    let name = document.getElementById("TourName").value.trim();
    let destination = document.getElementById("Destination").value.trim();
    let date = document.getElementById("TourDate").value;
    let tourists = document.getElementById("Tourists").value;
    let budget = document.getElementById("Budget").value;
    let valid = true;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if(name.length < 3)
    {
        showError("TourNameError", "Enter at least 3 characters");
        valid = false;
    }
    if(destination == "")
    {
        showError("DestinationError", "Enter destination");
        valid = false;
    }
    if(date == "" || new Date(date + "T00:00:00") < today)
    {
        showError("TourDateError", "Select today or a future date");
        valid = false;
    }
    if(tourists == "" || tourists <= 0 || tourists % 1 != 0)
    {
        showError("TouristsError", "Enter a positive whole number");
        valid = false;
    }
    if(budget == "" || budget <= 0)
    {
        showError("BudgetError", "Enter a budget greater than zero");
        valid = false;
    }
    if(valid == true)
    {
        let result = document.getElementById("ResultText");
        result.textContent = "Tour planning form is valid.";
        result.classList.add("validation-success");
    }
    return false;
}
