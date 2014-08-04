'use strict'

var units = {
  'dmf': 'Discharge [m3/s]',
  'met': 'Discharge [m3/s]',
  'waterlevel': 'Discharge [m]',
  'rain': 'Rain [mm]',
  'temperature': 'Temperature [°C]',
}

var preloader = new Preloader();
var mapping = {};

function main() {
  var map;
  var CLICKLAYER = 2;

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
      // cartodb.log(e, pos, latlng, data);
      console.log(e, pos, latlng, data);
      loadPoint(data)
    })

    loadPoint({
      "basin_name": "Rufiji Basin",
      "scn": "1KA31",
      "basin_water_office_data_filename": "Little Ruaha at Mawande water level.txt",
      "datatype": "waterlevel"
    })

    sublayer.on('error', function(err) {
      cartodb.log.log('error: ' + err);
    });

  })
  .on('error', function() {
    cartodb.log.log("some error occurred");
  });

}

function loadPoint(data) {

  var ID = data.scn;

  console.log(data)
  console.log(mapping[ID])

  // TODO allow user to pick when more than one type of reading
  var reading = mapping[ID][0];

  var fileName = reading.file;

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

        console.log("loaded", fileData.slice(0, 100))

        var cleanedData = cleanData(fileData, reading.datatype)

        // console.log(data);
        // console.log(cleanedData);

        chart.series[0].setData(cleanedData);
        chart.legend.allItems[0].update({name: data.datatype});
        chart.yAxis[0].axisTitle.attr({text: units[data.datatype]});
        chart.setTitle(null, { text: data.basin_name + " - " + data.scn});
      }
    })

  } else console.error('NO FILENAME')
}

function cleanData(fileData, datatype) {
  console.log('cleanData', datatype)
  return fileData.split("\n")
    // .slice(0, 10)
    .map(function(row) {
      row = row.split(",")
      // console.log(row)
      var date, value

      if ('dmf' === datatype) {
        return [
          new Date(row[0]),
          +row[1]
        ]
      }

      if ('waterlevel' === datatype) {
        return [
          // new Date(row[0] + ' ' + row[1]),
          (new Date(row[0])).getTime(),
          +row[1]
        ]
      }

      if ('rain' === datatype) {
        return [
          // new Date(row[0] + ' ' + row[1]),
          (new Date(row[0])).getTime(),
          +row[1]
        ]
      }
      // console.log("don't know", datatype, row)
    })
    .filter(function(row) {
      return row[1];
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
      console.log(mapping)
    }
  })
}

$(main);
