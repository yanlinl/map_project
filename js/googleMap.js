function googleMap(db) {
    this.map = new google.maps.Map(document.getElementById('app-map'), {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM
    });

    this.initMap = function() {
        this.addInitialMarkers();
        // use tempfunc to access member function. THIS IS A WORK AROUND.
        tempfunc = this.placeMarker;
        google.maps.event.addListener(this.map, 'click', function(event) {
            tempfunc(event.latLng);
        });
    }

    this.addInitialMarkers = function() {
        var marker;
        console.log(this.map);
        for(m in INITIAL_MARKERS) {
            marker = new google.maps.Marker({
                position: INITIAL_MARKERS[m]['location'], 
                map: this.map,
                title: INITIAL_MARKERS[m]['title'],
                animation: google.maps.Animation.DROP
            });
            db.markers.push(marker);
            this.addInfoWindow(marker);
        }
    }

    this.placeMarker = function(location) {
        var marker;
        marker = new google.maps.Marker({
            position: {lat: 40.719526, lng: -73.9980244}, 
            map: this.map,
            title: ""
        });
        console.log(this.map);
        this.getLocByGeocoder(marker);
        var infoWindow = new google.maps.InfoWindow({
            content: marker.title
        });
        db.markers.push(marker);
        this.addInfoWindow(marker);
    }

    this.addInfoWindow = function(marker) {
        var infoWindow = new google.maps.InfoWindow();
        tempfunc = this.populateInfoWindow;
        marker.addListener('click', function() {
                tempfunc(this, infoWindow);
        });
    }

    this.populateInfoWindow = function(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(this.map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
    }

    this.getLocByGeocoder = function(marker) {
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': marker.location}, function(results, status) {
            if(status == 'OK') {
                if(results[0]) {
                    marker.setTitle(results[0].formatted_address);
                } else {
                    marker.setTitle("UNKNOW ADDRESS");
                }
            } else {
                marker.setTitle("Please re-add marker");
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}