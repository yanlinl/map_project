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

    var bounceMarker = null;

    var listModel = new koList();

    // Create only one infoWindow instance.
    var infoWindow = new google.maps.InfoWindow(
        {
            content: "",
            maxWidth: 200,
            maxHight: 100,
        }
    );


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
            if(bounceMarker != null) {
                bounceMarker.setAnimation(null);
            }
            bounceMarker = this;
            if(this.getAnimation() !== null) {
                this.setAnimation(null);
            } else {
                this.setAnimation(google.maps.Animation.BOUNCE);
            }
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
            getNearbyRestaurants(marker);
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
            title: "",
            animation: google.maps.Animation.DROP
        });
        marker.showInfo = populateInfoWindow;
        addInfoWindowListener(marker);
        // Set marker title to be address.
        getNearbyRestaurants(marker);
        setLocByGeocoder(marker);
    }

    /**
     * Show info Window information.
     *
     */
    var populateInfoWindow = function(marker) {
        // Check if infowindow is already open
        var infoWindowContent = '<h5>' + "Address: " + marker.title + '</h5><br>';
        infoWindowContent += "<h6>Nearby Restaurants: </h6>";
        if (infoWindow.marker != marker) {
            infoWindow.marker = marker;
            infoWindowContent += "<ul class=\"list-group\">"
            for(i in marker.nearbyRestaurants) {
                var temp = '<a class=\"list-group-item\">' + "Name: " + marker.nearbyRestaurants[i].name + '</a>';
                infoWindowContent += temp;
            }
            infoWindowContent += "</ul>";
            infoWindow.setContent(infoWindowContent);
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

    /**
     * Get restaurants near this location
     *
     */
    var getNearbyRestaurants = function(marker) {
        var result;
        var url = "https://us1.locationiq.org/v1/nearby.php?key=";
        url += APIKEY_LOCATION_IQ;
        url = url + "&lat=" + marker.position.lat().toString();
        url = url + "&lon=" + marker.position.lng().toString();
        url += "&tag=restaurant&radius=500&format=json"

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "GET"
        }

        $.ajax(settings).done(function (response) {
            marker.nearbyRestaurants = response;
        }).fail(function() {
            // if request failed
            alert(
                "Fail to get nearby restaurants."
            );
        });;
    }
}
