var featureList, parksSearch = [], campSearch = [], museumSearch = [];
var workspace; // this variable is going to hold the router.
$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

$(document).on("mouseover", ".feature-row", function(e) {
  highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
//  map.fitBounds(parks.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  console.log(id);
  var layer = markerClusters.getLayer(id);
  console.log(layer)
  if(layer){
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
    }
  }
  /*
  else if (parks.getLayer(id)){

    console.log('its a parko', this, parks.getLayer(id));
  //  map.fitBounds(parks.getLayer(id))

  //  parks.getLayer(id).fire("click", id)
    //this.navigate('#bleepblop', {trigger:true});

    //parks;

  }
  */
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();


  /* Loop through camps layer and add only features which are in the map bounds */
  var mapbou = map.getBounds();
  camps.eachLayer(function (layer) {
  //  console.log(layer.getLatLng())
    if (map.hasLayer(camps)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/tent.svg"></td><td class="feature-name">' + layer.feature.properties.SITE_NAME_ + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });


  /* Loop through parks layer and add only features which are in the map bounds
// getting the center of each bounds to see if it's in the current view.

  parks.eachLayer(function(layer){
    var cenlay = layer.getBounds().getCenter();
  //  console.log(cenlay);

  var parkname = layer.feature.properties.UNIT_NAME;

    if (mapbou.contains(cenlay)){
      //adding stuff to the feature body
      if(parkname){
      var eleadd = '<tr class="feature-row" id="' + L.stamp(layer) + '" lat="'+ cenlay.lat + '" lng="' + cenlay.lng + '"><td style="vertical-align: middle;"><svg class="parko"></svg></td><td class="feature-name"><a href="#park/' + parkname.replace(/ /g, "_") + '">' + parkname + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr></a>';
     $("#feature-list tbody").append(eleadd);

      }
    }
  })

  */


  /* Update list.js featureList */

  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });


/*

console.log(featureList);


*/

//var hackerList = new List('features', options);

//hackerList.add( { name: 'Jonas', city:'Berlin' } );


}

/* Basemap Layers */
// put the code for these in the basemaps.js file



/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};



/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove campsites to markerClusters layer */
var campsLayer = L.geoJson(null);
var camps = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/tent.svg",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
  //  console.log(feature);
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.SITE_NAME_ + "</td></tr>" +  "<tr><th>Agency</th><td>" + feature.properties.AGENCY_ + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.WEBSITE_ + "' target='_blank'>" + feature.properties.WEBSITE_ + "</a></td></tr>" + "<tr class='parkclose'><th>Closest Parks</th></tr></table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.SITE_NAME_);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));

          console.log(feature.geometry);
          // want to add some cartodb query here for closet parks
          // this function is in carto.js
          closeParks(feature.geometry);

        }
      });

      console.log(feature)

      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + feature.geometry.coordinates[0] + '" lng="' + feature.geometry.coordinates[1] + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/tent.svg"></td><td class="feature-name">' + layer.feature.properties.SITE_NAME_ + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');


      campSearch.push(
        {
          name: feature.properties.SITE_NAME_,
          source:"camps",
          id: L.stamp(layer),
          lat: layer.feature.geometry.coordinates[1],
          lng: layer.feature.geometry.coordinates[0]

        }
      )

    }
  }
});
$.getJSON("data/camps.geojson", function (data) {
  camps.addData(data);
  camps.addTo(markerClusters);
//  markerClusters.addTo(map);
});


// #mapstart
var map = L.map("map", {
  zoom: 10,
  center: [32.902222, -116.979378],
  zoomControl: false,
  attributionControl:true,
  layers:[openCycleMap, markerClusters],
  maxZoom:20,
})


cartoLayer = cartodb.createLayer(map, 'http://mpmckenna8.cartodb.com/api/v2/viz/bf965a6a-486a-11e5-a399-0e018d66dc29/viz.json')
  //.addTo(map)
  .on('done', function(layer) {
    //do stuff
  //  console.log('adding cartodblayer', layer);
//    layer.zIndex = 2;
    //map.options.layers.push(cartoLayer)
    layer.setZIndex(2)
    .addTo(map);

//    groupedOverlays.Reference.Water = layer;
  //  layer.setZLevel(0);

  })
  .on('error', function(err) {
    alert("some error occurred: " + err);
  });

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://bryanmcbride.com'>bryanmcbride.com</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}




map.on("overlayadd", function(e) {
    console.log(e)
    if (e.layer === camps) {
      markerClusters.addLayer(camps);
      syncSidebar();
    }
    if (e.layer ==='bobb') {
      markerClusters.addLayer(museums);
      syncSidebar();
    }
  });

  map.on("overlayremove", function(e) {
    if (e.layer === camps) {
      markerClusters.removeLayer(camps);
      syncSidebar();
    }
  })


/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  console.log(e)
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to parks bounds */
//  map.fitBounds(parks.getBounds());
  featureList = new List("features",
                          {valueNames: ["feature-name"]});

  console.log(featureList);

  featureList.sort("feature-name", {order:"asc"});


  var parksBH = new Bloodhound({
    name: "ParkSearch",
    datumTokenizer: function (d) {
    //  console.log(d)
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: parksSearch,
    limit: 10
  });

  var campsBH = new Bloodhound({
    name:"CampSearch",
    datumTokenizer: function (d){
    //  console.log(d);
      return Bloodhound.tokenizers.whitespace(d.name)
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: campSearch,
    limit:10
  })




  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
    //  console.log(d)
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
      //  console.log(data)
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });

  geonamesBH.initialize();
  parksBH.initialize();
  campsBH.initialize();




var baseLayers = {
  "OSM Cycle Map": openCycleMap,
  "Mapquest Sat": mapquestOAM ,
  "mapbox outdoors": mapboxTiles,
}

var groupedOverlays = {
  "POIs":
  {
    "Campsites <img src='assets/img/tent.svg' height='10px' width='10px'><\img>": camps
  }
}
var options = { };

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

  /* instantiate the typeahead UI */
$("#searchbox").typeahead({
  minLength: 3,
  highlight: true,
  hint: false
},
/*
{
  name:"ParkSearch",
  displayKey:"name",
  source: parksBH.ttAdapter(),
  templates:{
    header: "<h4 class='typeahead-header'><img src='assets/img/trees.svg' width='24' height='28' class='parkSearch' >&nbsp;Parks</h4>",
  }
},
*/
{
  name:"CampSearch",
  displayKey: "name",
  source:campsBH.ttAdapter(),
  templates:{
    header:"<h3 class='typeahead-header'>Campsites yo</h3>"
  }
},
 {
  name: "GeoNames",
  displayKey: "name",
  source: geonamesBH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
  }
})
.on("typeahead:selected", function (obj, datum) {
  console.log(datum)
  console.log(obj)
  var obje = obj;
  if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    /*
  if (datum.source === "Parks"){
    console.log(parks)
    parks.eachLayer(function(d){
  //    console.log(d)
      if(datum.name == d.feature.properties.UNIT_NAME){

        workspace.navigate('#blahblah', {trigger:true});

      d.setStyle({fillColor :'red'})
      map.fitBounds(d);
      }
      else{
        console.log(d)
      d.setStyle({
        fillColor:"#ccece6",

      })
        //d.options
      }
    })

  }
  */
  if (datum.source === "camps"){
    map.setView([datum.lat, datum.lng], 17);

    console.log(map._layers)
    map._layers[datum.id].fire("click");

  }

  if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  })
  .on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  })
  .on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");


});




// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
//  L.DomEvent
//  .disableClickPropagation(container)
//  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
