function logoutManager()
{
    window.location.href = "TourManagerLogin.html";
}

let welcome = document.getElementById("WelcomeText");
if(welcome != null)
{
    welcome.textContent = "Welcome, Tour Manager!";
}
