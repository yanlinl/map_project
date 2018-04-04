/**Initialize applicaiton. This is a callback function*/
function initApp() {
    window.webApp = new app();
    webApp.initWebApp();
}

function googleError(){
    alert("Failed to load Google Maps.");
}