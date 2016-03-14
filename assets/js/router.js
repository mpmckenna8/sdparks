console.log('router at least loaded ')

workspace = Backbone.Router.extend({
  routes:{
    "park/:query": "parkie",
    "*actions": "defaultRoute"
  },
  parkie: function(query){
    if(map.hasLayer(perks)){

        map.removeLayer(perks);
        console.log('theres already a park in there');
    }

    console.log(query);
    // I'm going to want to clear away the campsite information hide it
    // then display a parks info window.
    var parky = query.replace(/_/g, ' ');

    console.log(parky);
    parks.eachLayer(function(d){

      if(parky === d.feature.properties.UNIT_NAME){
        console.log('do something with this route');
      //  console.log(d.feature);
        map.fitBounds(d);
        d.setStyle({
          fillColor:"purple",

        })

        $('.parkPop').on('click', function(){

          $("#featureModal").modal("show");

        })
      }
      else{
        d.setStyle({fillColor:"green"});
      }
    })


  //  $('#parkinfo').css('display', 'block').append('this is a parkinfo window');
  var contento = "<table class='table table-striped table-bordered table-condensed'>"
  + "<tr><th>Managing agency</th><td class='agency'>Loading..." + "</tr>"
  + "<tr class='parkactrow'><th>Activities</th><td class='loader'>Loading...</td></tr> ";

  var que = "select camping, spec_use, land_water, first_fac_ from parkspoly where unit_name='"+ parky + "';";

  $("#feature-title").html(parky);
  $("#feature-info").html(contento)
  $("#featureModal").modal("show");

  parkActs(parky, tabgo)



  parkgeo(parky)


  var activs = {
    basketball:false,

  }
  function tabgo(rows){
    console.log('this got called should make a table here maybe.')
    for(i in rows){
      var facti = rows[i].first_fac_;
      var bball = rows[i].sum_bsktbl;
      var picnic = rows[i].sum_pcnc_b;
      var skateing = rows[i].sum_skateb;


      console.log(bball > 0);
      if(!activs.agency){
        activs.agency = rows[i].agncy_name;
      }
      if(bball > 0){
        activs.basketball = true;
        console.log('basketball changed')

      }
     if(picnic > 0){
        activs.picnic = true;
      }
      else if(facti === 'Tennis/racquet court'){
        activs.tennis = true;
      }
      if(skateing > 0){
        activs.skate = true;
      }
      else if(facti){
      //  console.log(facti);
      }
    }
    addToActs(activs);
  }

  function addToActs(act){
    var agents = act.agency;
    $('.loader').remove();

    $('.agency').html(agents);
  //  console.log(act)
    if(act.basketball){
      console.log($('.parkactrow'))
      $('.parkactrow').append('<tr><td>Basketball</td></tr>')
    }
    if(act.picnic){
      console.log($('.parkactrow'))
      $('.parkactrow').append('<tr><td>Covered picnic area</td></tr>')
    }
    if(act.tennis){
      console.log($('.parkactrow'))
      $('.parkactrow').append('<tr><td>Tennis Courts</td></tr>')
    }
    if(act.skate){
      console.log($('.parkactrow'))
      $('.parkactrow').append('<tr><td>Skate park</td></tr>');
    }
  }

    }
})

var router = new workspace;

Backbone.history.start();

/*
router.on('park/:query',function(quer){
  console.log('router does something;')
})

*/
