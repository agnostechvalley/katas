'use strict';

const Assert = require('assert');
const Lab = require('lab');

const Main = require('../lib/main.js');

const lab = exports.lab = Lab.script();

// These five were the first given test cases
//lab.test('it ranks two hands by high card', (done) => {
//    var input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH";
//    var output = "White wins - high card: Ace";
//    Assert( Main(input) === output);
//    done();
//});

//lab.test('it detects a tie of flushes and sub ranks by high card', (done) => {
//    var input = "Black: 2D 3D 5D 9D KD White: 2C 3C 4C 8C AC";
//    var output = "White wins - flush - high card: Ace";
//    Assert( Main(input) === output);
//    done();
//});
//
//lab.test('it detects a full house and ranks it over a flush', (done) => {
//    var input = "Black: 2H 4S 4C 2D 4H White: 2S 8S AS QS 3S";
//    var output = "Black wins - full house";
//    Assert( Main(input) === output);
//    done();
//});
//
//lab.test('it detects a high card tie and subranks by the second highest card', (done) => {
//    var input = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C KH";
//    var output = "Black wins - high card: 9";
//    Assert( Main(input) === output);
//    done();
//});
//
//lab.test('it detects a tie', (done) => {
//    var input = "Black: 2H 3D 5S 9C KD White: 2D 3H 5C 9S KH";
//    var output = "Tie";
//    Assert( Main(input) === output);
//    done();
//});
//
//// additional test cases,
//lab.test('it trims whitespace of the first test', (done) => {
//    var input = "  Black:   2H 3D   5S 9C KD White: 2C 3H 4S 8C AH  ";
//    var output = "White wins - high card: Ace";
//    Assert( Main(input) === output);
//    done();
//});

// two token player names?, bad characters,
// 10 as face value
// low ace or high ace in straight (low ace straight should lose to a 6 high straight)
// tied two pair, tie breaker on fifth card
// giberish input