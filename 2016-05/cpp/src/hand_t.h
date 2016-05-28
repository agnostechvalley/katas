//
// Created by Dan Pallas on 5/23/16.
//

#ifndef POKER_HAND_H
#define POKER_HAND_H

#include <array>
#include "card_t.h"
#include <experimental/optional>

class hand_t {

public:
    hand_t(const std::vector<card_t> &cards);

    const std::vector<int>& get_four_of_a_kinds() const;
    const std::vector<int>& get_three_of_a_kinds() const;
    const std::vector<int>& get_two_of_a_kinds() const;
    card_t high_card();
    bool is_flush() const;
    bool is_straight() const;
    bool is_straight_flush() const;

private:
    std::vector<card_t> cards_;
    std::vector<int> four_of_a_kinds_;
    std::vector<int> three_of_a_kinds_;
    std::vector<int> two_of_a_kinds_;
    bool is_straight_ = false;
    bool is_flush_ = false;

    // private methods
    void find_duplicates();
    void find_if_flush();
    void find_if_straight();
};
#endif //POKER_HAND_H
