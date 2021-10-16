function getXML(bounds, path){
	var output = "";
	var overpassURL = `http://overpass-api.de/api/interpreter?data=[timeout:25];(way["building"="dormitory"](${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng});); out body;>;out skel qt;`
    $.ajax({
        type: "GET",
        url: overpassURL,
        dataType: "xml",

        error: function (e) {
            alert("An error occurred while processing XML file");
            console.log("XML reading Failed: ", e);
        },

        success: function (response) {
        	output = response;
        	var overpassGJ = osmtogeojson(response);
        	L.geoJSON(overpassGJ).addTo(map);
        	console.log('done');
    }
});
}