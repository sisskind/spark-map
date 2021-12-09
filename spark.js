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

function createStyle(c,w,o){
	let overpassStyle = {
		color: c,
		weight: w,
		opacity: o
	}

	styleList.overpassStyle = overpassStyle;
}	

function addStyle(feature,layer) {
	return styleList.overpassStyle;
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
			style: addStyle,
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
