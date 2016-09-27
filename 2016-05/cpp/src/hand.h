//
// Created by Dan Pallas on 5/23/16.
//

#ifndef POKER_HAND_H
#define POKER_HAND_H

#include <array>
#include "card.h"
#include <experimental/optional>
#include <vector>
#include <unordered_map>

namespace agnostech {
namespace poker {

class hand_t {

public:
    hand_t();

    hand_t(const std::vector<card_t>& cards);

    enum class rank_t { high_card, pair, two_pair, three_of_a_kind, straight, flush, full_house, four_of_a_kind, 
        straight_flush };

    const card_t& get_high_card() const;
    rank_t get_rank() const;
    std::string get_rank_str() const;
    int compare(const hand_t& other) const;

private:
    std::vector<card_t> cards_;
    std::vector<int> four_of_a_kinds_;
    std::vector<int> three_of_a_kinds_;
    std::vector<int> two_of_a_kinds_;
    rank_t rank_;
    static std::unordered_map<rank_t, std::string> rank_strings_;

    // private methods
    void find_duplicates();
    bool find_if_flush() const;
    bool find_if_straight() const;
    rank_t determine_rank() const;
    static int compare_highest_cards(const std::vector<int>& a, const std::vector<int>& b);
    int compare_highest_cards(const hand_t& other) const;
};


} // poker namespace
} // agnostech namespace
#endif //POKER_HAND_H
