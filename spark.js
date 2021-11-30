function addPopUp(feature, layer){
			var popupTxt = "";
			var osmURL = ""
			// Try to get the name of the feature
			if (feature.properties && feature.properties.name) {
				popupTxt += `<b>${feature.properties.name}</b>`;
			}

		    // does this feature have a property named id?
		    if (feature.properties && feature.properties['@id']) {
		    	// Excellent! We can now link directly to the feature
		    	osmURL = `https://www.openstreetmap.org/${feature.properties['@id']}`
		    } else if (feature.properties && feature.properties['id']) {
		    	// Excellent! We can now link directly to the feature
		    	osmURL = `https://www.openstreetmap.org/${feature.properties['id']}`
		    } else if (feature.properties && feature.geometry.coordinates) {
		    	// Since we don't have the ID, let's try for the centroid of the feature
		    	var centroid;
		    	if (feature.geometry.type === 'Polygon') {
		    		centroid = turf.centroid(feature).geometry.coordinates;
		    	}
		    	osmURL = `https://www.openstreetmap.org/edit/#map=${map.getZoom()}/${centroid[0]}/${centroid[0]}`;
		    }

		    if (osmURL != "") {
		    	popupTxt += `</br></br>View this feature on <a target="_blank" href=${osmURL}>OSM</a>!`
		    }
		    layer.bindPopup(popupTxt);
}

function addStyle(n,c,w,o){
	let name = {
		color: c,
		weight: w,
		opacity = c
}	

function getXML(query, lyrControl){
	var output = "";
    $.ajax({
        type: "GET",
        url: query,
        dataType: "xml",

        error: function (e) {
            alert("An error occurred while processing XML file");
            console.log("XML reading Failed: ", e);
        },

        success: function (response) {
        	output = response;
        	var overpassGJ = osmtogeojson(response);

		var newLayer = L.geoJSON(overpassGJ, {
			style: function(feature){
				if (feature.properties.building == 'house') {return houseStyle}
				else if (feature.properties.building == 'apartments') {return apartmentsStyle}
				else if (feature.properties.building == 'school') {return schoolStyle}
				else {return otherStyle}
			},
			onEachFeature: function(feature, layer) {
				addPopUp(feature,layer);
			}
		});

		/* If using gjLayerGroup, clear layers before adding the new one */
		//lyrControl.clearLayers();
		//lyrControl.addLayer(newLayer);

		/* If adding the layer to the map, be sure to give it a name! */
		
		lyrControl.addOverlay(newLayer, "Overpass Query");
       

    	}
	});
}


// List of styles
var buildingsStyle = {
	color: "#E22B2B", 
	weight: 5, 
	opacity: 0.70
};

var otherStyle = {
	color: "#FFFF00", 
	weight: 5, 
	opacity: 0.5
};

var OwaysStyle = {
	color: "#E22B2B", 
	weight: 5, 
	opacity: 0.70
};

var EwaysStyle = {
	color: "#38f5a3", 
	weight: 5, 
	opacity: 0.70
};

var EbuildingsStyle = {
	color: "#E22B2B", 
	weight: 5, 
	opacity: 0.70
};

var schoolStyle = {
	color: "#15cf5c", 
	weight: 5, 
	opacity: 0.70
};

var houseStyle = {
	color: "#6f15cf", 
	weight: 5, 
	opacity: 0.70
};
	
var apartmentsStyle = {
	color: "#8a427f", 
	weight: 5, 
	opacity: 0.70}
	
var garageStyle = {
	color: "#42898a", 
	weight: 5, 
	opacity: 0.70
};

var garagesStyle = {
	color: "#c9400e", 
	weight: 5, 
	opacity: 0.70
};

var yesStyle = {
	color: "#edf505", 
	weight: 5, 
	opacity: 0.70
};

var residentialStyle = {
	color: "#24ff5e",
	weight: 5,
	opactiy: 0.70
};	

var serviceStyle = {
	color: "#ff7621",
	weight: 5,
	opacity: 0.70
};
