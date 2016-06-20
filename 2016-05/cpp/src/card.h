//
// Created by Dan Pallas on 5/23/16.
//

#ifndef POKER_CARD_H
#define POKER_CARD_H

#include <string>
#include <stdexcept>
#include <cstdlib>
#include <ostream>

namespace agnostech {
namespace poker {

enum class suit_t { diamond, heart, spade, club };

struct card_t {
    int value;
    suit_t suit;


    std::string to_string() const;
    friend std::ostream& operator << ( std::ostream& os, const card_t& rhs );

    static bool less_than_by_value(const card_t &c1, const card_t &c2) {
        return c1.value < c2.value;
    }

    static card_t from_string(const std::string& str);
};

} // poker namespace
} // agnostech namespace
#endif //POKER_CARD_H
