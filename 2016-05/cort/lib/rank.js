'use strict';

// a rank has a name, rank, subRank, criteria, description
//
// the rank is an integer, subrank is a function that returns an integer
//
// description is a template string
// think about makeing it so that it can take two hands and their criteria results
// and output a template string that explains the minimal description of who won and why
//
// if so then the criteria results can be an array of cards values that
// can be compared and used to fill the tagged text template

module.exports = class Rank {

    constructor(name, rank, subRank, criteria, description) {

        this.name = name;
        this.rank = rank;
        this.subRank = subRank;
        this.criteria = criteria;
        this.details = description
    }
};
