function googleMap(db) {

    /*
        PRIVATE DATA
    */
    var appMap = new google.maps.Map(document.getElementById('app-map'), {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM
    });

    this.listModel = koList(db.markers);

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
        ko.applyBindings(this.listModel);
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
            db.markers.push(marker);
        }
    }

    var placeMarker = function(location) {
        var marker;
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
        marker.showInfo = populateInfoWindow;
        db.markers.push(marker);
        addInfoWindowListener(marker);
    }


    var populateInfoWindow = function(marker) {
        // Check to make sure the infowindow is not already opened on this marker.
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

    var setLocByGeocoder = function(marker) {
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': marker.position}, function(results, status) {
            if(status == 'OK') {
                if(results[0]) {
                    marker.setTitle(results[0].formatted_address);
                } else {
                    marker.setTitle("UNKNOW ADDRESS");
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}


var koList = function(arr) {
    temp = arr;
    this.search = ko.observable("");
    this.marker = ko.observableArray(arr);
    this.filterted_loc = ko.computed(function() {
        var results = [];
        var searchWord = this.search().toLowerCase();
        console.log(searchWord);
        console.log(arr);
        for(var i = 0; i < arr.length; i++) {
            console.log("here");
            if(arr[i].title.toLowerCase().include(searchWord)) {
                results.push(arr[i]);
                arr[i].setVisible(true);
            } else {
                arr[i].setVisible(false);
            }
        }
        return results;
    }, this);
};
