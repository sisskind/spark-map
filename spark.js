function addPopUp(feature, layer){
	var popupTxt = "";
	var osmURL = ""

	// does this feature have a property named id?
	if (feature.properties && feature.properties['@id']) {
		// Excellent! We can now link directly to the feature
		featureID = feature.properties['@id'];
		osmURL = `https://www.openstreetmap.org/${featureID}`
		popupTxt = `<b>OSM ${featureID.split('/')[0]} ID: ${featureID.split('/')[1]}</b>`;
	} else if (feature.properties && feature.properties['id']) {
		// Excellent! We can now link directly to the feature
		featureID = feature.properties['id'];
		osmURL = `https://www.openstreetmap.org/${featureID}`
		popupTxt = `<b>OSM ${featureID.split('/')[0]} ID: ${featureID.split('/')[1]}</b>`;
	} else if (feature.properties && feature.geometry.coordinates) {
		// Since we don't have the ID, let's try for the centroid of the feature
		var centroid;
		if (feature.geometry.type === 'Polygon') {
			centroid = turf.centroid(feature).geometry.coordinates;
		}
		osmURL = `https://www.openstreetmap.org/edit/#map=${map.getZoom()}/${centroid[0]}/${centroid[0]}`;
	}

	// Try to get the name of the feature
	if (feature.properties && feature.properties.name) {
		popupTxt = `<b>${feature.properties.name}</b>`;
	}


	if (osmURL != "") {
		popupTxt += `</br></br>View this feature on <a target="_blank" href=${osmURL}>OSM</a>!`
	}
	layer.bindPopup(popupTxt);
}

function addStyle(feature, layer){
if (feature.properties.building) {
	switch (feature.properties.building) {
		case 'house': 
			return featureStyle.house;
			break;
		case 'school':
			return featureStyle.school;
			break;
		case 'apartments':
			return featureStyle.apartment;
			break;
		case 'garage':
		case 'garages':
			return featureStyle.garage;
			break;
		case 'residential':
			return featureStyle.residential;
			break;
		case 'service':
			return featureStyle.service;
			break;
		default:
			return featureStyle.other;
			break;
	}
}
else if (feature.properties.footway){
	switch (feature.properties.footway) {
		case 'sidewalk':
			return featureStyle.sidewalk;
			break;
		default:
			return featureStyle.other;
			break;
	}
}
else if (feature.properties.highway){
	switch (feature.properties.highway) {
		case 'railway':
			return featureStyle.railway;
			break;
		default:
			return featureStyle.other;
			break;
	}
}
else {
return otherStyle
}

}

function addGJLayer(GJson) {
// Add buildings layer
var newLayer = L.geoJSON(null, {
	style: addStyle,
	onEachFeature: function(feature, layer) {
		addPopUp(feature,layer);
	}
});

$.getJSON(GJson, function(data){
	newLayer.addData(data).addTo(map);
});

return newLayer;
}

function getXML(query, lyrControl){
var output = "";
$.ajax({
type: "GET",
url: query,
dataType: "xml",

error: function (e) {
	alert("A " + e.status + " error occurred while processing your request! The error is: " + e.statusText + ".")
	console.log("XML reading Failed: ", e);
},

success: function (response) {
	output = response;
	var overpassGJ = osmtogeojson(response);
	if(overpassGJ.features.length == 0) {
		alert("Your query did not return any results!")
	} else {
		var newLayer = L.geoJSON(overpassGJ, {
			style: addStyle,
			onEachFeature: function(feature, layer) {
				addPopUp(feature, layer);
			}
		}).addTo(map);

		/* If using gjLayerGroup, clear layers before adding the new one */
		//lyrControl.clearLayers();
		//lyrControl.addLayer(newLayer);

		/* If adding the layer to the map, be sure to give it a name! */
		
		lyrControl.addOverlay(newLayer, "Overpass Query");
		alert("Your layer with " + overpassGJ.features.length + "features has been added to the map!");
	}
}
});
}
