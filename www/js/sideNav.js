/**
 * Class for side navigation bar
 * @constructor
 * 
 */
function sideNav() {

    /*
        DATA OF OBJECT
    */
    this.menuIcon = document.getElementById("menu-icon");
    var sideNavOpen = false;

    /*
        PUBLIC FUNCTIONS
    */
    this.initSideNav = function() {
        this.menuIcon.addEventListener('click', openCloseSideNav);
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
        sideNavOpen = true;
    }

    /**
     * Close navigation menu when button is clicked.
     *
     */
    var closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
        sideNavOpen = false;
    }

    /**
     * Open side nave it is closed, close sidenav if it is open.
     *
     */
    var openCloseSideNav = function() {
        if(sideNavOpen==false) {
            openNav();
        } else {
            closeNav();
        }
    }
}
