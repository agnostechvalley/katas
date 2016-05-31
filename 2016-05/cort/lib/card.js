'use strict';

module.exports = function(face, suit) {
    this.face = face;
    this.suit = suit;
    this.toString = function () {
        return this.face.code + this.suit.code;
    };
};
