#include <iostream>
#include "hand_t.h"
#include <string>
#include <vector>

using namespace std;

vector<string> split(const string& str, const string& delimiters) {
    vector<string> result;
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

int main() {
    string input_str = "Hello, World!";
    cout << input_str << endl;
    auto strings = split(input_str, ", ");
    for (auto str: strings) {
        cout << str << endl;
    }
    return 0;
}
