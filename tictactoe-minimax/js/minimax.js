import score from "./score.js";

const MAX_DEPTH = 20;

export default function minimax(b, maximizing, depth = 0) {
    const currentScore = score(b)!==0&& score(b)!==null ? score(b)+depth : score(b);

    // Check if the game is over or depth limit is reached
    if (currentScore !== null || depth === MAX_DEPTH) {
        return { value: (-currentScore), move: null };
    }

    if (maximizing) {
        let bestValue = -Infinity;
        let bestMove = null;
        findMoves(b).forEach(move => {
            const [y, x] = move;
            if (b[y][x] === 0) {
                const bc = deepCopy(b); // Deep copy of the board
                bc[y][x] = 2; // Assume the current player is maximizing (1)
                const { value } = minimax(bc, false, depth + 1);
                if (value > bestValue) {
                    bestValue = value;
                    bestMove = move;
                }
            }
        });
        return { value: bestValue, move: bestMove };
    } else {
        let bestValue = Infinity;
        let bestMove = null;
        findMoves(b).forEach(move => {
            const [y, x] = move;
            if (b[y][x] === 0) {
                const bc = deepCopy(b); // Deep copy of the board
                bc[y][x] = 1; // Assume the current player is minimizing (2)
                const { value } = minimax(bc, true, depth + 1);
                if (value < bestValue) {
                    bestValue = value;
                    bestMove = move;
                }
            }
        });
        return { value: bestValue, move: bestMove };
    }
}

// Function to deep copy the board array
function deepCopy(arr) {
    return arr.map(row => [...row]);
}

// Function to find available moves
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
