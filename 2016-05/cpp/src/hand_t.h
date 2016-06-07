//
// Created by Dan Pallas on 5/23/16.
//

#ifndef POKER_HAND_H
#define POKER_HAND_H

#include <array>
#include "card_t.h"
#include <experimental/optional>
#include <vector>

class hand_t {

public:
    hand_t(const std::vector<card_t> &cards);

    const std::vector<int> &get_four_of_a_kinds() const;
    const std::vector<int> &get_three_of_a_kinds() const;
    const std::vector<int> &get_two_of_a_kinds() const;
    const std::vector<card_t> &get_cards() const;
    const card_t& get_high_card() const;

    enum rank_t { rank_high_card, rank_pair, rank_two_pair, rank_three_of_a_kind, rank_straight, rank_flush,
        rank_full_house, rank_four_of_a_kind, rank_straight_flush };
private:
    std::vector<card_t> cards_;
    std::vector<int> four_of_a_kinds_;
    std::vector<int> three_of_a_kinds_;
    std::vector<int> two_of_a_kinds_;
    rank_t rank_;

    // private methods
    void find_duplicates();
    bool find_if_flush() const;
    bool find_if_straight() const;
    int compare(const hand_t &other) const;
    rank_t determine_rank() const;
    static int compare_highest_cards(const std::vector<int> a, const std::vector<int> b);
    int compare_highest_cards(const hand_t &other) const;
};
#endif //POKER_HAND_H
