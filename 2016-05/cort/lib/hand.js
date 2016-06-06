'use strict';

const Rank = require('./rank');
const Card = require('./card');

let ranks = [
    // "High Card"
    // up to five face values
    new Rank("High Card", 1, 0,
        function (hand){
            return true;
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Pair"
    // hasPair(hand)
    // pairFace+14^2 + three face values
    new Rank("Pair", 2, 0,
        function (hand){
            return hand.hasOnePair();
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Two Pair"
    // hasTwoPair,
    // highPairFace+14^2 + lowPairFace+14^2 + one face value
    new Rank("Two Pair", 3, 0,
        function (hand){
            return hand.hasTwoPair();
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Three of a Kind"
    // tripsFace+14^3 + two face values
    new Rank("Three of a Kind", 4, 0,
        function (hand){
            return hand.hasTrips();
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Straight",
    // each faceRank less than previous (or A4321),
    // second high card facevalue (disregarding a possible low Ace)
    new Rank("Straight", 5, 0,
        function (hand){
            return hand.isStraight();
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Flush",
    // allOneSuit,
    // five face values
    new Rank("Flush", 6, 0,
        function (hand){
            return hand.isFlush();
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Four of a Kind",
    // hasFourOfAKind,
    // fourOfAKindFace
    new Rank("Four of a Kind", 7, 0,
        function (hand){
            return hand.hasFourOfAKind();
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Full House",
    // hasPair && hasTrips,
    // secondaryRank tripsFace
    new Rank("Full House", 8, 0,
        function (hand){
            return (hand.hasOnePair() && hand.hasTrips());
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Straight Flush"
    // isStraight && isFlush,
    // second high card facevalue (disregarding a possible low Ace)
    new Rank("Straight Flush", 9, 0,
        function (hand){
            return (hand.isStraight() && hand.isFlush());
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Royal Flush"
    // isStraight && isFlush & A & K
    // five face values which will all be identical, so a tie
    new Rank("Royal Flush", 10, 0,
        function (hand){
            // ToDo: fix this deep probing
            return (hand.isStraight() &&
                    hand.isFlush() &&
                    (hand.cards[0].face.getCode() === "A") &&
                    (hand.cards[1].face.getCode() === "K"));
        },
        function(hand){
            return hand.toString();
        }
    )
];

// we can take a set of cards as input
// in the form of '2C 3C 4C 8C AC'
// or we can or push cards on one at a time
module.exports = class Hand {

    constructor (input) {
        this.cards = [];
        if (typeof input === "string"){
            let tokens = input.trim().replace(/\s+/g, ' ').split(' ');
            for(let i=0; i < tokens.length; i++){
                this.cards.push(new Card(tokens[i]));
            }
        };
    };

    pushCard (card) {
        this.cards.push(card);
    };

    showdown (otherHand) {
        let showdownResult = {
            //winnerName or "Tie"
            //primaryRank
            //SubRank
            //description
        };

        //if(this.isTie()) {
        //    return "Tie";
        //} else {
        //    let winner = this.players[0];
        //    return winner.name + " wins - " + winner.hand.getDetails();
        //}
        //return winner.getName + "" + rationale;
        return "Tie";
    };

    isTie () {
        let p1rank = this.players[0].getRank();
        let p1subRank = this.players[0].getRank();
        let p2rank = this.players[1].getSubRank();
        let p2subRank = this.players[1].getSubRank();
        if(p1rank === p2rank && p1subRank === p2subRank){
            return true;
        } else {
            return false;
        }
    };

    getRank () {
        // any pair = face +14 ^2
        // any trips = face +14 ^3

        // full house = trips + pair
        // any four of a kind = face +14 ^4


        // sort the cards and rank the hand by primary rank
        // then give each card a pairRank and resort them by that
        // where any sequence of identical cards
        // gets a pairRank value
        // of the sequence length.
        // so 2 2's will each still be higher than an Ace
        // and 9's over 3's with an Ace is greater than 9's over 3's with a King
        // that way we can have a secondary rank that's just an array of face values
        // where 2 A is for four twos and an ace
        // and is greater than 13 12 11 for three Kings and Queen Jack Kicker
        // note that 222 needs to be more than AA KK, otherwise it's easy modular math

        // if isFlush && isStraight
        //  if isStraightFlush
        //      if isRoyalFlush

        // sets pair, twoPair, trips, fours

        // faces
        return Math.random()*100;
    };

    getPairRanks() {
        return [
            { length:1, faceValue:12},
            { length:2, faceValue:10},
            { length:1, faceValue:4},
            { length:1, faceValue:3}
        ];
    };

    getSubRank () {
        return Math.random()*100;
    };

    getDetails () {
        return this.toString();
    };

    hasOnePair () {
        if(this.getPairRanks.filter(rank => rank.length === 2).length === 1){
            return true;
        } else {
            return false;
        }
    };

    hasTwoPair () {
        if(this.getPairRanks.filter(rank => rank.length === 2).length === 2){
            return true;
        } else {
            return false;
        }
    };

    hasTrips () {
        if(this.getPairRanks.any(rank => rank.length === 3)){
            return true;
        } else {
            return false;
        }
    };

    hasFourOfAKind () {
        if(this.getPairRanks.any(rank => rank.length === 4)){
            return true;
        } else {
            return false;
        }
    };

    hasFullHouse () {
        return this.hasTrips() && this.hasOnePair();
    };

    isStraight () {
        this.sortCards();
        // check high and low ace straights
        // which means that either every card
        // has a face value that is lower than it's leftmost sibling by 1
        // or its an A 5 4 3 2 after being sorted
        let result = true;

        // if its an A 5 sequence
        if( ( this.cards[0].getCode() === "A" ) && ( (this.cards[1].getCode() === "5") )){
            // try the 5 4 3 2 part
            for (let i = 1; i < this.cards.length-1; i++){
                if(this.cards[i].getValue() !== this.cards[i+1].getValue()+1 ){
                    result = false;
                };
            }
            result = true;
        } else {
            // otherwise we test for all the other straights
            for ( let i = 0; i < this.cards.length-1; i++){
                if( this.cards[i].getValue() !== this.cards[i+1].getValue()+1 ){
                    result = false;
                };
            }
        };
        // if we get through all that it's  a straight
        return result;
    };

    isFlush () {
        let result = false;
        if (this.cards.every( card => card.suit.name === "Diamonds") ||
            this.cards.every( card => card.suit.name === "Hearts") ||
            this.cards.every( card => card.suit.name === "Spades") ||
            this.cards.every( card => card.suit.name === "Clubs")) {
            result = true;
        };
        return result;
    };

    sortCards () {
        this.cards.sort( (card1, card2) => {
            return (card2.getValue() - card1.getValue());
        });
    };

    toString () {
        let result = "";
        for(let i=0; i<this.cards.length; i++) {
            result = result += this.cards[i].toString();
            if (i < this.cards.length-1){
                result = result + ' ';
            }
        }
        return result;
    };
};
