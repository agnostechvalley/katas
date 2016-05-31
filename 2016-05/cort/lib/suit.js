'use strict';

module.exports = function Suit(code) {
    this.code = code;
    switch (code) {
        case("H"):{
            this.name = "Hearts";
            break;
        }
        case("D"):{
            this.name = "Diamonds";
            break;
        }
        case("C"):{
            this.name = "Clubs";
            break;
        }
        case("S"):{
            this.name = "Spades";
            break;
        }
    }
}