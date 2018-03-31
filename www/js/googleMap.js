/** Class for map object
 * @constructor
 * 
 */
function googleMap() {

    /*
        PRIVATE DATA
    */
    var appMap = new google.maps.Map(document.getElementById('app-map'), {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM
    });

    var listModel = new koList();

    // Create only one infoWindow instance.
    var infoWindow = new google.maps.InfoWindow();


    /*
        PUBLIC FUNCTIONS
    */
    /**
     * Get map object.
     * @return {appMap} Google map object.
     */
    this.mapObject =function() {
        if(appMap != undefined) {
            return appMap;
        }
    }

    /**
     * Initialize map. This function will add initial markers, add event
     * handler and appy list binding.
     *
     */
    this.initMap = function() {
        addInitialMarkers();
        google.maps.event.addListener(appMap, 'click', function(event) {
            placeMarker(event.latLng);
        });
        ko.applyBindings(listModel);
    }

    /*
        PRIVATE FUNCTIONS
    */

    /**
     * Add event listener to marker, so it will open a info window when it is
     * clicked.
     *
     */
    var addInfoWindowListener = function(marker) {
        // add event listener
        marker.addListener('click', function() {
            this.showInfo(this);
        });
    }

    /**
     * Add all the location from INITIAL_MARKERS to map, and show as a marker.
     *
     */
    var addInitialMarkers = function() {
        var marker;
        // loop though array and add all the markers
        for(m in INITIAL_MARKERS) {
            marker = new google.maps.Marker({
                position: INITIAL_MARKERS[m]['location'], 
                map: appMap,
                title: INITIAL_MARKERS[m]['title'],
                animation: google.maps.Animation.DROP
            });
            addInfoWindowListener(marker);
            marker.showInfo = populateInfoWindow;
            listModel.addMarker(marker);
        }
    }

    /**
     * Place a marker when click anywhere in the map.
     *
     */
    var placeMarker = function(location) {
        var marker;
        marker = new google.maps.Marker({
            position: location, 
            map: appMap,
            title: ""
        });
        // Set marker title to be address.
        setLocByGeocoder(marker);
        // Link populateInfoWindow method to marker object.
        marker.showInfo = populateInfoWindow;
        addInfoWindowListener(marker);
    }

    /**
     * Show info Window information.
     *
     */
    var populateInfoWindow = function(marker) {
        // Check if infowindow is already open
        if (infoWindow.marker != marker) {
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.open(appMap, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infoWindow.addListener('closeclick', function() {
            infoWindow.marker = null;
          });
        }
    }

    /**
     * Get location by geocoder, and set marker title.
     *
     */
    var setLocByGeocoder = function(marker) {
        var geocoder = new google.maps.Geocoder;
        console.log(marker.position);
        geocoder.geocode({'location': marker.position}, function(results, status) {
            if(status == 'OK') {
                if(results[0]) {
                    // Set marker Title.
                    marker.setTitle(
                        results[0].formatted_address.split(',')[0]);
                    /*
                        marker is added here since the program run
                        asynchronously. If we add when the marker was created,
                        marker.title will be null.
                    */
                    listModel.addMarker(marker);
                } else {
                    // Set marker to be unknow if the address is not found.
                    marker.setTitle("UNKNOW ADDRESS");
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}
