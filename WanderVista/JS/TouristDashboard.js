console.log("TouristDashboard.js Connected");
function loadTouristData() {

    let username = sessionStorage.getItem("wandervista-tourist-username");

    if (username === null) {
        window.location.href = "TouristLogin.html";
        return;
    }

    let accounts = JSON.parse(
        localStorage.getItem("wandervista-tourist-accounts") || "[]"
    );

    let account = null;

    for (let i = 0; i < accounts.length; i++) {

        if (
            accounts[i].username.toLowerCase() === username.toLowerCase()
        ) {
            account = accounts[i];
            break;
        }
    }

    if (account === null) {
        sessionStorage.removeItem("wandervista-tourist-username");
        window.location.href = "TouristLogin.html";
        return;
    }

    let profile = account.profile;

    document.getElementById("WelcomeName").textContent = profile.TouristName;
    document.getElementById("DashboardName").textContent = profile.TouristName;
    document.getElementById("DashboardUsername").textContent = account.username;
    document.getElementById("DashboardEmail").textContent = profile.TouristEmail;
    document.getElementById("DashboardPhone").textContent = profile.TouristPhone;
    document.getElementById("DashboardAge").textContent = profile.TouristAge;
    document.getElementById("DashboardGender").textContent = profile.gender;
    document.getElementById("DashboardNationality").textContent = profile.Nationality;
    document.getElementById("DashboardDestination").textContent = profile.Destination;
}

function logoutTourist() {

    sessionStorage.removeItem("wandervista-tourist-username");

    window.location.href = "TouristLogin.html";
}

loadTouristData();
