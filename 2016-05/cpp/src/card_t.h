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

    static bool less_than_by_value(const card_t &c1, const card_t &c2) {
        return c1.value < c2.value;
    }
};
#endif //POKER_CARD_H