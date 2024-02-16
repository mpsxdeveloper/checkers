const positions_b = [
    { pos: 41 },
    { pos: 43 },
    { pos: 45 },
    { pos: 47 },
    { pos: 50 },
    { pos: 52 },
    { pos: 54 },
    { pos: 56 },
    { pos: 57 },
    { pos: 59 },
    { pos: 61 },
    { pos: 63 }
]

const positions_r = [
    { pos: 2 },
    { pos: 4 },
    { pos: 6 },        
    { pos: 8 },
    { pos: 9 },
    { pos: 11 },
    { pos: 13 },
    { pos: 15 },
    { pos: 18 },
    { pos: 20 },
    { pos: 22 },
    { pos: 24 },
]

const empty_positions = [
    { pos: 25 }, { pos: 27 }, { pos: 29 }, { pos: 31 }, { pos: 34 }, { pos: 36 }, { pos: 38 }, { pos: 40 }, 
]

const positionsAlloweds = [

    { current_position: 2, possible_moves: [9, 11] },
    { current_position: 4, possible_moves: [11, 13] },
    { current_position: 6, possible_moves: [13, 15] },
    { current_position: 8, possible_moves: [15] },

    { current_position: 9, possible_moves: [18, 2] },
    { current_position: 11, possible_moves: [18, 20, 2, 4] },
    { current_position: 13, possible_moves: [20, 22, 4, 6] },
    { current_position: 15, possible_moves: [22, 24, 6, 8] },

    { current_position: 18, possible_moves: [25, 27, 9, 11] },
    { current_position: 20, possible_moves: [27, 29, 11, 13] },
    { current_position: 22, possible_moves: [29, 31, 13, 15] },
    { current_position: 24, possible_moves: [31, 15] },

    { current_position: 25, possible_moves: [34, 18] },
    { current_position: 27, possible_moves: [34, 36, 18, 20] },
    { current_position: 29, possible_moves: [36, 38, 20, 22] },
    { current_position: 31, possible_moves: [38, 40, 22, 24] },

    { current_position: 34, possible_moves: [41, 43, 25, 27] },
    { current_position: 36, possible_moves: [43, 45, 27, 29] },
    { current_position: 38, possible_moves: [45, 47, 29, 31] },
    { current_position: 40, possible_moves: [47, 31] },

    { current_position: 41, possible_moves: [34, 50] },
    { current_position: 43, possible_moves: [34, 36, 50, 52] },
    { current_position: 45, possible_moves: [36, 38, 52, 54] },
    { current_position: 47, possible_moves: [38, 40, 54, 56] },

    { current_position: 50, possible_moves: [57, 59, 41, 43] },
    { current_position: 52, possible_moves: [59, 61, 43, 45] },
    { current_position: 54, possible_moves: [61, 63, 45, 47] },
    { current_position: 56, possible_moves: [63, 47] },

    { current_position: 57, possible_moves: [50] },
    { current_position: 59, possible_moves: [50, 52] },
    { current_position: 61, possible_moves: [52, 54] },
    { current_position: 63, possible_moves: [54, 56] }

]

const takingPieces = [
    { start: 2, middle: 11, end: 20 },
    { start: 4, middle: 13, end: 22, start: 4, middle: 11, end: 18 },
    { start: 6, middle: 15, end: 24, start: 6, middle: 13, end: 20 },
    { start: 8, middle: 15, end: 22 },
    { start: 9, middle: 18, end: 27 },
    { start: 11, middle: 20, end: 29, start: 11, middle: 18, end: 25 },
    { start: 13, middle: 22, end: 31, start: 13, middle: 20, end: 27 },
    { start: 15, middle: 22, end: 29 },
    { start: 18, middle: 11, end: 4, start: 18, middle: 27, end: 36 },
    { start: 25, middle: 34, end: 43, start: 25, middle: 18, end: 11 },
]