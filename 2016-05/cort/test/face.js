'use strict';

const Assert = require('assert');
const Lab = require('lab');
const Face = require('../lib/face.js');

const lab = exports.lab = Lab.script();

lab.test('it creates a Face with a name and a value from a code', (done) => {

    const input = "2";
    const outputName = "Two";
    const outputValue = 2;

    const f = new Face(input);
    Assert( f.getCode() === input);
    Assert( f.getName() === outputName);
    Assert( f.getValue() === outputValue);
    done();
});
