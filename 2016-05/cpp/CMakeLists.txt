cmake_minimum_required(VERSION 3.5)
project(poker)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14 -Werror -Wall -Wextra")

set(SOURCE_FILES    src/main.cpp 
                    src/card.h 
                    src/card.cpp
                    src/hand.h 
                    src/hand.cpp)
add_executable(poker ${SOURCE_FILES})

