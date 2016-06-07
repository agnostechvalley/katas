//
// Created by Dan Pallas on 5/23/16.
//

#include <vector>
#include "card_t.h"
#include "hand_t.h"


hand_t::hand_t(const std::vector<card_t> &cards): cards_(cards) {
    std::sort(cards_.begin(), cards_.end(), card_t::less_than_by_value);
    find_duplicates();
    rank_ = determine_rank();
}

const card_t &hand_t::get_high_card() const{
    return cards_.back();
}

void hand_t::find_duplicates() {
    int counter = 0;
    int current_value;

    for(size_t i = 0; i < cards_.size(); ++i) {
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

bool hand_t::find_if_flush() const {
    suit_t first_suit = cards_.front().suit;
    bool is_flush = true;
    for(const card_t &card: cards_) {
        if(card.suit != first_suit) {
            is_flush = false;
            break;
        }
    }
    return is_flush;
}

bool hand_t::find_if_straight() const {
    bool is_straight = true;
    if(cards_.size() < 2) {
        is_straight = false;
    } else {
        for(size_t i = 1; i < cards_.size(); ++i) {
            if(cards_[i].value != cards_[i-1].value + 1) {
                is_straight = false;
                break;
            }
        }
    }
    return is_straight;
}

const std::vector<int> &hand_t::get_four_of_a_kinds() const {
    return four_of_a_kinds_;
}

const std::vector<int> &hand_t::get_three_of_a_kinds() const {
    return three_of_a_kinds_;
}

const std::vector<int> &hand_t::get_two_of_a_kinds() const {
    return two_of_a_kinds_;
}

const std::vector<card_t> &hand_t::get_cards() const {
    return cards_;
}


int hand_t::compare_highest_cards(const std::vector<int> a, const std::vector<int> b) {
    for(unsigned int i = 0; i < a.size(); ++i) {
        int index = a.size() - 1 - i;
        if(a[index] > b[index]) {
            return 1;
        } else if(a[index] < b[index]) {
            return -1;
        }
    }
    return 0;
}

int hand_t::compare(const hand_t &other) const {
    if(rank_ > other.rank_) {
        return 1;
    } else if(rank_ < other.rank_) {
        return -1;
    } else {
        switch(rank_) {
            case rank_straight_flush: 
            case rank_straight:
                return get_high_card().value - other.get_high_card().value;
                break;
            case rank_flush:
            case rank_high_card:
                return compare_highest_cards(other);
                break;
            case rank_four_of_a_kind:
                return four_of_a_kinds_.front() - other.four_of_a_kinds_.front();
                break;
            case rank_full_house:
            case rank_three_of_a_kind:
                return three_of_a_kinds_.front() - other.three_of_a_kinds_.front();
                break;
            case rank_two_pair:
            case rank_pair:
                return compare_highest_cards(other);
                break;
        }
    }
}

int hand_t::compare_highest_cards(const hand_t &other) const {
    for(size_t i = 0; i < cards_.size(); ++i) {
        int index = cards_.size() - 1 - i;
        if(cards_[index].value > other.cards_[index].value) {
            return 1;
        } else if(cards_[index].value < other.cards_[index].value) {
            return -1;
        }
    }
    return 0;
}

hand_t::rank_t hand_t::determine_rank() const {
    rank_t rank;
    bool is_straight = find_if_straight();
    bool is_flush = find_if_flush();
    if(is_straight && is_flush) {
        rank = rank_straight_flush;
    } else if(four_of_a_kinds_.size() == 1) {
        rank = rank_four_of_a_kind;
    } else if(three_of_a_kinds_.size() == 1 && two_of_a_kinds_.size() == 1) {
        rank = rank_full_house;
    } else if(is_flush) {
        rank = rank_flush;
    } else if(is_straight) {
        rank = rank_straight;
    } else if(three_of_a_kinds_.size() == 1) {
        rank = rank_three_of_a_kind;
    } else if(two_of_a_kinds_.size() == 2) {
        rank = rank_two_pair;
    } else if(two_of_a_kinds_.size() == 1) {
        rank = rank_pair;
    } else {
        rank = rank_high_card;
    }
    return rank;
}
