// Part 1 : Create the Earthquake Visualization

function createMarker(response) {


}


// Plot the tectonic plates dataset on the map in addition to the earthquakes.

function createMap (data, optional_data) {

    let street
}

// Add other base maps to choose from.

// Put each dataset into separate overlays that can be turned on and off independently.

// Add layer controls to your map.




let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Part 2 : Gather and Plot More Data (Optional with no extra points earning)




let  optional_url = "static/data/PB2002_boundaries.json";


d3.json(url).then(function(data) {
    d3.json(optional_url).then(function(optional_data) {
        console.log(data);
        console.log(optional_data);
        createFeatures(data.features, optional_data.features)

    });

});