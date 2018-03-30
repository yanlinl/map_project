function sideNav(db) {

    /*
        DATA OF OBJECT
    */
    this.openIcon = document.getElementById("menu-icon");
    this.closeIcon = document.getElementById("close-icon");

    this.listModel = koList(db.titles);

    /*
        PUBLIC FUNCTIONS
    */
    this.initSideNav = function() {
        ko.applyBindings(this.listModel);
        this.openIcon.addEventListener('click', openNav);
        this.closeIcon.addEventListener('click', closeNav);
    }


    /*
        PRIVATE FUNCTIONS
    */
    var openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.0)";
    }

    var closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
    }
}

var koList = function(arr) {
    this.items = ko.observableArray(arr);
};