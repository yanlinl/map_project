var koList = function() {
    this.searchMarkers = ko.observable("");
    this.markers = ko.observableArray();
    this.addMarker = function(marker) {
        console.log(this.markers.length);
        this.markers.push(marker);
    }
    this.filterted_loc = ko.computed(function() {
        var results = [];
        var searchWord = this.searchMarkers().toLowerCase();
        ko.utils.arrayForEach(this.markers(), function(marker) {
            if(marker.title.toLowerCase().includes(searchWord)) {
                results.push(marker);
                marker.setVisible(true);
            } else {
                marker.setVisible(false);
            }
        });
        return results;
    }, this);
};
