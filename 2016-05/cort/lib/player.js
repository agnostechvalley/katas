'use strict';

const Hand = require('./hand');

module.exports = class Player {

    construcor(name) {
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

    getRank () {
        return this.hand.getRank();
    };

    getHand () {
        return this.hand;
    };

    showdown (otherPlayer) {
        return this.hand.showdown(otherPlayer.getHand());
    };
};
