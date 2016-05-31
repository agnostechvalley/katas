'use strict';

module.exports = function(){

    this.suits = [
        new Suit("H"),
        new Suit("C"),
        new Suit("D"),
        new Suit("S")
    ];

    this.faces = [
        new Face("2"),
        new Face("3"),
        new Face("4"),
        new Face("5"),
        new Face("6"),
        new Face("7"),
        new Face("8"),
        new Face("9"),
        new Face("10"),
        new Face("J"),
        new Face("Q"),
        new Face("K"),
        new Face("A")
    ];

    this.cards = [];
    for (var s = 0; s < this.suits.length; s++) {
        for (var f = 0; f < this.faces.length; f++) {
            this.cards.push(new Card(s, f));
        }
    }
}