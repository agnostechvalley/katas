'use strict';

const Card = require('./card');
const Player = require('./player');

module.exports = class Table {

    constructor () {
        this.players = [];
    };

    // expected input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH";
    // any number of players and cards can be input
    // but we only evaluate the showdown for two players with 5 cards for now
    setTable(tableDescription){
        // trim and split input into tokens
        // ToDo: try/catch/error for valid input
        // ToDo: make sure all cards are valid cards
        // ToDo: how should we allow names with spaces? or should we not allow them?

        // the reg exp trims extra whitespace
        // and reduces any string greater than 1 space into a one character space
        // then splits the input into an array of string tokens
        const tokens = tableDescription.trim().replace(/\s+/g, ' ').split(' ');

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
    }

    sortByRank (player1, player2) {

        if(player1.getRank() > player2.getRank() ) {
            return -1;
        } else if(player1.getRank() < player2.getRank()){
            return 1;
        } else {
            if(player1.getSubRank() > player2.getSubRank() ) {
                return -1;
            } else if(player1.getSubRank() < player2.getSubRank()){
                return 1;
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
        let results = "";
        // rank any of the hands that are still "IN"
        this.players.filter(this.areIn).forEach(this.rankHand);
        // and sort them by their rankings
        this.players.sort(this.sortByRank);

        if( (this.players[0].getRank()=== this.players[1].getRank()) &&
            (this.players[0].getSubRank() === this.players[1].getSubRank())){
            // it's a Tie
            results = "Tie"
        } else {
            let winningPlayer = this.players[0];
            let winningHand = winningPlayer.getHand();
            let otherPlayer = this.players[1];
            let otherHand = otherPlayer.getHand();
            results =   winningPlayer.getName() + " wins - " + winningHand.getShowdownResults(otherHand);
        }
        return results;
    };
};