# spark-map
Web map template using Leaflet

https://sisskind.github.io/spark-map

## Helpful Resources:
* (https://www.leafletjs.com "Leaflet")
* (https://www.w3schools.com/html/ "HTML")
* (https://www.geojson.io "GeoJSON.io")
* (https://www.w3schools.com/js/default.asp "JavaScript")

### Overpass Query for User-Created Features
```
[out:json][timeout:25];
// gather results
(
  // query part for: “building”
  way["building"](user:"username1","username2")({{bbox}});
);
// print results
out body;
>;
out skel qt;
```
