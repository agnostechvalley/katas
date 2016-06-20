#include <iostream>
#include <string>
#include <vector>
#include <stdexcept>

#include "hand.h"

using namespace std;
using namespace agnostech::poker;

const int expected_tokens = 12;
const string token_delimiters =  " \t:";
const string input_example = "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH";

vector<string> split(const string& str, const string& delimiters) {
    vector<string> result;
    result.reserve(expected_tokens);
    string::size_type pos = 0;
    string::size_type delim_pos = 0;
    while (pos < str.size()) {
        delim_pos = str.find_first_of(delimiters, pos);
        if (delim_pos == string::npos) {
            delim_pos = str.size();
        } 
        string::size_type length = delim_pos - pos;
        if (length != 0) {
            result.emplace_back(str.substr(pos, length));
        }
        pos = delim_pos + 1;
    }
    return result;
}

hand_t parse_hand(const vector<string>& card_strs, uint pos, uint length) {
    vector<card_t> cards;
    cards.reserve(length);
    for (uint i = 0; i < length; ++i) {
        card_t  card = card_t::from_string(card_strs[pos + i]);
        cards.push_back(card);
    }
    return hand_t(cards);
}

int main() {
    string input;
    while (true) {
        cout << "enter hands " << "(ex. " << input_example << ")" << endl << ": ";
        getline (cin, input);
        auto tokens = split(input, token_delimiters);
        if (tokens.size() != expected_tokens) {
            cout << "invalid input" << endl;
        } else {
            string player_1 = tokens[0];
            string player_2 = tokens[6];
            try {
                hand_t hand_1 = parse_hand(tokens, 1, 5);
                hand_t hand_2 = parse_hand(tokens, 7, 5);
                int compared = hand_1.compare(hand_2);
                if (compared > 0) {
                    cout << player_1 << " wins - " << hand_1.get_rank_str();
                    if(hand_1.get_rank() == hand_t::rank_t::high_card)
                        cout << " " << hand_1.get_high_card();
                    cout << endl;
                } else if (compared < 0) {
                    cout << player_2 << " wins - " << hand_2.get_rank_str();
                    if(hand_2.get_rank() == hand_t::rank_t::high_card)
                        cout << " " << hand_2.get_high_card();
                    cout << endl;
                } else {
                    cout << "Tie" << endl;
                }
            } catch (invalid_argument e) {
                cout << "invalid input" << endl;
                cout << e.what() << endl;
                continue;
            }
        }
    }
    return 0;
}

