'use strict';

const Suit = require('./suit');
const Face = require('./face');
const Card = require('./card');
const Player = require('./player');

// tokens come in a form
// playerName: card card card playerName: card card card
// where a playername has no spaces
// and a card is like 3H 10S or KD
// any number of players and cards can be input
// but we only evaluate the showdown for two players with 5 cards for now
module.exports = function (tokens){

    this.players = [];
    while(tokens.length > 0){
        let t = tokens.shift();
        if(t.indexOf(':') != -1){
            // it's a new player
            this.players.push( new Player(t.substr(0, t.indexOf(':'))));
        } else {
            // push the card onto the hand of the current player
            // 10 is a unique face, ToDo: extract this and add to validation
            if(t.charAt(0)=="1"){
                var f = new Face("10");
                var s = new Suit(t.charAt(2));
            } else {
                var f = new Face(t.charAt(0));
                var s = new Suit(t.charAt(1));
            }
            var c = new Card(f,s);
            this.players[this.players.length-1].hand.pushCard(c);
        }
    }
    this.players.forEach(function(player, i, players){
        players[i].hand.sortCards();
    });

    this.isTie = function(){
        let p1rank = this.players[0].getRank();
        let p1subRank = this.players[0].getRank();
        let p2rank = this.players[1].getSubRank();
        let p2subRank = this.players[1].getSubRank();45
        if(p1rank === p2rank && p1subRank === p2subRank){
            return true;
        } else {
            return false;
        }
    };

    this.sortByRank = function (player1, player2) {
        if(player1.getRank() > player2.getRank()) {
            return 1;
        } else if(player1.getRank() < player2.getRank()){
            return -1;
        }
        // if we get here, rank is a tie and we go to the subRank
        if(player1.getSubRank() < player2.getSubRank()){
            return 1;
        } else if(player1.getSubRank() < player2.getSubRank()){
            return -1;
        } else {
            // then it really is a tie
            return 0;
        }
    };

    this.showdownResults = function(){
        this.players[0].hand.toString();

        this.players.sort(this.sortByRank);
        if(this.isTie()) {
            return "Tie";
        } else {
            let winner = this.players[0];
            return winner.name + " wins - " + winner.hand.getDetails();
        }
    };
};
