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
      console.log(data);
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

$('.finder').on('click', function(){
  // do the same thing as location finder and find closeParks but just limit 1
  console.log('see comments for how to implement')
})
