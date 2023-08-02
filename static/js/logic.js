// Part 1 : Create the Earthquake Visualization

// URL for earthquake data
let earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Part 2 : Gather and Plot More Data (Optional with no extra points earning)

// URL for tectonic plate data
let plate_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Fetch earthquake data and tectonic plate data using d3.json
d3.json(earthquake_url).then(function (earthquake_data) {
    d3.json(plate_url).then(function (plate_data) {
        // Once data is fetched, call the createFeatures function
        createFeatures(earthquake_data.features, plate_data.features);
    });
});

// Function to create individual circle markers for earthquakes
function createMarker(response, latlng) {
    return L.circleMarker(latlng, {
        // Determine the marker radius based on earthquake magnitude
        radius: markerSize(response.properties.mag),
        // Determine the marker fill color based on earthquake depth
        fillColor: markerColor(response.geometry.coordinates[2]),
        color: markerColor(response.geometry.coordinates[2]),
        weight: 0.5,
        opacity: 0.5,
        fillOpacity: 1
    });
}

// Function to create earthquake and tectonic plate features on the map
function createFeatures(earthquakeData, plateData) {
    // Define function to run for each feature in the earthquake features array.
    // Give each feature a popup that describes the time, place, and magnitude of the earthquake.
    function onEachFeature(response, layer) {
        layer.bindPopup(`<h3>Location:</h3> ${response.properties.place}<h3> Magnitude:</h3> ${response.properties.mag}<h3> Depth:</h3> ${response.geometry.coordinates[2]}`);
    }

    // Create a GeoJSON layer that contains the earthquake features array.
    // Run the onEachFeature function for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker // Use createMarker function to style each earthquake marker
    });

    // Create a GeoJSON layer that contains the tectonic plate features array.
    let plates = L.geoJSON(plateData, {
        style: function () {
            return {
                color: "blue", // Set the color of the tectonic plate boundaries
                weight: 2.5 // Set the weight of the tectonic plate boundaries
            };
        }
    });

    // Send earthquakes layer and plates layer to the createMap function to display on the map
    createMap(earthquakes, plates);
}

// Function to create the map and add earthquake and tectonic plate layers
function createMap(earthquakes, plates) {
    // Define different base map layers (streetmap, graymap, and satellitemap)
    // You can switch between these base maps using the layer control
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    let graymap = L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        subdomains: 'abcd',
        accessToken: 'YnpQEhRDopnhG3NFNlYUwXCpK50fR3yagyHj5MwZJKWU0gnuq4iYH7xJ49UjNWaC'
    });
    let satellitemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        id: 'mapbox.streets',
        attribution: 'mbAttr'
    });

    // Define baseMaps object to switch between different base map layers
    let baseMaps = {
        "Satellite": satellitemap,
        "Grayscale": graymap,
        "Outdoors": streetmap
    };

    // Define overlayMaps object to switch between earthquake and tectonic plate layers
    let overlayMaps = {
        "Tectonic Plates": plates,
        "Earthquakes": earthquakes
    };

    // Create the map and set the center and zoom level
    let myMap = L.map("map", {
        center: [40.7608, -111.8910], // Centered at coordinates (40.7608, -111.8910)
        zoom: 5, // Initial zoom level
        layers: [graymap, earthquakes] // Show graymap and earthquakes layers by default
    });

    // Add layer controls to the map to toggle between baseMaps and overlayMaps
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false // Show the layer control expanded by default
    }).addTo(myMap);

    // Create a legend for the earthquake depth and add it to the map
    let legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (myMap) {
        let div = L.DomUtil.create('div', 'info legend');
        let grades = [-10, 10, 30, 50, 70, 90];
    

        // Loop through the depth ranges and add corresponding colors and labels to the legend
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);
}

// Function to calculate marker size based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 5;
}

// Function to determine marker color based on earthquake depth
function markerColor(depth) {
    return depth > 90 ? '#bc5a45' :
           depth > 70 ? '#f18973' :
           depth > 50 ? '#f4e1d2' :
           depth > 30 ? '#e3eaa7' :
           depth > 10 ? '#b5e7a0' :
                        '#86af49';
}
