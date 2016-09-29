'use strict';

const Card = require('./card');
const Player = require('./player');

module.exports = class Table {

    constructor() {

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
        while (tokens.length > 0){
            const t = tokens.shift();
            if (t.indexOf(':') !== -1 ){
                const pName = t.substr(0, t.indexOf(':'));
                this.players.push( new Player(pName));
            }
            else {
                // push the card onto the hand of the current player
                const c = new Card(t);
                this.players[this.players.length - 1].pushCard(c);
            }
        };
    }

    sortByRank(player1, player2) {

        let result = 0;

        if (player2.getRankValue() < player1.getRankValue() ) {
            result = -1;
        }
        else if (player2.getRankValue() > player1.getRankValue()){
            result = 1;
        }
        else {
            if (player1.getSubRank() < player2.getSubRank() ) {
                result = 1;
            }
            else if (player1.getSubRank() > player2.getSubRank()){
                result = -1;
            }
            else {
                // then it really is a tie
                result = 0;
            }
        }
        return result;
    };

    areIn(player) {

        return (player.status === 'IN');
    };

    rankHand(player) {

        player.rankHand();
    };

    showdownResults() {

        let results = '';
        // rank any of the hands that are still "IN"
        this.players.filter(this.areIn).forEach(this.rankHand);
        // and sort them by their rankings
        this.players.sort(this.sortByRank);

        const winningPlayer = this.players[0];
        const winningHand = winningPlayer.getHand();
        const secondPlacePlayer = this.players[1];
        const secondPlaceHand = secondPlacePlayer.getHand();
        if ((winningPlayer.getRankValue() === secondPlacePlayer.getRankValue()) &&
            (winningPlayer.getSubRank() === secondPlacePlayer.getSubRank())){
            results = 'Tie';
        }
        else {
            results =   winningPlayer.getName() + ' wins - ' + winningHand.getShowdownResults(secondPlaceHand);
        }
        return results;
    };
};

