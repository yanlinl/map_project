/**
 * Class for side navigation bar
 * @constructor
 * 
 */
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
    /**
     * Open navigation menu when button is clicked.
     *
     */
    var openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.0)";
    }

    /**
     * Close navigation menu when button is clicked.
     *
     */
    var closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
    }
}
