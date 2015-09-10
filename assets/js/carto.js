var sql = new cartodb.SQL({ user: 'mpmckenna8' });

console.log('trying to do a query')
/*
// example query to get all parks closes to a given point
sql.execute("SELECT unit_name, ST_Distance( the_geom ,ST_GeomFromText('POINT(-122.4167 37.7833)', 4326)) as dissy FROM parksinfo ORDER BY dissy LIMIT 5;")
  .done(function(data) {
      console.log(data.rows);
        })
  .error(function(errors) {
        // errors contains a list of errors
          console.log("errors:" + errors);
      })

*/


function parkActs(pname, cb){


  var quer = "Select * from parksinfo WHERE unit_name='" + pname + "';";

  sql.execute(quer)
    .done(function(data){
  //    console.log(data);
      cb(data.rows)

    })
    .error(function(err){
      console.log('errer getting polygon dets from cartodb: ' + err )
    })

}



function polydeets(pname, cb){

  console.log(pname);

  var quer = "select camping, spec_use, land_water, first_fac_ from parksinfo WHERE unit_name='" + pname +"';";

  sql.execute(quer)
    .done(function(data){
      console.log(data);

    })
    .error(function(err){
      console.log('errer getting polygon dets from cartodb: ' + err )
    })
}

function closeParks(point){
  var lat = point.coordinates[1];
  var lng = point.coordinates[0];

  var query = "Select DISTINCT unit_name FROM ( SELECT unit_name, ST_Distance( the_geom, ST_GeomFromText('POINT(" + lng + " "+ lat + ")', 4326)) as dissy FROM parksinfo ORDER BY dissy LIMIT 10) as blah;";

  console.log(query);
  sql.execute(query)
    .done(function(data){
      console.log(data);

      for(i in data.rows){
        console.log(data.rows[i])
        var parkname = data.rows[i].unit_name;
        $('.parkclose').append("<tr> <td> <a href='#park/" +parkname.replace(/ /g, '_') +"'>" + parkname + "</a></td></tr>");

      }

      // now to add that park data to the final thing.

    })
    .error(function(err){
      console.log('there was a fricking err', err)
    })

}

var geoj =  {
  "type": "FeatureCollection",
  "features": [

  ]
}

var perks;

function parkgeo(pname, cb){
//  map.removeLayer(perks);

 geoj.features = [];

  var quer = "Select unit_name, camping, spec_use, land_water, first_fac_, ST_AsGeoJSON(the_geom) as geometry from parksinfo WHERE unit_name='" + pname + "';";

  sql.execute(quer, {format:'GeoJSON'})
  .done(function(data){
    console.log(data);
    console.log((typeof(data.rows[0])))

    for ( i in data.rows){

      var fepark = {
        "type": "Feature",
        "properties": {
          "name":data.rows[i].unit_name,

        },
        "geometry": JSON.parse(data.rows[i].geometry)

      }
      geoj.features.push(fepark)

    }

    if(data.rows[0]){


  perks =  L.geoJson(geoj, {
      style:{
        color: 'purple',

      stroke:'black',
      weight:3,
      fillOpacity: .3,
      className:'blooper'},
    onEachFeature: function (feature, layer) {
      console.log(feature);
      layer.bindPopup(feature.properties.name);

    }
  }).addTo(map)


    map.fitBounds(perks)
  }

  })
  .error(function(err){
    console.log('error getting the park geometry', err)
  })

}


// to make the router go go a specific park do the following example for Balboa Park
// router.navigate('#park/Balboa_Park', {trigger: true, replace: true})
function parksFind(lat, lng){
  console.log(lat,lng);

  var query = "Select DISTINCT ON (unit_name) unit_name, dissy FROM ( SELECT unit_name, ST_Distance( the_geom, ST_GeomFromText('POINT(" + lng + " "+ lat + ")', 4326)) as dissy FROM parksinfo ORDER BY dissy LIMIT 1) as blah;";

  console.log(query);
  sql.execute(query)
    .done(function(data){
      console.log(data);

  if(data.rows[0]){
    var parkN = data.rows[0].unit_name;
    router.navigate('#park/' + parkN.replace(/ /g, '_'), {trigger: true, replace: true})


  }

      // now to add that park data to the final thing.

    })
    .error(function(err){
      console.log('there was a fricking err finding the closest park', err)
    })


}

$('.finder').on('click', function(){
  // do the same thing as location finder and find closeParks but just limit 1
  console.log('see comments for how to implement');
  if("geolocation" in navigator){
    console.log('geolocation is enabled')
    navigator.geolocation.getCurrentPosition(function(position) {

  parksFind(position.coords.latitude, position.coords.longitude);

});
  }
  else(
    console.log('sorry cant do geolocation here')
  )




})
