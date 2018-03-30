function googleMap(db) {

    /*
        PRIVATE DATA
    */
    var appMap = new google.maps.Map(document.getElementById('app-map'), {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM
    });

    /*
        PUBLIC FUNCTIONS
    */
    this.mapObject =function() {
        if(appMap != undefined) {
            return appMap;
        }
    }

    this.initMap = function() {
        addInitialMarkers();
        google.maps.event.addListener(appMap, 'click', function(event) {
            placeMarker(event.latLng);
        });
    }

    /*
        PRIVATE FUNCTIONS
    */

    var addInfoWindow = function(marker) {
        var infoWindow = new google.maps.InfoWindow();
        marker.addListener('click', function() {
            populateInfoWindow(this, infoWindow);
        });
    }

    var addInitialMarkers = function() {
        var marker;
        for(m in INITIAL_MARKERS) {
            marker = new google.maps.Marker({
                position: INITIAL_MARKERS[m]['location'], 
                map: appMap,
                title: INITIAL_MARKERS[m]['title'],
                animation: google.maps.Animation.DROP
            });
            db.markers.push(marker);
            addInfoWindow(marker);
        }
    }

    var placeMarker = function(location) {
        var marker;
        var d = function() {
            this.address = "";
        }
        var a = new d();
        marker = new google.maps.Marker({
            position: location, 
            map: appMap,
            title: ""
        });
        /*
            For some reason, this function does not return any value. I use an
            object to store address, but the object come back as unchanged. I
            have not find the reason for this beheavior.
        */
        setLocByGeocoder(marker);
        db.markers.push(marker);
        addInfoWindow(marker);
    }


    var populateInfoWindow = function(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(appMap, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
    }

    var setLocByGeocoder = function(marker) {
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': marker.position}, function(results, status) {
            if(status == 'OK') {
                if(results[0]) {
                    marker.setTitle(results[0].formatted_address);
                } else {
                    a.address = "UNKNOW ADDRESS";
                }
            } else {
                a.address = "";
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}
