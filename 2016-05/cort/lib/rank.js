'use strict';

module.exports = class Rank {

    constructor(name, rank, subRank, criteria, details) {

        this.name = name;
        this.rank = rank;
        this.subRank = subRank;
        this.criteria = criteria;
        this.details = details;
    }
};
