Before we can start to play around with the web map, let's understand a bit about HTML.

HTML - or Hypertext Markup Language - is the standard markup text for the web.

HTML breaks down websites into different elements. In the web map we are creating, you will see these a lot:
* `<div>` defines a section in a document
* `<b>` defines bolds text
* `<br>` designates a break in the text
* `<a>` defines a link to another website

Go to [W3Schools](https://www.w3schools.com/html/default.asp) tutorial on HTML to play around a bit to learn more about HTML.

Once you have played around a bit, go to `index.html` in your copy of the code.

1. Change the text in `title` to something original for your map. This is what will appear in the top window bar or tab in your browser.
2. Find in the code where it has `src="data/ualbany-dorms.geojson"`. You might remember from the first meeting or video that this is where you will put your own GeoJSON. Nothing to change yet, but good to know where this code is.
3. Find where the popup text on each feature is updated. By using the ``` key (under escape), you can add HTML elements to the code (see `Line 119`) for an example. Try using this to make the text bold or italic. For example, you could change it to ``<b>You clicked a <i>feature</i></b>`` which would look like this: <b>You clicked a <i>feature</i>!</b>
