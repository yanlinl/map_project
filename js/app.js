function app() {
    this.mapDb = new mapDatabase();
    this.appMap = new googleMap(this.mapDb);
    this.appSideNav = new sideNav(this.mapDb);

    this.initWebApp = function() {
        this.mapDb.initMapDb();
        this.appMap.initMap();
        this.appSideNav.initSideNav();
    }
}