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
            console.log(event.latLng.lat());
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
        var add = {
            address: ""
        }
        /*
            NOTE: Inside of callback function, a function will not return
            value, address has to be passed in as a parameter. Since
            javascript always pass in variable by value, add has to be pass
            into function as an object.
        */
        setLocByGeocoder(location, add);
        if(add.address != "")
        {
            marker = new google.maps.Marker({
                position: location, 
                map: appMap,
                title: ""
            });
        }
        var infoWindow = new google.maps.InfoWindow({
            content: marker.title
        });
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

    var setLocByGeocoder = function(location, add) {
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': location}, function(results, status) {
            if(status == 'OK') {
                if(results[0]) {
                    add.address = results[0].formatted_address;
                } else {
                    add.address = "UNKNOW ADDRESS";
                }
            } else {
                add.address = "";
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}
