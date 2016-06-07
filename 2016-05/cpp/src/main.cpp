#include <iostream>
#include "hand_t.h"
#include <string>
#include <vector>

using namespace std;

vector<string> tokenize(const string& str) {
    int start_idx = -1;
    int length = 0;
    vector<string> result(12);

    for(uint i = 0; i < str.size(); ++i) {
        if(start_idx == -1) {
            if(str[i] != ' ') {
                start_idx = i;
                length = 1;
            }
        } else {
            if(str[i] == ' ') {
                result.push_back(str.substr(start_idx, length));
                start_idx = -1;
            } else if(i == str.size() - 1) {
                ++length;
                result.push_back(str.substr(start_idx, length));
            } else {
                ++length;
            }
        }
    }
    return result;
}

int main() {
    cout << "Hello, World!" << endl;
    string str = "1234567890";
    string sub = str.substr(0, 4);
    sub = "9999";
    cout << "new value: " << str << endl;
    return 0;
}
