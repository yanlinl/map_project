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
        ko.applyBindings(listModel);
    }

    /*
        PRIVATE FUNCTIONS
    */

    var addInfoWindowListener = function(marker) {
        marker.addListener('click', function() {
            this.showInfo(this);
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
            addInfoWindowListener(marker);
            marker.showInfo = populateInfoWindow;
            listModel.addMarker(marker);
        }
    }

    var placeMarker = function(location) {
        var marker;
        marker = new google.maps.Marker({
            position: location, 
            map: appMap,
            title: ""
        });

        setLocByGeocoder(marker);
        marker.showInfo = populateInfoWindow;
        addInfoWindowListener(marker);
    }

    var populateInfoWindow = function(marker) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infoWindow.marker != marker) {
            console.log(marker);
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.open(appMap, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infoWindow.addListener('closeclick', function() {
            infoWindow.marker = null;
          });
        }
    }

    var setLocByGeocoder = function(marker) {
        var geocoder = new google.maps.Geocoder;
        console.log(marker.position);
        geocoder.geocode({'location': marker.position}, function(results, status) {
            if(status == 'OK') {
                if(results[0]) {
                    marker.setTitle(results[0].formatted_address.split(',')[0]);
                    listModel.addMarker(marker);
                } else {
                    marker.setTitle("UNKNOW ADDRESS");
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}
