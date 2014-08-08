#!/usr/bin/env node

var dsv = require('dsv');
var fs = require('fs');
var _ = require('underscore');

var dataDir = __dirname + '/../data/';
var originalCsvFile = dataDir + 'TZA_SAGCOT_original.csv';
var cleanedCsvFile = dataDir + 'TZA_SAGCOT_cleaned.csv';
var cleanedMappingFile = dataDir + 'mapping.json';

var stationFiles = fs.readdirSync(dataDir + 'stations-raw/');

var timeRegEx = /\d\d:\d\d:\d\d/

var lastDataPoints = {}

// console.log(stationFiles);
stationFiles.forEach(function(stationFile) {
	var f = fs.readFileSync(dataDir + 'stations-raw/' + stationFile, 'UTF-8');
	console.log(stationFile);
	var rows = f.split('\r\n')

	rows = rows.map(function(row) {
		var cells = row.split(',')
		if (!cells[0]) return;
		// console.log(cells[0])
		var date, value
		if (timeRegEx.test(cells[1])) {
			// TODO parse time in to date as well
			date = new Date(Date.parse(cells[0]))
			value = cells[2]
		} else {
			// no time
			date = new Date(Date.parse(cells[0]))
			value = cells[1]
		}
		date = date.toISOString().slice(0, 10)
		return [date, value]
	})
	rows = _.compact(rows)
	rows = rows.filter(function(row) {
		return row[1] !== ''
	})
	rows.forEach(function(row) {
		row[1] = parseFloat(row[1])
	})

	lastDataPoints[stationFile] = _.last(rows)

	var output = rows.join('\n')
	fs.writeFileSync(dataDir + 'stations/' + stationFile, output);
});


var data = fs.readFileSync(originalCsvFile, 'UTF-8');

var originalCsv = dsv.csv.parse(data);

// Assign a unique ID if the scn is missing
_.each(originalCsv, function(d) {
	d.scn = d.scn || _.uniqueId('unknown');
	if ('name' === d.Datatype) {
		d.Datatype = null;
	}
});

var groupedBySCN = _.groupBy(originalCsv, function(d) {
	return d.scn;
});

var mapping = {};
// Group files by station name (SCN); let multiple files link to same point on map
_.each(groupedBySCN, function(stations, scn) {
	var tmp = []
	_.each(stations, function(station) {
		var filename = station['basin water office data filename']
		if (filename) {
			tmp.push({
				file: filename,
				lastDataPoint: lastDataPoints[filename],
				datatype: station['Datatype']
			})
		}
	})
	if (tmp.length) {
		mapping[scn] = tmp
	}
});

// console.log(mapping);
fs.writeFileSync(cleanedMappingFile, JSON.stringify(mapping));

var cleaned = [];
// Remove columns that change: datatype, basin water .txt reference
_.each(groupedBySCN, function(stations) {
	var station = stations[0];
	station.data = _.some(stations, function(d) {
		return d['basin water office data filename'];
	});
// Run over array pluck out datatypes, compact out the 'nulls', sort them, and join them in a string
	station.datatypes = _.compact(_.pluck(stations, 'Datatype')).sort().join(', ')
	delete(station['Datatype']);
	delete(station['directory']);
	delete(station['basin water office data filename']);
	cleaned.push(station);
});

// console.log(cleaned)

fs.writeFileSync(cleanedCsvFile, dsv.csv.format(cleaned));

