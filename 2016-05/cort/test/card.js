'use strict';

const Assert = require('assert');
const Lab = require('lab');

const Suit = require('../lib/suit');
const Face = require('../lib/face');
const Card = require('../lib/card');

const lab = exports.lab = Lab.script();

lab.test('it creates an Ace of Hearts from string of the form AH', (done) => {

    const input = "AH";
    const code = "A";
    const value = 14;
    const name = "Ace";
    const suit = "Hearts";
    const description = "Ace of Hearts";

    const c = new Card(input);
    Assert( c.getCode() === code);
    Assert( c.getName() === name);
    Assert( c.getValue() === value);
    Assert( c.getSuit() === suit);
    Assert( c.toString() === input);
    Assert( c.getDescription() === description);
    done();
});

lab.test('it creates a Ten of Diamonds from a string of the form 10D', (done) => {

    const input = "10D";
    const code = "10";
    const value = 10;
    const name = "Ten";
    const suit = "Diamonds";
    const description = "Ten of Diamonds";

    const c = new Card(input);
    Assert( c.getCode() === code);
    Assert( c.getName() === name);
    Assert( c.getValue() === value);
    Assert( c.getSuit() === suit);
    Assert( c.toString() === input);
    Assert( c.getDescription() === description);
    done();
});
