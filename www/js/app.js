/**
 * Class for this application.
 * @constructor
 * 
 */
function app() {
    this.appMap = new googleMap();
    this.appSideNav = new sideNav();

    /**
    * Initialize application.
    */
    this.initWebApp = function() {
        this.appMap.initMap();
        this.appSideNav.initSideNav();
    }
}