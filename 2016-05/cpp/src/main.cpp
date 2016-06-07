#include <iostream>
#include "hand_t.h"
#include <string>
#include <vector>

using namespace std;

vector<string> tokenize(const string& str) {
    int start_idx = -1;
    int length = 0;

    for(uint i = 0; i < str.size(); ++i) {
        if(start_idx == -1) {
            if(str[i] != ' ') {
                start_idx 

    }
}

int main() {
    cout << "Hello, World!" << endl;
    string str = "1234567890";
    string sub = str.substr(0, 4);
    sub = "9999";
    cout << "new value: " << str << endl;
    return 0;
}
