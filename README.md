Switched boroughs with parks in app.js.

Data to dos:
  Make the geojson much more compact by eliminating extraneous properties.
  Switch typeahead with lunr.js for the little search functionality
  I guess just try putting stuff into cartoDB and looking at what their API will do for me.



Style todos:
  Redo all the layer selecter things and legend and stuff.


For dissolve of parks on the

ogr2ogr ogrparkies.shp /Users/matthewmckenna/Documents/job/greeninfo/sdParks/parks/sdParks.shp -dialect sqlite -sql "SELECT ST_Union(geometry), UNIT_NAME FROM sdParks GROUP BY UNIT_NAME"





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
