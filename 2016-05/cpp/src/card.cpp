#include "card.h"

namespace agnostech {
namespace poker {

std::string card_t::to_string() const {
    std::string str;
    switch(value) {
        case 10:
            str.push_back('T');
            break;
        case 11:
            str.push_back('J');
            break;
        case 12:
            str.push_back('Q');
            break;
        case 13:
            str.push_back('K');
            break;
        case 14:
            str.push_back('A');
            break;
        default:
            str.push_back(value + '0');
    }
    switch(suit) {
        case suit_t::diamond:
            str.push_back('D');
            break;
        case suit_t::spade:
            str.push_back('S');
            break;
        case suit_t::club:
            str.push_back('C');
            break;
        case suit_t::heart:
            str.push_back('H');
            break;
    }
    return str;
}

int parse_card_value(char ch) {
    int value;
    if (ch < '2') {
        throw 1;
    } else if (ch <= '9') {
        value = ch - '0';
    } else if (ch == 'T') {
        value = 10;
    } else if (ch == 'J') {
        value = 11;
    } else if (ch == 'Q') {
        value = 12;
    } else if (ch == 'K') {
        value = 13;
    } else if (ch == 'A') {
        value = 14;
    } else {
        throw 1;
    }

    return value;
}

suit_t parse_card_suit(char ch) {
    suit_t suit;
    switch(ch) {
        case 'D':
            suit = suit_t::diamond;
            break;
        case 'S':
            suit = suit_t::spade;
            break;
        case 'C':
            suit = suit_t::club;
            break;
        case 'H':
            suit = suit_t::heart;
            break;
        default:
            throw 1;
    }
    return suit;
}

card_t card_t::from_string(const std::string& str) {
    card_t card;
    try {
        if (str.size() != 2)
            throw 1;
        card.value = parse_card_value(str[0]);
        card.suit = parse_card_suit(str[1]);
    } catch (...) {
        throw std::invalid_argument(str + " is not a valid card");
    }
    return card;
}

std::ostream& operator << ( std::ostream& os, const card_t& rhs ){
    os << rhs.to_string();
    return os;
}

} // poker
} // agnostech
