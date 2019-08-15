// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


function markerSize(magnitude) {
    return magnitude * 5;
};



// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  function createCircleMarker( feature, latlng ){
    // Change the values of these options to change the symbol's appearance
   
    return L.circleMarker( latlng,   {radius: markerSize(feature.properties.mag)} );
  }


 
  function Color(magnitude) {
    if (magnitude > 5) {
        return 'red'
    } else if (magnitude > 4) {
        return 'darkorange'
    } else if (magnitude > 3) {
        return 'tan'
    } else if (magnitude > 2) {
        return 'yellow'
    } else if (magnitude > 1) {
        return 'darkgreen'
    } else {
        return 'lightgreen'
    }
}; 
 
 
 
 
 
 
 
 
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircleMarker,
    
    style: function (geoJsonFeature) {
        return {
            fillColor: Color(geoJsonFeature.properties.mag),
            fillOpacity: 0.7,
            weight: 0.1,
            color: 'black'

        }
    }




  });
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}









function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });


//create legend


function Color(magnitude) {
    if (magnitude > 5) {
        return 'darkred'
    } else if (magnitude > 4) {
        return 'darkorange'
    } else if (magnitude > 3) {
        return 'orange'
    } else if (magnitude > 2) {
        return 'yellow'
    } else if (magnitude > 1) {
        return 'darkgreen'
    } else {
        return 'lightgreen'
    }
}; 







var legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (map) {


    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Magnitude</h4>";
    div.innerHTML += '<i style="background: #00cc00"></i><span> <1 </span><br>';
    div.innerHTML += '<i style="background: #006600"></i><span>>1 and <2 </span><br>';
    div.innerHTML += '<i style="background: #ffff00"></i><span>>2 and <3 </span><br>';
    div.innerHTML += '<i style="background: #ffcc00"></i><span>>3 and <4 </span><br>';
    div.innerHTML += '<i style="background: #ff9900"></i><span>>4 and <5 </span><br>';
    div.innerHTML += '<i style="background: #cc0000"></i><span> >5 </span><br>';
    div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span></span><br>';









    // var div = L.DomUtil.create('div', 'info legend'),
    //     magnitude = [0, 1, 2, 3, 4, 5],
    //     labels = [];

    // div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

    // for (var i = 0; i < magnitude.length; i++) {
    //     div.innerHTML +=
    //         '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
    //         magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');

    // }
    


    return div;
};
legend.addTo(myMap);

















  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}










