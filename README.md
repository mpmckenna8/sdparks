Switched boroughs with parks in app.js.

Data to dos:
  Make the geojson much more compact by eliminating extraneous properties.
  Switch typeahead with lunr.js for the little search functionality
  I guess just try putting stuff into cartoDB and looking at what their API will do for me.





Style todos:
  Redo all the layer selecter things and legend and stuff.


For dissolve of parks on the

ogr2ogr ogrparkies.shp /Users/matthewmckenna/Documents/job/greeninfo/sdParks/parks/sdParks.shp -dialect sqlite -sql "SELECT ST_Union(geometry), UNIT_NAME FROM sdParks GROUP BY UNIT_NAME"


SQL query to get the distances to parks in ascending order from a point, in the example around SF.
    select unit_name, ST_Distance( geom ,ST_GeomFromText('POINT(-122.3521 37.122)')) from parkspoly order by st_distance;

// Timespent

1.5 hours (8/15) Initial opening of files and looking through them + research into relevant comparison web apps and examining how they work.
2.5 hours (8/17) Converting .shp files into more internet friendly .geojson files and integrating my data into bootleaf. Learning how all the things in this version of bootleaf are working
1.5 hours (8/18)  Looking into ways to optimize performance for the data I have and the needs of the app. Trying out topojson for the parks polygons and that works ok but I could also try the










BootLeaf
========

A simple, responsive template for building web mapping applications with [Bootstrap](http://getbootstrap.com/), [Leaflet](http://leafletjs.com/), and [typeahead.js](http://twitter.github.io/typeahead.js/).

### Demo:
http://bmcbride.github.io/bootleaf/

### Features:
* Fullscreen mobile-friendly map template with responsive Navbar and modal placeholders
* jQuery loading of external GeoJSON files
* Logical multiple layer marker clustering via the [leaflet marker cluster plugin](https://github.com/Leaflet/Leaflet.markercluster)
* Elegant client-side multi-layer feature search with autocomplete using [typeahead.js](http://twitter.github.io/typeahead.js/)
* Responsive sidebar feature list with sorting and filtering via [list.js](http://listjs.com/)
* Marker icons included in grouped layer control via the [grouped layer control plugin](https://github.com/ismyrnow/Leaflet.groupedlayercontrol)

### Screenshots:

![Desktop](http://bmcbride.github.io/bootleaf/screenshots/bootleaf-desktop1.png)

![Desktop Search](http://bmcbride.github.io/bootleaf/screenshots/bootleaf-desktop2.png)

![Desktop Popup](http://bmcbride.github.io/bootleaf/screenshots/bootleaf-desktop3.png)

![Mobile](http://bmcbride.github.io/bootleaf/screenshots/bootleaf-mobile1.png)

![Mobile Popup](http://bmcbride.github.io/bootleaf/screenshots/bootleaf-mobile2.png)

![Mobile Search](http://bmcbride.github.io/bootleaf/screenshots/bootleaf-mobile3.png)

![Mobile Menu](http://bmcbride.github.io/bootleaf/screenshots/bootleaf-mobile4.png)
