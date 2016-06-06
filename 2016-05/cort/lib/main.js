'use strict';

const Table = require('./table');

// ====================================================================
// five-card-showdown
//    expected input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH";
//    expected output = "White wins - high card: Ace";
// ====================================================================
module.exports =  class Main {

    constructor (input){
        const table = new Table(input);
        return table.showdownResults();
    };
};