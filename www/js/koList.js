/**
 * Class for knockoutjs array 
 * @constructor
 * 
 */
var koList = function() {

    // place to store search input
    this.searchMarkers = ko.observable("");

    // place to store markers
    this.markers = ko.observableArray();

    // add a marker to list
    this.addMarker = function(marker) {
        console.log(this.markers.length);
        this.markers.push(marker);
    }

    /**
     * Filter marker .with the search input.
     *
     */
    this.filterted_loc = ko.computed(function() {
        var results = [];
        // Get input from search bar
        var searchWord = this.searchMarkers().toLowerCase();
        // loop though array and find eligiable marker.
        ko.utils.arrayForEach(this.markers(), function(marker) {
            // Check if title include search word.
            if(marker.title.toLowerCase().includes(searchWord)) {
                results.push(marker);
                // Set marker to be visible if title contains search word.
                marker.setVisible(true);
            } else {
                marker.setVisible(false);
            }
        });
        return results;
    }, this);
};
