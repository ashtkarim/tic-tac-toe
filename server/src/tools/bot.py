#!/usr/bin/python3
import re
import random

WINNING_PATTERNS = (
    "???......",
    "...???...",
    "......???",
    "?..?..?..",
    ".?..?..?.",
    "..?..?..?",
    "?...?...?",
    "..?.?.?..",
)
# board = ["OO ........"]

WINNING_PATTERNS_POS = (
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
)

ALL_POS = [0, 1, 2, 3, 4, 5, 6, 7, 8]


MARKS = ["X", "O"]

def print_board(b):
    print("\
┌───┬───┬───┐\n\
│ {} │ {} │ {} │\n\
├───┼───┼───┤\n\
│ {} │ {} │ {} │\n\
├───┼───┼───┤\n\
│ {} │ {} │ {} │\n\
└───┴───┴───┘\n\
".format(b[0], b[1], b[2],
         b[3], b[4], b[5],
         b[6], b[7], b[8],))


moves = {
    "1": 6,
    "2": 7,
    "3": 8,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 0,
    "8": 1,
    "9": 2,
}

def player(b):
    while True:
        n = input("your game: ")
        pos = moves[n]
        if b[pos] == " ":
            break
    b[pos] = "X"
    return pos

def check_risk(b):
    for patt in WINNING_PATTERNS_POS:
        positions = [b[i] for i in patt]
        # print(patt, positions)
        if positions.count("X") == 2 and positions.count(" ") == 1:
            # print("pos is:", positions.index(" "))
            return patt[positions.index(" ")]
    return None

def check_win(b):
    for patt in WINNING_PATTERNS_POS:
        positions = [b[i] for i in patt]
        # print(patt, positions)
        if positions.count("O") == 2 and positions.count(" ") == 1:
            return patt[positions.index(" ")]
    return None

def get_pos(b):
    for patt in WINNING_PATTERNS_POS:
        positions = [b[i] for i in patt]
        # print(patt, positions)
        if positions.count("O") == 1 and positions.count(" ") == 2:
            return patt[positions.index(" ")]
    return None

def bot(b, av):
    pos = check_win(b)
    if pos is not None:
        b[pos] = "O"
        return pos
    pos = check_risk(b)
    if pos is not None:
        b[pos] = "O"
        return pos
    pos = random.choice(av)
    b[pos] = "O"
    return pos

def check_game(b):
    b_s = "".join(b)
    for pattern in WINNING_PATTERNS:
        for mark in MARKS:
            if re.match(pattern.replace("?", mark), b_s):
                return mark
    return None

def main():
    available_positions = ALL_POS
    board = [" "] * 9
    turn = 1
    print_board(board)
    while " " in board:
        if turn:
            turn = 0
            played_position = player(board)
        else:
            turn = 1
            played_position = bot(board, available_positions)
        # remove teh filled position from available positions
        print(available_positions)
        print(played_position)
        available_positions.remove(played_position)
        print_board(board)
        mark = check_game(board)
        if mark:
            print(f"{mark} WINS !!")
            return
    print("No one wins")


if __name__ == "__main__":
    main()