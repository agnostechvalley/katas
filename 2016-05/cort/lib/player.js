'use strict';

const Hand = require('./hand');

module.exports = function (name){
    this.name = name;
    this.status = "IN"; // "IN" or "OUT"
    this.hand = new Hand();

    this.getRank= function(){
        return this.hand.getRank();
    };

    this.getSubRank = function(){
        return this.hand.getSubRank();
    };

    this.getDetails = function(){
        return this.hand.getDetails();
    };
};
