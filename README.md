Switched boroughs with parks in app.js.

Data to dos:
  Switch typeahead with lunr.js for the little search functionality
  I guess just try putting stuff into cartoDB and looking at what their API will do for me.

Made an example CartoDB sql query for all the parks closest to a given point in the carto.js file in assets/js directory.

For some good documentation as to the carto db sql api https://github.com/Vizzuality/CartoDB-Tutorials/blob/master/cartodb-js/basic_data_queries.md had some good examples.

One idea is to show the closest parks to each given campsite, but should probably preprocess for that, a better thing would be to just show the closest parks and/or camps to the given user.



Style todos:
  Redo all the layer selecter things and legend and stuff.

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


// Timespent

1.5 hours (8/15) Initial opening of files and looking through them + research into relevant comparison web apps and examining how they work.

2.5 hours (8/17) Converting .shp files into more internet friendly .geojson files and integrating my data into bootleaf. Learning how all the things in this version of bootleaf are working
1.5 hours (8/18)  Looking into ways to optimize performance for the data I have and the needs of the app. Trying out topojson for the parks polygons and that works ok but I could also try the

2 hours 8/20 Importing data to cartodb, exploring different map layer outputs with different combinations of the data.  Also creating a local postgis database of the data to experiment with.

2 hours 8/22 Learning the CartoDB api, Overview of different uses and focusing on the uses I'll have for it.  Decided to definitely use the sql api. made an example call in carto.js file.  Will get details about each park and possibly distances to parks, or things like closest parks to a given camp site.

2 hours 8/25 Exploring meaningful sql queries for the parks data.  Also setting up parks to be displayed in the sidebar and integrating the parks and campsites into the #searchbox
.  
5 hours: Making the search work with new data, and integrating new features into sidebar. Figuring out what kind of clientside routing I'd be able to use

3 hrs 8/30 Trying to integrate Cartodb map layers I created into this map. But only the legend ever shows up.
The following link has the closest example to what should work but I'm not sure about how these layers are being sent.
http://gis.stackexchange.com/questions/127771/unable-to-integrate-cartodb-into-leaflet-map


2.5 hours 8/31: Getting things set up to share
SQL query to get all the parks with a given activity.
  select distinct on (unit_name) unit_name, city, first_fac_ from parkspoly where first_fac_='Basketball court';
Better one to select specific sum field for each activity:
  select unit_name FROM parkspoly WHERE sum_skateb>0;


Fixing sort button





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
