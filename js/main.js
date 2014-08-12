'use strict'

var units = {
  'dmf': 'WaterFlow [m3/s]',
  'met': 'Rain [mm]',
  'waterlevel': 'WaterLevel [m]',
  'rain': 'Rain [mm]',
  'temperature': 'Temperature [°C]',
}

var preloader = new Preloader();
var mapping = {};

function main() {
  var map;
  var CLICKLAYER = 2;


  $('#map').height($('body').height());

  loadFile('data/mapping.json');

  // create google maps map
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(-8.222, 38.122),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    // remove poi popups from google maps
    styles: [
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
      }
    ]
  };
  map = new google.maps.Map(document.getElementById('map'),  mapOptions);

  // var layerUrl = 'http://documentation.cartodb.com/api/v2/viz/81f06948-18f6-11e4-b079-0e230854a1cb/viz.json';
  var layerUrl = 'http://documentation.cartodb.com/api/v2/viz/78b74fbc-1929-11e4-bc28-0e10bcd91c2b/viz.json';

  // create layer and add to the map, then add some interfeatures
  cartodb.createLayer(map, layerUrl)
  .addTo(map)
  .on('done', function(layer) {

    var sublayer = layer.getSubLayer(CLICKLAYER);

    sublayer.on('featureClick', function(e, pos, latlng, data) {
      // console.log(e, pos, latlng, data);
      // if graph == to 1, show, if not, don't show 2nd
      var readings = mapping[data.scn];
      $('#graph-1').show()
      $('#graph-2').toggle(readings.length !== 1)

      readings.forEach(function(r, i) {
        r.scn = data.scn
        r.basin_name = data.basin_name
        loadPoint(r, i)
      })
    })

    // loadPoint({
    //   "basin_name": "Rufiji Basin",
    //   "scn": "1KA31",
    //   "basin_water_office_data_filename": "Little Ruaha at Mawande water level.txt",
    //   // "scn": "1KA59",
    //   // "basin_water_office_data_filename": "Great Ruaha at Msembe water level.txt",
    //   "datatypes": "waterlevel"
    // })

    sublayer.on('error', function(err) {
      cartodb.log.log('error: ' + err);
    });

  })
  .on('error', function() {
    cartodb.log.log("some error occurred");
  });

}

function loadPoint(reading, index) {

  var fileName = reading.file;

  var drawChart = index == 0 ? chart : chart2

  if (fileName) {
    preloader.show();

    var url = "data/stations/" + fileName
    console.log("loading", url);
    $.ajax({
      url: url,
      error: function(err) {
        preloader.hide();
        throw new Error(err)
      },
      success: function(fileData) {
        preloader.hide();
        // console.log("loaded", fileData.slice(-100))

        var cleanedData = cleanData(fileData, reading.datatype)

        console.log(reading);
        // console.log(cleanedData);
        // console.log(drawChart);
        // console.log(drawChart.renderTo);
        // console.log(reading);
        // console.log(cleanedData);

        drawChart.series[0].setData(cleanedData);
        drawChart.series[0].update({name: reading.datatype});
        drawChart.legend.allItems[0].update({name: reading.datatype});
        drawChart.yAxis[0].axisTitle.attr({text: units[reading.datatype]});
        drawChart.setTitle(null, { text: reading.basin_name + " - " + reading.scn});

        if(! $('#graphs').is(":visible")){
          $('#graphs').show(function(){
            // $('#map').animate({height:'58%'});
            var h = $('body').height() * .58;
            $('#map').animate({height:h});
          });

          google.maps.event.trigger(map, 'resize');
        }
      }
    })

  } else console.error('NO FILENAME')
}

function cleanData(fileData, datatype) {
  console.log('cleanData', datatype)
  return fileData.split("\n")
    // .slice(0, 10)
    .map(function(row) {
      var cells = row.split(",")
      // console.log(row)
      // var date = new Date(Date.parse(cells[0])).getTime()
      var date = parseInt(cells[0])
      var value = parseFloat(cells[1])
      return [date, value]
      // console.log("don't know", datatype, row)
    })
}

function Preloader(){
  this.show = function(){
    $("body").css("cursor", "wait");
  }

  this.hide = function(){
    $("body").css("cursor", "default");
  }
}

function loadFile(url){
  $.ajax({
    url:url,
    error:function(err){
      throw new Error(err)
    },
    success:function(data){
      mapping = data;
      // console.log(mapping)
    }
  })
}

$(main);
