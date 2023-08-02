// // Part 1 : Create the Earthquake Visualization

// function markerColor(depth) {
//     return depth > 90 ? '#d73027' :
//             depth > 70 ? '#fc8d59' :
//             depth > 50 ? '#fee08b' :
//             depth > 30 ? '#d9ef8b' :
//             depth > 10 ? '#91cf60' :
//                          '#1a9850' ;          
// }

// function markerSize(magnitude) {
//     return magnitude * 5;
// }

// function createMarker(response, latlng) {
//     return L.circleMarker(latlng, {
//         radius: markerSize(response.properties.mag),
//         fillColor: markerColor(response.geometry.coordinates[2]),
//         color:"#000",
//         weight: 0.5,
//         opacity: 0.5,
//         fillOpacity: 1
//     });
// }

// function createFeatures(earthquakeData, plateData) {
//     //Define function to run for each feature in the features array.
//     // Give each feature a popup that describes the time and place of the earthquake.
//     function onEachFeature(response, layer) {
//         layer.bindPopup(`<h3>Location:</h3> ${response.properties.place}<h3> Magnitude:</h3> ${response.properties.mag}<h3> Depth:</h3> ${response.geometry.coordinates[2]}`);
//     }

//     // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//     // Run the onEachFeature function for each piece of data in the array.
//     let earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature,
//         pointToLayer: createMarker
//     });
//     // Create a GeoJSON layer that contains the features array on the plateData object.
//     let plates = L.geoJSON(plateData, {
//         style: function() {
//             return {
//                 color: "blue",
//                 weight: 2.5
//             }
//         }
//     });

//     // Send earthquakes layer to the createMap function
//     createMap(earthquakes, plates);
// }


// // Plot the tectonic plates dataset on the map in addition to the earthquakes.

// function createMap (earthquakes, plates) {
    
//     let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

//     let graymap = L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
//         attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         minZoom: 0,
//         maxZoom: 22,
//         subdomains: 'abcd',
//         accessToken: 'YnpQEhRDopnhG3NFNlYUwXCpK50fR3yagyHj5MwZJKWU0gnuq4iYH7xJ49UjNWaC'
//     });

//     let satellitemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//         id: 'mapbox.streets',
//         attribution: mbAttr
//       });

//     // Add other base maps to choose from.

//     let baseMaps = {
//         "Satellite": satellitemap,
//         "Grayscale": graymap, 
//         "Outdoors": streetmap
//     };


//     // Put each dataset into separate overlays that can be turned on and off independently.

//     let overlayMaps = {
//         "Tactonic Plates": plates,
//         "Earthquakes": earthquakes
//     };

//     let myMap = L.map("map-id", {
//         center: [40.7608, -111.8910],
//         zoom: 10,
//         layers: [streetmap, earthquakes, plates]
//       });

//     // Add layer controls to your map.

//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(myMap);

//     let legend = L.control({position: 'bottomright'});

//     legend.onAdd = function (myMap) {

//         let div = L.DomUtil.create('div', 'info legend'),
//             grades = [-10, 10, 30, 50, 70, 90],
//             labels = [],
//             legendInfo = "<h5>Magnitude</h5>";

//         for (let i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//                 '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
//                 grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//         }    

//         return div;

//         };

//         // Add legend to map
//         legend.addTo(myMap);


// }




// let earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Part 2 : Gather and Plot More Data (Optional with no extra points earning)


// let  plate_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"


// d3.json(earthquake_url).then(function(earthquake_data) {
//     d3.json(plate_url).then(function(plate_data) {
//         console.log(earthquake_data);
//         console.log(plate_data);
//         createFeatures(earthquake_data.features, plate_data.features)

//     });

// });


// Part 1 : Create the Earthquake Visualization

function markerColor(depth) {
    return depth > 90 ? '#d73027' :
            depth > 70 ? '#fc8d59' :
            depth > 50 ? '#fee08b' :
            depth > 30 ? '#d9ef8b' :
            depth > 10 ? '#91cf60' :
                         '#1a9850' ;          
}

function markerSize(magnitude) {
    return magnitude * 5;
}

function createMarker(response, latlng) {
    return L.circleMarker(latlng, {
        radius: markerSize(response.properties.mag),
        fillColor: markerColor(response.geometry.coordinates[2]),
        color:"#000",
        weight: 0.5,
        opacity: 0.5,
        fillOpacity: 1
    });
}

function createFeatures(earthquakeData, plateData) {
    //Define function to run for each feature in the features array.
    // Give each feature a popup that describes the time and place of the earthquake.
    function onEachFeature(response, layer) {
        layer.bindPopup(`<h3>Location:</h3> ${response.properties.place}<h3> Magnitude:</h3> ${response.properties.mag}<h3> Depth:</h3> ${response.geometry.coordinates[2]}`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker
    });
    // Create a GeoJSON layer that contains the features array on the plateData object.
    let plates = L.geoJSON(plateData, {
        style: function() {
            return {
                color: "blue",
                weight: 2.5
            }
        }
    });

    // Send earthquakes layer to the createMap function
    createMap(earthquakes, plates);
}


// Plot the tectonic plates dataset on the map in addition to the earthquakes.

function createMap (earthquakes, plates) {
    
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
        attribution: mbAttr
      });

    // Add other base maps to choose from.

    let baseMaps = {
        "Satellite": satellitemap,
        "Grayscale": graymap, 
        "Outdoors": streetmap
    };


    // Put each dataset into separate overlays that can be turned on and off independently.

    let overlayMaps = {
        "Tactonic Plates": plates,
        "Earthquakes": earthquakes
    };

    let myMap = L.map("map-id", {
        center: [40.7608, -111.8910],
        zoom: 10,
        layers: [streetmap, earthquakes, plates]
      });

    // Add layer controls to your map.

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {

        let div = L.DomUtil.create('div', 'info legend'),
            grades = [-10, 10, 30, 50, 70, 90],
            labels = [],
            legendInfo = "<h5>Magnitude</h5>";

        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }    

        return div;

        };

        // Add legend to map
        legend.addTo(myMap);


}




let earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Part 2 : Gather and Plot More Data (Optional with no extra points earning)


let  plate_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"


d3.json(earthquake_url).then(function(earthquake_data) {
    d3.json(plate_url).then(function(plate_data) {
        console.log(earthquake_data);
        console.log(plate_data);
        createFeatures(earthquake_data.features, plate_data.features)

    });

});