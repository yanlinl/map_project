/** Stores initial map information. */
var INITIAL_CENTER = {lat: 40.719526, lng: -73.9980244};
var INITIAL_ZOOM = 13;

/** API key for google map api. */
var APIKEY_GOOGLE_MAP = "AIzaSyAYl1bbrRkHZv-tz7D4JgLFVAxRL1S7VFA";
var APIKEY_LOCATION_IQ = "9f1037ebcbed89";
var SCRIPT_PRE_KEY = "<script async defer src=\"https://maps.googleapis.com/maps/api/js?key=";
var SCRIPT_AFTER_KEY = "&v=3&callback=initApp\" onerror=\"googleError\"<\\script>";


/** Stores initial locations. */
var INITIAL_MARKERS = [
    {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}}
    // ,
    // {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
    // {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
    // {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
    // {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
    // {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];