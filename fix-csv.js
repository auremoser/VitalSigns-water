#!/usr/bin/env node

var dsv = require('dsv');
var fs = require('fs');
var _ = require('underscore');

var originalCsvFile = __dirname + '/data/TZA_SAGCOT_original.csv'
var cleanedCsvFile = __dirname + '/data/TZA_SAGCOT_cleaned.csv'
var cleanedMappingFile = __dirname + '/data/mapping.json'

var data = fs.readFileSync(originalCsvFile, 'UTF-8')

var originalCsv = dsv.csv.parse(data);

// Assign a unique ID if the scn is missing
_.each(originalCsv, function(d) {
	d.scn = d.scn || _.uniqueId('unknown')
});

var groupedBySCN = _.groupBy(originalCsv, function(d) {
	return d.scn
});

var mapping = {}

_.each(groupedBySCN, function(stations, scn) {
	var tmp = []
	_.each(stations, function(station) {
		if (station['basin water office data filename']) {
			tmp.push({
				file: station['basin water office data filename'],
				datatype: station['Datatype']
			})
		}
	})
	if (tmp.length) {
		mapping[scn] = tmp
	}
})

console.log(mapping)
fs.writeFileSync(cleanedMappingFile, JSON.stringify(mapping))

var cleaned = []

_.each(groupedBySCN, function(stations) {
	var station = stations[0]
	station.data = _.some(stations, function(d) {
		return d['basin water office data filename']
	})
	delete(station['Datatype'])
	delete(station['directory'])
	delete(station['basin water office data filename'])
	cleaned.push(station)
})

// console.log(cleaned)

fs.writeFileSync(cleanedCsvFile, dsv.csv.format(cleaned))

