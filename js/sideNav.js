function sideNav(db) {
    this.openIcon = document.getElementById("menu-icon");
    this.closeIcon = document.getElementById("close-icon");

    this.listModel = koList(db.titles);

    this.initSideNav = function() {
        ko.applyBindings(this.listModel);
        this.openIcon.addEventListener('click', this.openNav);
        this.closeIcon.addEventListener('click', this.closeNav);
    }

    this.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.0)";
    }

    this.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
    }
}

var koList = function(arr) {
    this.items = ko.observableArray(arr);
};