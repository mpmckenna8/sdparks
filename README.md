Project to create a web app using data about San Diego area Parks and camp grounds.

## Overview

Began just plugging custom data into BootLeaf but changed quite a few things and moved things around.  

In the carto branch of this project I atempted to use the CartoDB layers API to display the parks and was somewhat successful. Though the layer does not show up with non-initial base-maps. Though the click event for popups does work so it may not be necessary to add and remove the layer each basemap change. The layer comes from https://mpmckenna8.cartodb.com/api/v2/viz/bf965a6a-486a-11e5-a399-0e018d66dc29/viz.json.

It also implements a few features utilizing the CartoDB sql api like to find a few of the closest parks in the info window for campsites. After some research it seems the CartoDB api is just loading the layer as images as simply as possible with on click event which makes a call to cartoDB for the attributes in the popup.  Need to decide how to deal with the parks attributes, Loading them all at one time would probably be easiest but also leave a lot of data in mmemory, so will attempt to request things from CartoDB as needed.



Data to dos:
  I guess just try putting stuff into cartoDB and looking at what their API will do for me.

  Made an example CartoDB sql query for all the parks closest to a given point in the carto.js file in assets/js directory.

  For some good documentation as to the carto db sql api https://github.com/Vizzuality/CartoDB-Tutorials/blob/master/cartodb-js/basic_data_queries.md had some good examples.

One idea is to show the closest parks to each given campsite, but should probably preprocess for that, a better thing would be to just show the closest parks and/or camps to the given user. Implemented but havent implemented the find closes parks feature.


Style todos:
  Redo all the layer selecter things and legend and stuff. Style layer and maybe remove cartoDB legend from the cartoDB Project.

For dissolve of parks on the

ogr2ogr ogrparkies.shp /Users/matthewmckenna/Documents/job/greeninfo/sdParks/parks/sdParks.shp -dialect sqlite -sql "SELECT ST_Union(geometry), UNIT_NAME FROM sdParks GROUP BY UNIT_NAME"

Aslo convert to topojson to make use of all thos shared geometries in the polygons.

SQL query to get the distances to parks in ascending order from a point, in the example around SF.
    select unit_name, ST_Distance( geom ,ST_GeomFromText('POINT(-122.3521 37.122)')) from parkspoly order by st_distance;


sql for getting all the parks with a given actvity, should probably use with DISTINCT

  select unit_name FROM parkspoly WHERE first_fac_='Swim Center';

  Actually better to use WHERE sum_skateb>0 because first_fac will only hold one value.

some activity names are:
  Tennis/racquet court
  Skate park
  Playground
  Community/recreation center
  Ball field (soccer, baseball, football)
  Basketball court
  Swim Center
  Covered picnic area

  camping = 1




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
// kdfdk
