'use strict';

const Assert = require('assert');
const Lab = require('lab');

const Suit = require('../lib/suit');
const Face = require('../lib/face');
const Card = require('../lib/card.js');

const lab = exports.lab = Lab.script();

lab.test('it creates a card from string of the form AH or 10D', (done) => {

    const input = "AH";
    const outputCode = "A";
    const outputName = "Ace";

    const c = new Card(input);
    Assert( c.getCode() === outputCode);
    Assert( c.getName() === outputName);
    Assert( c.toString() === input);
    done();
});

