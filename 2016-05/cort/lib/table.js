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
                let pName = t.substr(0, t.indexOf(':'));
                this.players.push( new Player(pName));
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
            if(player1.getSubRank() > player2.getSubRank() ) {
                return 1;
            } else if(player1.getSubRank() < player2.getSubRank()){
                return -1;
            } else {
                // then it really is a tie
                return 0;
            }
        }
    };

    areIn (player) {
       return (player.status === "IN");
    };

    rankHand (player) {
        player.rankHand();
    };

    showdownResults () {
        let results = "Tie";
        this.players.filter(this.areIn).forEach(this.rankHand);
        this.players.sort(this.sortByRank);

        if( (this.players[0].getRank()=== this.players[1].getRank()) &&
            (this.players[0].getSubRank() === this.players[1].getSubRank())){
            // 'Tie' is correct
        } else {
            //return this.players[0].getName() + " wins - " + this.players[0].showdown(this.players[1]);
            let winningHand = this.players[0].getHand();
            results = this.players[0].getName() + " wins - " + winningHand.rank.description(winningHand);
        }
        console.log(results);
        return results;
    };
};