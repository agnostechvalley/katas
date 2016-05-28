//
// Created by Dan Pallas on 5/23/16.
//

#ifndef POKER_CARD_H
#define POKER_CARD_H

enum suit_t { diamond, heart, spade, club };

struct card_t {
    int value;
    suit_t suit;

    card_t(const int value, const suit_t suit) : value(value), suit(suit) { }
};
#endif //POKER_CARD_H
