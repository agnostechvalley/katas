'use strict';

module.exports = class Deck {

    constructor(){

        this.suits = [
            new Suit('H'),
            new Suit('C'),
            new Suit('D'),
            new Suit('S')
        ];

        this.faces = [
            new Face('2'),
            new Face('3'),
            new Face('4'),
            new Face('5'),
            new Face('6'),
            new Face('7'),
            new Face('8'),
            new Face('9'),
            new Face('10'),
            new Face('J'),
            new Face('Q'),
            new Face('K'),
            new Face('A')
        ];

        this.cards = [];
        for (let i = 0; i < this.suits.length; ++i) {
            for (let j = 0; j < this.faces.length; ++j) {
                this.cards.push(new Card(i, j));
            }
        }
    };
};

