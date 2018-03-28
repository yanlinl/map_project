function mapDataEntry(loc, title, description="", streetView="") {
    this.location = loc;
    this.title = title;
    this.description = description;
    this.streetView = streetView
}

function mapDatabase() {
    this.mapData = new Array();
    this.titles = new Array();
    this.markers = new Array();
    this.pushBack = function(mapDataEntry) {
        this.mapData.push(mapDataEntry);
    }

    this.initMapDb = function() {
        this.loadInitialData();
        this.getTitles();
    }

    this.getTitles = function() {
        for(x in this.mapData) {
            this.titles.push(this.mapData[x].title);
        }
    }

    this.loadInitialData = function() {
        var data;
        for(d in INITIAL_MARKERS) {
            data = new mapDataEntry(INITIAL_MARKERS[d]['location'], INITIAL_MARKERS[d]['title']);
            this.mapData.push(data);
        }
    }
}