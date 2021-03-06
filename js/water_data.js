(function() {
  'use strict';
// CHART I
  window.chart = new Highcharts.StockChart({
      chart: {
          renderTo: 'graph-1',
          type: 'area',
          spacingTop: 10,
          spacingBottom: 5,
          backgroundColor: '#fff',
          style: {
            fontFamily: '"Helvetica-Neue-Light", Helvetica, sans-serif', // default font
            fontSize: '12px'
          }
      },
      colors: [
      // colors taken from the palette on this site: http://vitalsigns.org/
      // '#FFCC33', '#4E733D', '#C04420', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59'
      '#051036', '#9DCBDA', '#FBD8DB', '#fc8d59', '#666', '#fff'
      ],
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom'
      },
      navigator: {
        enabled: true,
        height: 20,
        margin: 0
      },
      scrollbar: {
        enabled: false
      },
      rangeSelector: {
        enabled: true,
        buttons: [{
            type: 'month',
            count: 1,
            text: ' '
        },
        {
            type: 'month',
            count: 1,
            text: '1M'
        }, {
            type: 'month',
            count: 3,
            text: '3M'
        }, {
            type: 'year',
            count: 1,
            text: '1Y'
        }, {
            type: 'all',
            text: 'All'
        }],
        buttonSpacing: 2,
        buttonTheme: { // styles for the buttons
          fill: 'none',
          stroke: 'none',
          // width: 20,
          'stroke-width': 0,
          r: 8,
          style: {
            color: '#666',
            fontWeight: 'bold',
            fontSize: 10
          },
          states: {
            hover: {
            },
            select: {
              fill: '#9DCBDA',
              style: {
                color: '#fff'
              }
            }
          }
        },
        inputBoxBorderColor: '#666',
        inputStyle: {
          fontSize: 10
        },
        labelStyle: {
          color: '#666',
          fontWeight: 'bold',
          fontSize: 11
        }
      },
      title: {
        text: 'Environmental Reading at Gauging Station - TZA'
      },
      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
      },
      yAxis: {
        title: {
            text: 'Values'
        },
        min: 0
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.2f}</b><br>',
      },

      series: [{
        // Define the data points.
        fillColor : {
          linearGradient : {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops : [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        threshold: null
      }]
  });

// CHART II
  window.chart2 = new Highcharts.StockChart({
      chart: {
          renderTo: 'graph-2',
          type: 'area',
          spacingTop: 10,
          spacingBottom: 5,
          backgroundColor: '#fff',
          style: {
            fontFamily: '"Helvetica-Neue-Light", Helvetica, sans-serif', // default font
            fontSize: '12px'
          }
      },
      colors: [
      // colors taken from the palette on this site: http://vitalsigns.org/
      // '#FFCC33', '#4E733D', '#C04420', '#6E9962', '#71a658', '#8db879', '#9DCBDA', '#FBD8DB', '#fc8d59'
      '#051036', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59', '#666', '#fff'
      ],
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom'
      },
      navigator: {
        enabled: true,
        height: 20,
        margin: 0,
        maskFill: 'rgba(212, 228, 205, 0.95)'
      },
      plotOptions: {
        series: {
          color: '#6E9962',
          lineColor: '#6E9962'
        }
      },
      scrollbar: {
        enabled: false
      },
      rangeSelector: {
        enabled: true,
        buttons: [{
            type: 'month',
            count: 1,
            text: '1M'
        }, {
            type: 'month',
            count: 3,
            text: '3M'
        }, {
            type: 'year',
            count: 1,
            text: '1Y'
        }, {
            type: 'all',
            text: 'All'
        }],
        buttonSpacing: 2,
        buttonTheme: { // styles for the buttons
          fill: 'none',
          stroke: 'none',
          'stroke-width': 0,
          r: 8,
          style: {
            color: '#666',
            fontWeight: 'bold',
            fontSize: 10
          },
          states: {
            hover: {
            },
            select: {
              fill: '#71a658',
              style: {
                color: '#fff'
              }
            }
          }
        },
      inputBoxBorderColor: '#71a658',
      inputStyle: {
        fontSize: 10
      },
      labelStyle: {
        color: '#71a658',
        fontWeight: 'bold',
        fontSize: 11
      }
    },
      title: {
        text: 'Environmental Reading at Gauging Station - TZA'
      },
      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
      },
      yAxis: {
        title: {
            text: 'Values'
        },
        min: 0
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.2f}</b><br>',
        borderColor: '#71a658'
      },

      series: [{
        // Define the data points.
        fillColor : {
          linearGradient : {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops : [
            [0, 'rgb(156,192,138)'],
            [1, 'rgba(212,228,205,0.75)']
          ]
        },
        threshold: null
      }]
  });



})();
