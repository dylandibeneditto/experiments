/*
 * score function for evaluating a position
 * @param b - the board array
 * @return - a value between -10 and 10
 * 
 * 10 - 1 is winning
 * -10 - 2 is winning
 * 0 - game will end in a tie
 * 
 */
export default function score(b) {
    const winningConfigs = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    // Check for winner
    for (const config of winningConfigs) {
        const [p1, p2, p3] = config.map(([y, x]) => b[y][x]);
        if (p1 !== 0 && p1 === p2 && p1 === p3) {
            if (p1 === 1) return 10; // Player 1 wins
            if (p1 === 2) return -10; // Player 2 wins
        }
    }

    // Check for draw
    if (findMoves(b).length === 0) {
        return 0; // Draw
    }

    return null; // Game not finished
}

function findMoves(b) {
    const result = [];
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (b[y][x] === 0) {
                result.push([y, x]);
            }
        }
    }
    return result;
}
