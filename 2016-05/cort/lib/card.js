'use strict';

const Suit = require('./suit');
const Face = require('./face');

module.exports = class Card {

    constructor(cardAsString) {

        // check for 10 which is a unique face in that it has two characters
        if ( cardAsString.charAt(0) === '1'){
            // then the face value is a 10
            this.face = new Face('10');
            this.suit = new Suit( cardAsString.charAt(2));
        }
        else {
            this.face = new Face(cardAsString.charAt(0));
            this.suit = new Suit(cardAsString.charAt(1));
        }
        this.pairRank = 1;
    };

    setPairRank(newRank) {

        this.pairRank = newRank;
    };

    getPairRank(){

        return this.pairRank;
    };

    getCode(){

        return this.face.getCode();
    };

    getValue(){

        return this.face.getValue();
    };

    getName(){

        return this.face.getName();
    };

    getDescription(){

        return this.face.getName() + ' of ' + this.suit.getName();
    };

    getSuit(){

        return this.suit.getName();
    };

    toString(){

        return this.face.getCode() + this.suit.getCode();
    };
};


