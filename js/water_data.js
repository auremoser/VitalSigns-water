'use strict';
var chart = new Highcharts.Chart({
    chart: {
        renderTo: 'container'
    },
    colors: [
    // colors taken from the palette on this site: http://vitalsigns.org/
    // '#FFCC33', '#4E733D', '#C04420', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59'
    '#051036', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59'
    ],
    title: {
        text: 'Environmental Reading at Gauging Station - TZA'
    },
<<<<<<< HEAD
=======
    subtitle: {
        text: 'rainfall, water-level, dmf, temperature'
    },
>>>>>>> master
    credits: {
    enabled: false
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
<<<<<<< HEAD
            year: '%b %Y'
=======
            year: '%b'
>>>>>>> master
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
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    },

    series: [{
        // Define the data points.
        name: ''
    }]
});
