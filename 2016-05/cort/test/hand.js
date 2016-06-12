'use strict';

const Assert = require('assert');
const Lab = require('lab');
const Card = require('../lib/card.js');
const Hand = require('../lib/hand.js');

const lab = exports.lab = Lab.script();

lab.test('it creates a hand from a string of cards', (done) => {

    const input = '2C 3C 4C 8C AC';
    let hand = new Hand(input);
    Assert( hand.toString() === input);
    done();
});

lab.test('it creates a hand from a list of individual cards', (done) => {

    let hand = new Hand();
    const input = '2C 3C 4C 8C AC';
    const tokens = input.split(' ');

    for(let i=0; i < tokens.length; i++){
        hand.pushCard(new Card(tokens[i]));
    }
    Assert( hand.toString() === input);
    done();
});

lab.test('it sorts a hand by face value', (done) => {

    const input = '3C 2S 4C 8D AC';
    const output = 'AC 8D 4C 3C 2S';
    const hand = new Hand(input);

    hand.sortCards();

    Assert( hand.toString() === output);
    done();
});

lab.test('it determines if a hand is a flush', (done) => {

    const input = '2C 3C 4C 8C AC';
    const hand = new Hand(input);

    Assert( hand.isFlush() == true);
    done();
});

lab.test('it determines if a hand is not a straight', (done) => {

    const input = '10C 2C 4C 8C 5C';
    const hand = new Hand(input);

    Assert( hand.isStraight() === false);
    done();
});

lab.test('it determines if a hand is a straight', (done) => {

    const input = '3C 2C 4C 6S 5C';
    const hand = new Hand(input);

    Assert( hand.isStraight() === true);
    done();
});

lab.test('it determines if a hand is a straight with a low end Ace', (done) => {

    const input = '3C 2C 4C AS 5C';
    const hand = new Hand(input);

    Assert( hand.isStraight() === true);
    done();
});

// determines if a hand is a royal flush by using the ranking function
// as opposed to the tests above that just test utility functions
lab.test('it ranks a hand as a royal flush', (done) => {

    const input = 'AC QC KC 10C JC';
    let hand = new Hand(input);
    hand.rankHand();
    let rank = hand.getRank();

    Assert( rank.name === "royal flush");
    done();
});


// determines if a hand is a straight flush
// determines if a hand is four of a kind
// determines if a hand is a full house

// determines if a hand is a straight
// determines if a hand is three of a kind
// determines if a hand is two pair
// determines if a hand is a pair
// determines if a hand is high card

// compares two hands by face card rank
// compares two straights by face card rank
// compares two flushes by face card rank
// compares two four of a kinds by fours rank
// compares two full houses by trips pair rank
// compares two trips by trip face rank
// compares two two pair hands by high pair, low pair, kicker
// compares two pair by pair rank, then by face card rank