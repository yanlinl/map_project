function sideNav() {

    /*
        DATA OF OBJECT
    */
    this.openIcon = document.getElementById("menu-icon");
    this.closeIcon = document.getElementById("close-icon");

    /*
        PUBLIC FUNCTIONS
    */
    this.initSideNav = function() {
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
