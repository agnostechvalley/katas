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
        this.sortCards();
    };

    sortCards () {
        this.hand.sortCards();
    };

    rankHand () {
        return this.hand.rankHand();
    };

    getRank () {
        return this.hand.getRank();
    };

    getSubRank () {
        return this.hand.getSubRank();
    };

    getHand () {
        return this.hand;
    };

    showdown (otherPlayer) {
        return this.hand.showdown(otherPlayer.getHand());
    };
};
