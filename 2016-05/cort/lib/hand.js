'use strict';

const Rank = require('./rank');

var ranks = [
    // "High Card"
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
    // pairFace, remainingRank
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
    // secondaryRank highPair, lowPair, remainingRank
    new Rank("Two Pair", 3, 0,
        function (hand){
            return hand.hasTwoPair();
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Three of a Kind"
    // secondaryRank hasTrips, tripsFace
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
    // secondaryRank faceRank unless A
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
    // secondaryRank faceRank
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
    // secondaryRank fourOfAKindFace
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
    // secondaryRank faceRank
    new Rank("Straight Flush", 9, 0,
        function (hand){
            return (hand.isStraight() && hand.isFlush());
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Royal Flush"
    // isStraight && isFlush
    // secondaryRank highCard A
    new Rank("Royal Flush", 10, 0,
        function (hand){
            // ToDo: fix this deep probing
            return (hand.isStraight() &&
                    hand.isFlush() &&
                    (hand.cards[0].face.code === "A") &&
                    (hand.cards[1].face.code === "K"));
        },
        function(hand){
            return hand.toString();
        }
    )
];

module.exports = function (cards){
    this.cards = cards || [];

    this.pushCard = function(card){
        this.cards.push(card);
    };

    this.popCard = function(){
        return this.cards.pop();
    };

    this.getFaceValues = function *(hand){
        for (let i = 0; i < hand.cards.length; i++){
            yield hand.cards[i].face.value;
        }
    };

    this.getRank = function(){
        // if isFlush && isStraight
        //  if isStraightFlush
        //      if isRoyalFlush

        // sets pair, twoPair, trips, fours

        // faces
        return Math.random()*100;
    };

    this.getSubRank = function(){
        return Math.random()*100;
    };

    this.getDetails = function(){
        return this.toString();
    };

    this.hasOnePair = function(){
    };

    this.hasTwoPair = function(){
    };

    this.hasTrips = function(){
    };

    this.hasFourOfAKind = function(){
    };

    this.isFullHouse = function(){
    };

    this.isOnePair = function(){
    };

    this.isStraight = function(){
        // check high and low ace straights
        console.log("gogo gadget");
        console.log(getFaceValues());
        console.log(getFaceValues());
        console.log(getFaceValues());
        return result;
    };

    this.isFlush = function(){
        let result = false;
        if (this.cards.every(card => card.suit.name === "Diamonds") ||
            this.cards.every(card => card.suit.name === "Hearts") ||
            this.cards.every(card => card.suit.name === "Spades") ||
            this.cards.every(card => card.suit.name === "Clubs")) {
            result = true;
        };
        return result;
    };

    this.toString = function(){
        let result = "";
        for(let i=0; i<this.cards.length; i++) {
            result = result += this.cards[i].toString() + " ";
        }
        return result;
    };

    this.sortCards = function(){
        this.cards.sort( (card1, card2) => {
            return (card2.face.value - card1.face.value);
        });
    };
};
