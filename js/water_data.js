(function() {
  'use strict';
  window.chart = new Highcharts.StockChart({
      chart: {
          renderTo: 'graph',
          spacingTop: 10,
          spacingBottom: 5,
          backgroundColor: '#ffefb1'
      },
      colors: [
      // colors taken from the palette on this site: http://vitalsigns.org/
      // '#FFCC33', '#4E733D', '#C04420', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59'
      '#051036', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59'
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
            color: '#6E9962',
            fontWeight: 'bold'
          },
          states: {
            hover: {
            },
            select: {
              fill: '#6E9962',
              style: {
                color: 'white'
              }
            }
          }
        },
        inputBoxBorderColor: '#6E9962'
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
      }]

  });
})();
