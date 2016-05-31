'use strict';

const Assert = require('assert');
const Lab = require('lab');
const Suit = require('../lib/suit.js');

const lab = exports.lab = Lab.script();

lab.test('it creates a named Heart from the H code', (done) => {
    const input = "H";
    const output = "Hearts";
    const s = new Suit(input);
    Assert( s.code === input);
    Assert( s.name === output);
    done();
});

lab.test('it creates a named Diamond from the D code', (done) => {
    const input = "D";
    const output = "Diamonds";
    const s = new Suit(input);
    Assert( s.code === input);
    Assert( s.name === output);
    done();
});

lab.test('it creates a named Club from the C code', (done) => {
    const input = "C";
    const output = "Clubs";
    const s = new Suit(input);
    Assert( s.code === input);
    Assert( s.name === output);
    done();
});

lab.test('it creates a named Spade from the S code', (done) => {
    const input = "S";
    const output = "Spades";
    const s = new Suit(input);
    Assert( s.code === input);
    Assert( s.name === output);
    done();
});
