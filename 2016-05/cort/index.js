'use strict';

var Suit = function (code){
    this.code = code;
    switch (code){
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
    return this;
};
var Face = function (face) {
    this.face = face;
    switch (face) {
        case("2"):
        {
            this.name = "Two";
            this.value = parseInt(face);
            break;
        }
        case("3"):
        {
            this.name = "Three";
            this.value = parseInt(face);
            break;
        }
        case("4"):
        {
            this.name = "Four";
            this.value = parseInt(face);
            break;
        }
        case("5"):
        {
            this.name = "Five";
            this.value = parseInt(face);
            break;
        }
        case("6"):
        {
            this.name = "Six";
            this.value = parseInt(face);
            break;
        }
        case("7"):
        {
            this.name = "Seven";
            this.value = parseInt(face);
            break;
        }
        case("8"):
        {
            this.name = "Eight";
            this.value = parseInt(face);
            break;
        }
        case("9"):
        {
            this.name = "Nine";
            this.value = parseInt(face);
            break;
        }
        case("10"):
        {
            this.name = "Ten";
            this.value = parseInt(face);
            break;
        }
        case("J"):
        {
            this.name = "Jack";
            this.value = 11;
            break;
        }
        case("Q"):
        {
            this.name = "Queen";
            this.value = 12;
            break;
        }
        case("K"):
        {
            this.name = "King";
            this.value = 13;
            break;
        }
        case("A"):
        {
            this.name = "Ace";
            this.value = 14;
            break;
        }
    }
    return this;
};
var Card = function (face, suit){
    this.face = face;
    this.suit = suit;
    this.toString = function(){
        return this.face.face.toString() + this.suit.code;
    };
    return this;
};
var Deck = function (){
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
    for (var s = 0; s < this.suits.length; s++){
        for (var f = 0; f < this.faces.length; f++){
            this.cards.push( new Card(s,f));
        }
    }

    this.shuffle = function(){
    };

    this.drawCard = function(){
        return this.deck.pop();
    };
    return this;
};

var Rank = function (name, rank, subRank, details){
};


//const Rank = class {
//
//    constructor(description, rank, subRank, details){
//        this.name = "Rank";
//        this.description = description;
//        this.rank = rank;
//        this.subRank = subRank;
//        this.details = details;
//    }
//
//    //name: "High Card";
//    //"rank": "1",
//    //"subRank": ,
//    //"details": "high card A"
//}

var ranks = [
    // "High Card"
    new Rank("High Card", 1,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Pair"
    // hasPair(hand)
    // pairFace, remainingRank
    new Rank("Pair", 2,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Two Pair"
    // hasTwoPair,
    // secondaryRank highPair, lowPair, remainingRank
    new Rank("Two Pair", 3,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Three of a Kind"
    // secondaryRank hasTrips, tripsFace
    new Rank("Three of a Kind", 4,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Straight",
    // each faceRank less than previous (or A4321),
    // secondaryRank faceRank unless A
    new Rank("Straight", 5,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Flush",
    // allOneSuit,
    // secondaryRank faceRank
    new Rank("Flush", 6,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Four of a Kind",
    // hasFourOfAKind,
    // secondaryRank fourOfAKindFace
    new Rank("Four of a Kind", 7,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Full House",
    // hasPair && hasTrips,
    // secondaryRank tripsFace
    new Rank("Full House", 8,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Straight Flush"
    // isStraight && isFlush,
    // secondaryRank faceRank
    new Rank("Straight Flush", 9,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    ),

    // "Royal Flush"
    // isStraight && isFlush
    // secondaryRank highCard A
    new Rank("Royal Flush", 10,
        function (hand){
        },
        function(hand){
            return hand.toString();
        }
    )
];


// cards is null or an array of one or more cards
var Hand = function (cards){
    this.cards = cards || [];

    this.pushCard = function(card){
        this.cards.push(card);
    };

    this.popCard = function(){
        return this.cards.pop();
    };

    this.getRank = function(){
        return Math.random()*100;
    };

    this.getSubRank = function(){
        return Math.random()*100;
    };

    this.hasPair = function(){
    };

    this.isStraight = function(){
        // check high and low ace
    };

    this.isFlush = function(){
        let result = false;
        if ( this.cards.every(card => card.suit.name === "Diamonds") ||
            this.cards.every(card => card.suit.name === "Hearts") ||
            this.cards.every(card => card.suit.name === "Spades") ||
            this.cards.every(card => card.suit.name === "Clubs")) {
            result = true;
        }
        return result;
    };

    this.toString = function(){
        let result = "";
        for(var i=0; i<this.cards.length; i++) {
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

var Player = function (name){
    this.name = name;
    this.status = "IN"; // "IN" or "OUT"
    this.hand = new Hand();

    this.getRank= function(){
        console.log("getRank called");
        let ret = this.hand.getRank();
        console.log(ret);
        return ret;
    };

    this.getSubRank = function(){
        console.log("getSubRank called");
        return this.hand.getSubRank();
    };

    return this;
};

// create a showdown with two players
// when we evaluate the showdown
// rank should also add a description of each hand
// test for ties and subrankings,
// the description should include enough information to explain the result
var Table = function (tokens){
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
      // ToDo: ties
      return false;
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
        let results = "Tie";
        this.players.sort(this.sortByRank);
        if(!this.isTie()){
            let winner = this.players[0];
            results = winner.name + " wins - " + winner.hand.getDetails();
        }
        return results;
    };

    return this;
};

var parse = function (input){
    // trim and split input into tokens
    // ToDo: try/catch/error for valid input
    // ToDo: make sure all cards are cards
    // ToDo: what rules to use for names? no names with spaces? That's not great. Could use some thought.
    var tokens = input.trim().replace(/\s+/g, ' ').split(' ');

    return tokens;
};

module.exports = function(input){
    var tokens = parse(input);
    var table = new Table(tokens);
    var results = table.showdownResults();
    return results;
};

