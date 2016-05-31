'use strict';

const Table = require('./table');

var parse = function (input){
    // trim and split input into tokens
    // ToDo: try/catch/error for valid input
    // ToDo: make sure all cards are cards
    // ToDo: what rules to use for names? no names with spaces?
    var tokens = input.trim().replace(/\s+/g, ' ').split(' ');

    return tokens;
};

module.exports = function(input){
    const tokens = parse(input);
    const table = new Table(tokens);
    const results = table.showdownResults();
    return results;
};

