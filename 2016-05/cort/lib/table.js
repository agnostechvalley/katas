'use strict';

const Card = require('./card');
const Player = require('./player');

// expected input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH";
// any number of players and cards can be input
// but we only evaluate the showdown for two players with 5 cards for now
module.exports = class Table {

    constructor (input) {

        // trim and split input into tokens
        // ToDo: try/catch/error for valid input
        // ToDo: make sure all cards are cards
        // ToDo: what rules to use for names? no names with spaces?

        // specificallly the reg exp trims extra whitespace
        // and reduces any string greater than 1 space into a one character space
        // then splits the input into an array of string tokens
        const tokens = input.trim().replace(/\s+/g, ' ').split(' ');

        this.players = [];
        while( tokens.length > 0 ){
            let t = tokens.shift();
            if( t.indexOf(':') != -1 ){
                // it's a new player
                this.players.push( new Player(t.substr(0, t.indexOf(':'))));
            } else {
                // push the card onto the hand of the current player
                let c = new Card(t);
                this.players[this.players.length-1].pushCard(c);
            }
        };
    };

    sortByRank (player1, player2) {

        if(player1.getRank() > player2.getRank() ) {
            return 1;
        } else if(player1.getRank() < player2.getRank()){
            return -1;
        } else {
            // then it really is a tie
            return 0;
        }
    };

    showdownResults () {

        this.players.sort(this.sortByRank);
        return this.players[0].showdown(this.players[1]);
    };
};