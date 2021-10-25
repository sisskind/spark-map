Let's change the center of the map when you first open the website. When the website is opened and the map initializes, it is directed to a specific latitude, longitude, and zoom.

* More information on latitude and longitude: (https://gsp.humboldt.edu/olm/Lessons/GIS/01%20SphericalCoordinates/Latitude_and_Longitude.html)
* More information on zoom scales: (https://leafletjs.com/examples/zoom-levels/) 

If you look at `Line 28`, you will see where the map is initialized:
		`var map = L.map('map')
			.setView([42.6850, -73.8248], 15)
			.on('click', onMapClick);`

Remember from the video - the first line is setting the map to be placed in the `map` element in the website and the third line is establishing an action to occur on a click event. The second line is where we are setting our map center point.

<b>Find a coordinate somewhere else in the earth and change it to your desired location.</b> Choose wisely, as you are going to create data in that area as well.
