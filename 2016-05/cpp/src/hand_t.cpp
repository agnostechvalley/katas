//
// Created by Dan Pallas on 5/23/16.
//

#include <vector>
#include "card_t.h"
#include "hand_t.h"


using std::experimental::optional;

hand_t::hand_t(const std::vector<card_t> &cards): cards_(cards) {
    std::sort(cards_.begin(), cards_.end(), [](const card_t &a, const card_t &b) { return a.value < b.value; });
    find_duplicates();
    find_if_flush();
    find_if_straight();
}

card_t hand_t::high_card() {
    return cards_.back();
}

void hand_t::find_duplicates() {
    int counter = 0;
    int current_value;

    for(int i = 0; i < cards_.size(); ++i) {
        card_t c = cards_[i];
        current_value = c.value;
        ++counter;
        // if last card or last of its value
        if(i == cards_.size() -1 || cards_[i+1].value != c.value) {
            switch (counter) {
                case 2:
                    two_of_a_kinds_.push_back(current_value);
                    break;
                case 3:
                    three_of_a_kinds_.push_back(current_value);
                    break;
                case 4:
                    four_of_a_kinds_.push_back(current_value);
                    break;
                default:break;
            }
            counter = 0;
        }
    }
}

void hand_t::find_if_flush() {
    suit_t first_suit = cards_.front().suit;
    bool flush = true;
    for(const card_t &card: cards_) {
        if(card.suit != first_suit) {
            flush = false;
            break;
        }
    }
    is_flush_ = flush;
}

void hand_t::find_if_straight() {
    bool is_straight = true;
    if(cards_.size() < 2) {
        is_straight = false;
    } else {
        for(int i = 1; i < cards_.size(); ++i) {
            if(cards_[i].value != cards_[i-1].value + 1) {
                is_straight = false;
                break;
            }
        }
    }
    is_straight_ = is_straight;
}









