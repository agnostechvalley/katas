'use strict';

const Rank = require('./rank');
const Card = require('./card');

// ====================================
// Hand
//
// we can take a set of cards as input
// in the form of '2C 3C 4C 8C AC'
// or we can or push cards on one at a time
// call rankHand() before
// ====================================
module.exports = class Hand {

    constructor (input) {
        this.cards = [];
        if (typeof input === "string"){
            let tokens = input.trim().replace(/\s+/g, ' ').split(' ');
            for(let i=0; i < tokens.length; i++){
                this.cards.push(new Card(tokens[i]));
            };
        };

        // a rank has a name, rank, subRank, criteria and description
        this.ranks = [
            new Rank("royal flush", 10,
                (hand) => {
                    // all royal flushes have the same subrank value and are tied
                    return 0;
                },
                (hand) => {
                    // check that both A and K are there in case of a low Ace straight
                    return (hand.isStraight() &&
                    hand.isFlush() &&
                    (hand.cards[0].getCode() === "A") &&
                    (hand.cards[1].getCode() === "K"));
                },
                (hand) => {
                    return `${hand.getRank().name}`
                }
            ),
            new Rank("straight flush", 9,
                (hand) => {
                    // second high cards facevalue (also so we disregard a possible low Ace straight)
                    return hand.cards[2].getValue();
                },
                (hand) => {
                    return (hand.isStraight() && hand.isFlush());
                },
                (hand) => {
                    let first = hand.cards[0].getName();
                    let second = hand.cards[1].getName();
                    if((first === "Ace")&&(second === "Five")){
                        return `${hand.getRank().name}: ${second} high`
                    } else {
                        return `${hand.getRank().name}: ${first} high`
                    }
                }
            ),
            new Rank("four of a kind", 8,
                (hand) => {
                    //face +14^4 + kicker value
                    hand.sortCardsByPairRank();
                    let result = Math.pow(hand.cards[0].getValue()+14, 4);
                    result += hand.cards[4].getValue();
                    return result;
                },
                (hand) => {
                    return hand.hasFourOfAKind();
                },
                (hand) => {
                    // four fourOfAKindCardName 's
                    hand.sortCardsByPairRank();
                    return `${hand.getRank().name}: four ${hand.cards[0].getName()}'s`
                }
            ),
            new Rank("full house", 7,
                (hand) => {
                    //tripsFace+14^2 + pairFace
                    hand.sortCardsByPairRank();
                    return Math.pow(hand.cards[0].getValue()+14, 2) + hand.cards[3].getValue();
                },
                (hand) => {
                    return (hand.hasHighPair() && hand.hasTrips());
                },
                (hand) => {
                    // tripsFace over pairface
                    hand.sortCardsByPairRank();
                    return `${hand.getRank().name}: ${hand.cards[0].getName()}'s over ${hand.cards[3].getName()}'s`
                }
            ),
            new Rank("flush", 6,
                (hand) => {
                    // same as face rank
                    let result = Math.pow(hand.cards[0].getValue()+14, 4);
                    result += Math.pow(hand.cards[1].getValue()+14, 3);
                    result += Math.pow(hand.cards[2].getValue()+14, 2);
                    result += Math.pow(hand.cards[3].getValue()+14, 1);
                    result += hand.cards[4].getValue();
                    return result;
                },
                (hand) => {
                    return hand.isFlush();
                },
                (hand) => {
                    return `${hand.getRank().name}: ${hand.cards[0].getCode()} ${hand.cards[1].getCode()} ${hand.cards[2].getCode()} ${hand.cards[3].getCode()} ${hand.cards[4].getCode()}`
                }
            ),
            new Rank("straight", 5,
                (hand) => {
                    // second high cards facevalue (also so we disregard a possible low Ace straight)
                    if((hand.cards[0].getCode() === "A") && (hand.cards[1].getCode() === "5")){
                        // return the 5, rather than the ace
                        return hand.cards[1].getValue();
                    } else {
                        return hand.cards[0].getValue();
                    }
                },
                (hand) => {
                    // each faceRank less than previous (or A5432),
                    return hand.isStraight();
                },
                (hand) => {
                    // second high card facevalue (disregarding a possible low Ace)
                    let first = hand.cards[0].getName();
                    return `${hand.getRank().name}: ${first} high`
                }
            ),
            new Rank("three of a kind", 4,
                (hand) => {
                    hand.sortCardsByPairRank();
                    // face +14 ^3 face^i for i = 1, 0
                    // include the kickers in case we add wildcards in the future
                    // which would enable multiple trips of the same rank
                    let result = Math.pow(hand.cards[0].getValue()+14, 3);
                    result += Math.pow(hand.cards[3].getValue()+14,2);
                    result += Math.pow(hand.cards[4].getValue());
                    return result;
                },
                (hand) => {
                    return hand.hasTrips();
                },
                (hand) => {
                    hand.sortCardsByPairRank();
                    // tripsFace+14^3 + two face values
                    return `${hand.getRank().name}: three ${hand.cards[0].getName()}'s, ${hand.cards[3].getCode()} ${hand.cards[4].getCode()} kickers`
                }
            ),
            new Rank("two pair", 3,
                (hand) => {
                    //face +14 ^4 + face +14 ^4 + face
                    hand.sortCardsByPairRank();
                    let result = Math.pow(hand.cards[0].getValue()+14, 4);
                    result += Math.pow(hand.cards[2].getValue()+14, 4);
                    result += hand.cards[4].getValue();
                    return result;
                },
                (hand) => {
                    return hand.hasHighPair() && hand.hasLowPair();
                },
                (hand) => {
                    // highPairFace+14^2 + lowPairFace+14^2 + one face value
                    hand.sortCardsByPairRank();
                    return `${hand.getRank().name}: ${hand.cards[0].getName()}'s over ${hand.cards[2].getName()}'s, ${hand.cards[4].getCode()} kicker`

                }
            ),
            new Rank("pair", 2,
                (hand) => {
                    hand.sortCardsByPairRank();
                    //face +14 ^4 + face^i for i = 2, 1, 0
                    let result = Math.pow(hand.cards[0].getValue()+14, 4);
                    result += Math.pow(hand.cards[2].getValue()+14, 2);
                    result += Math.pow(hand.cards[3].getValue()+14, 1);
                    result += hand.cards[4].getValue();
                    return result;
                },
                (hand) => {
                    return hand.hasHighPair();
                },
                (hand) => {
                    // pairFace+14^2 + three face values
                    hand.sortCardsByPairRank();
                    return `${hand.getRank().name}: two ${hand.cards[0].getName()}'s, ${hand.cards[2].getCode()} ${hand.cards[3].getCode()} ${hand.cards[4].getCode()} kickers`
                }
            ),
            new Rank("high card", 1,
                (hand) => {
                    // face+14^i
                    let result = Math.pow(hand.cards[0].getValue()+14, 4);
                    result += Math.pow(hand.cards[1].getValue()+14, 3);
                    result += Math.pow(hand.cards[2].getValue()+14, 2);
                    result += Math.pow(hand.cards[3].getValue()+14, 1);
                    result += hand.cards[4].getValue();
                    return result;
                },
                (hand) => {
                    //criteria: high card is always true
                    return true;
                },
                (hand) => {
                    // up to five face values
                    return `${hand.getRank().name}: ${hand.cards[0].getName()}`
                }
            )
        ];
    };

    pushCard (card) {
        this.cards.push(card);
    };

    rankHand() {
        // sort the cards
        this.sortCards();

        let numCards = this.cards.length;
        // then give each card a pairRank
        for ( let i = 0; i < numCards; i++){
            let faceValue = this.cards[i].getValue();
            let count = 0;
            let j = i;
            while( (j < numCards) && faceValue === this.cards[j].getValue() ) {
                count++;
                j++;
            };
            for (let k=i; k<j; k++){
                this.cards[k].setPairRank(count);
            };
            i=j-1
        };
        // resort the cards by pairRank
        this.sortCardsByPairRank();
        // so 3 or four of a kind
        // will be higher (to the left) of a pair
        // even if the pair or a kicker has a higher face value
        // this will make accessing the values easier
        // and wont affect straights or flushes or faceRank
        // as those cards will all have the same pairRank

        // for each rank in ranks
        // pass this hand into the criteria function from highest to lowest
        // and when we find a match we break out and return it
        for (let r = 0; r < this.ranks.length; r++){
            if(this.ranks[r].criteria(this) === true){
                this.rank = this.ranks[r];
                break;
            }
        }
    };

    rankHand2() {
        // sort the cards
        this.sortCards();

        let numCards = this.cards.length;
        // then give each card a pairRank
        for ( let i = 0; i < numCards; i++){
            let faceValue = this.cards[i].getValue();
            let count = 0;
            let j = i;
            while( (j < numCards) && faceValue === this.cards[j].getValue() ) {
                count++;
                j++;
            };
            for (let k=i; k<j; k++){
                this.cards[k].setPairRank(count);
            };
            i=j-1
        };
        // resort the cards by pairRank
        this.sortCardsByPairRank();
        // so 3 or four of a kind
        // will be higher (to the left) of a pair
        // even if the pair or a kicker has a higher face value
        // this will make accessing the values easier
        // and wont affect straights or flushes or faceRank
        // as those cards will all have the same pairRank
    };

    // true if there is either one or two pair
    hasHighPair () {
        const numPair = this.cards.filter(card => card.getPairRank() === 2).length
        if( numPair >= 1){
            return true;
        } else {
            return false;
        };
    };

    // only true if there are two pair
    // so there will be 4 cards total with pairRank of 2
    hasLowPair () {
        if(this.cards.filter(card => card.getPairRank() === 2).length === 4){
            return true;
        } else {
            return false;
        };
    };

    hasTrips () {
        if(this.cards.some(card => card.getPairRank() === 3)){
            return true;
        } else {
            return false;
        }
    };

    hasFourOfAKind () {
        if(this.cards.some(card => card.getPairRank() === 4)){
            return true;
        } else {
            return false;
        }
    };

    isStraight () {
        this.sortCards();
        // check high and low ace straights
        // which means that either every card
        // has a face value that is lower than it's leftmost sibling by 1
        // or its an A 5 4 3 2 after being sorted
        let result = true;

        // if its an A 5 sequence
        if( ( this.cards[0].getCode() === "A" ) && ( (this.cards[1].getCode() === "5") )){
            // try the 5 4 3 2 part
            for (let i = 1; i < this.cards.length-1; i++){
                if(this.cards[i].getValue() !== this.cards[i+1].getValue()+1 ){
                    result = false;
                };
            }
            result = true;
        } else {
            // otherwise we test for all the other straights
            for ( let i = 0; i < this.cards.length-1; i++){
                if( this.cards[i].getValue() !== this.cards[i+1].getValue()+1 ){
                    result = false;
                };
            }
        };
        // if we get through all that it's  a straight
        return result;
    };

    isFlush () {
        let result = false;
        if (this.cards.every( card => card.suit.getName()=== "Diamonds") ||
            this.cards.every( card => card.suit.getName() === "Hearts") ||
            this.cards.every( card => card.suit.getName() === "Spades") ||
            this.cards.every( card => card.suit.getName() === "Clubs")) {
            result = true;
        };
        return result;
    };

    sortCards () {
        this.cards.sort( (card1, card2) => {
            return (card2.getValue() - card1.getValue());
        });
    };

    sortCardsByPairRank () {
        this.cards.sort( (card1, card2) => {
            if(card2.getPairRank() < card1.getPairRank() ) {
                return -1;
            } else if(card2.getPairRank() > card1.getPairRank()){
                return 1;
            } else {
                // when tied continue to rank by regular value
                if(card2.getValue() < card1.getValue() ) {
                    return -1;
                } else if(card2.getValue() > card1.getValue()){
                    return 1;
                } else {
                    // then it really is a tie
                    return 0;
                }
            }
        });
    };

    getRank() {
        return this.rank;
    };

    getRankValue () {
        return this.rank.rank;
    };

    getSubRank () {
        return this.rank.subRank(this);
    };

    getShowdownResults(hand) {
        return this.rank.description(this);
    };

    toString () {
        let result = "";
        for(let i=0; i<this.cards.length; i++) {
            result = result += this.cards[i].toString();
            if (i < this.cards.length-1){
                result = result + ' ';
            }
        }
        return result;
    };
};