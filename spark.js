function addPopUp(feature, layer){
		var popupTxt = "You clicked an amazing feature!";
		layer.bindPopup(popupTxt);
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
				style: EwaysStyle,
				onEachFeature: function(feature, layer) {
					addPopUp(feature,layer);
				}
			});

			lyrControl.clearLayers();
			lyrControl.addLayer(newLayer);
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