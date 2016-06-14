'use strict';

const Table = require('./table');

// ====================================================================
// five-card-showdown
// ====================================================================
module.exports =  class Main {

    constructor (config){
        this.config = config;
        this.table = new Table();
    };

    // expected input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH";
    // expected output = "White wins - high card: Ace";
    getShowdownResults(input){

        this.table.setTable(input);
        let results = this.table.showdownResults();

        return results;
    }
};