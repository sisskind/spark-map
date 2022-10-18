First...let's start with the `JSON` in GeoJSON.

JSON stands for **J**ava**S**cript **O**bject **N**otation and is a lightweight format for storing and transporting data. It is often used when data is sent from a server to a web page. Most importantly, JSON is "self-describing" and easy to understand.

The rules of the JSON:
* Data is in name/value pairs
* Data is separated by commas
* Curly braces hold objects
* Square bracketes hold arrays

```
{
"teams":[
    {"city":"Buffalo", "team":"Bills"}, 
    {"city":"Miami", "team":"Dolphis"},
    {"city":"New England", "team":"Patriots"}, 
    {"city":"New York", "team":"Jets"}  
]
}
```

Now that we know that...what makes it a **Geo**JSON?

Simple! More information!

A GeoJSON requires a geometry type with coordinates. A geometry type can be any of the following: `LineString`, `Polygon`, `MultiPoint`, `MultiLineString`, and `MultiPolygon`. GeoJSONs can have a type of `Feature` or `FeatureCollection`.

Depending on the feature, you may need one or many coordinates to _tell_ the web map where the feature should be, whether it is one point or many to create a line or polygon.

For example...a point feature looks like:
```
  "properties": {
    "name": "JMA Wireless Dome",
    "college": "Syracuse University",
    "team": "Orange"
  },
  {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-76.13635, 43.03625]
  }
}
```

While a collection of different points would look like this:
```
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "JMA Wireless Dome"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-76.13635,43.0362]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Path to Parking"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-76.13616,43.0370],
          [-76.13564,43.03705],
          [-76.13510,43.03669],
          [-76.13518,43.03541],
          [-76.13663,43.03541],
          [-76.13664, 43.03501]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Parking Lot"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [ -76.13662,43.034454],
            [ -76.13609,43.034454],
            [ -76.13609,43.034980],
            [ -76.13662,43.034980],
            [ -76.13662,43.034454]
          ]
        ]
      }
    }
  ]
}
```

The website https://www.geojson.io is a great resource to create GeoJSON files!

Sources: 
* https://www.w3schools.com/whatis/whatis_json.asp
* https://geojson.org
* https://medium.com/random-gis-talks/everything-about-geojson-67ddc6eda11e
