'use strict';

const Assert = require('assert');
const Lab = require('lab');

const Main = require('../lib/main.js');

const lab = exports.lab = Lab.script();

// These five were the first given test cases
lab.test('it ranks two hands by high card, white wins', (done) => {

    let main =  new Main();
    let input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH";
    let output = "White wins - high card: Ace";

    let results = main.getShowdownResults(input);
    Assert( results  === output);
    done();
});

lab.test('it ranks two hands by high card, black wins', (done) => {

    let main =  new Main();
    let input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C QH";
    let output = "Black wins - high card: King";

    Assert( main.getShowdownResults(input) === output);
    done();
});

lab.test('it detects a tie of flushes and sub ranks by high card', (done) => {

    let main =  new Main();
    let input = "Black: 2D 3D 5D 9D KD White: 2C 3C 4C 8C AC";
    let output = "White wins - flush: A 8 4 3 2";

    let results = main.getShowdownResults(input);
    Assert( results  === output);
    done();
});

lab.test('it detects a full house and ranks it over a flush', (done) => {

    let main =  new Main();
    let input = "Black: 2H 4S 4C 2D 4H White: 2S 8S AS QS 3S";
    let output = "Black wins - full house: Four's over Two's";

    let results = main.getShowdownResults(input);
    Assert( results  === output);
    done();
});

lab.test('it detects a full house and ranks it over a flush reversing input order', (done) => {

    let main =  new Main();
    let input = "White: 2S 8S AS QS 3S Black: 2H 4S 4C 2D 4H ";
    let output = "Black wins - full house: Four's over Two's";

    let results = main.getShowdownResults(input);
    Assert( results  === output);
    done();
});

lab.test('it detects a high card tie and subranks by the second highest card', (done) => {

    let main =  new Main();
    let input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C KH";
    let output = "Black wins - high card: King";

    let results = main.getShowdownResults(input);
    Assert( results  === output);
    done();
});

lab.test('it detects a tie', (done) => {

    let main =  new Main();
    let input = "Black: 2H 3D 5S 9C 7D White: 2D 3H 5C 9S 7H";
    let output = "Tie";

    let results = main.getShowdownResults(input);
    Assert( results  === output);
    done();
});

// additional test cases,
lab.test('it trims whitespace of the first test', (done) => {

    let main =  new Main();
    let input = "  Black:   2H 3D   5S 9C KD White: 2C 3H 4S 8C AH  ";
    let output = "White wins - high card: Ace";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});


lab.test('it ranks two royal flushes as a tie', (done) => {

    let main =  new Main();
    let input = "Black: AH KH JH QH 10H White: 10D KD AD JD QD";
    let output = "Tie";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});

lab.test('it ranks two straight flushes by subrank', (done) => {

    let main =  new Main();
    let input = "Black: 10H KH JH QH 9H White: 10D 8D 9D JD QD";
    let output = "Black wins - straight flush: King high";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});


lab.test('it compares two four of a kinds by subrank', (done) => {

    let main =  new Main();
    let input = "Black: KD KH KS KC 9H White: 8D 8H 8S 8C QD";
    let output = "Black wins - four of a kind: four King's";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});

lab.test('it compares two full houses by subrank', (done) => {

    let main =  new Main();
    let input = "Black: KD KH KS 2C 2H White: 8D 8H 8S QC QD";
    let output = "Black wins - full house: King's over Two's";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});

lab.test('it compares two straights by subrank', (done) => {

    let main =  new Main();
    let input = "Black: AD 2H 3S 4C 5H White: 2D 3H 4S 5C 6D";
    let output = "White wins - straight: Six high";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});

lab.test('it compares two three of a kind by subrank', (done) => {

    let main =  new Main();
    let input = "Black: 7D 7H 7S 4C 5H White: 2D 2H 2S 5C 6D";
    let output = "Black wins - three of a kind: three Seven's, 5 4 kickers";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});


lab.test('it compares 2 tied two pair by the kicker', (done) => {

    let main =  new Main();
    let input = "Black: 7D 7H 5S 5C 4H White: 7S 7C 5D 5H 2D";
    let output = "Black wins - two pair: Seven's over Five's, 4 kicker";

    let results = main.getShowdownResults(input);
    Assert( results === output);
    done();
});

lab.test('it compares 2 single pair by subrank', (done) => {

    let main =  new Main();
    let input = "Black: 7D 7H 8S 5C 4H White: 7S 7C 3D 5H 2D";
    let output = "Black wins - pair: two Seven's, 8 5 4 kickers";

    let results = main.getShowdownResults(input);
    //console.log(results);
    Assert( results === output);
    done();
});

lab.test('it ranks a King high straight flush above an Ace low straight Flush', (done) => {

    let main =  new Main();
    let input = "Black: KH JH QH 9H 10H White: 5D 3D AD 2D 4D";
    let output = "Black wins - straight flush: King high";

    let results = main.getShowdownResults(input);
    Assert( results  === output);
    done();
});
