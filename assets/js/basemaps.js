// Gettng the basemaps and layers all loaded up here.

var cartoLayer= L.tileLayer(null, {});



var parks = L.geoJson(null, {})

//this was the object in parks
/*
{
  style: function (feature) {
    return {
      color: "#00441b",
      fill: "#ccece6",
      opacity: .5,
      weight:.4,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
  //  console.log(feature);

    layer.bindPopup('Park Name is ' + feature.properties.UNIT_NAME + ". <a class='parkPop' href='#/park/" + feature.properties.UNIT_NAME  + "'>Get more info</a>" )


    //  console.log('pushing new feature')
    parksSearch.push({
      name: layer.feature.properties.UNIT_NAME,
      source: "Parks",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });



  }
});
$.getJSON("data/parkstopo.topojson", function (data) {
  //  console.log(topojson.feature(data, data.objects.ogrparkies));
  parks.addData(topojson.feature(data, data.objects.ogrparkies));
});

*/



// #basemaps
// Replace 'mapbox.streets' with your map id.


var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var ocmlink = '<a href="http://thunderforest.com/">Thunderforest</a>';
var openCycleMap = L.tileLayer(
    'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
    attribution: '&copy; '+mapLink+' Contributors & '+ocmlink,
    maxZoom: 18,
  });

var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=' + 'pk.eyJ1IjoibXBtY2tlbm5hOCIsImEiOiJfYWx3RlJZIn0.v-vrWv_t1ytntvWpeePhgQ', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
      maxZoom:29,
  }).setZIndex(0);


var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});


var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});


var mapquestHYB = L.layerGroup([L.tileLayer("mapbox.outdoors", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);
