'use strict';

module.exports = class Suit {

    constructor(code) {

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
        };
    };

    getCode () {
        return this.code;
    };

    getName () {
        return this.name;
    };
};