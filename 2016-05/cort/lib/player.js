'use strict';

const Hand = require('./hand');

module.exports = class Player {

    constructor(name) {
        this.name = name;
        this.status = "IN";     // "IN" or "OUT"
        this.hand = new Hand();
    };

    pushCard (card) {
        this.hand.pushCard(card);
    };

    rankHand () {
        return this.hand.rankHand();
    };

    getRankValue(){
        return this.hand.getRankValue();
    };

    getSubRank () {
        return this.hand.getSubRank();
    };

    getHand () {
        return this.hand;
    };

    getName() {
        return this.name;
    }
};
