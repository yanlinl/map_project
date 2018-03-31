function app() {
    this.appMap = new googleMap();
    this.appSideNav = new sideNav();

    this.initWebApp = function() {
        this.appMap.initMap();
        this.appSideNav.initSideNav();
    }
}