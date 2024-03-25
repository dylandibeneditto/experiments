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
    const kernel = [[1, 1], [1, 0], [1, -1], [0, -1]]  // list of directions around searched block which need to be checked

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (b[y][x] == 1) {
                if (isThreeInRow(kernel, b, x, y, 1)) {
                    return 10 // win case for 1
                }
            } else if (b[y][x] == 2) {
                if (isThreeInRow(kernel, b, x, y, 2)) {
                    return -10 // win case for 2
                }
            } else {
                continue;
            }
        }
    }

    return 0;  // tie
}

function isThreeInRow(kernel, b, x, y, search) {
    const result = kernel.filter(item => {  // loop through kernel
        let yn = y + item[0];
        let xn = x + item[1];
        let count = 0;  // variable to track length of row
        if (yn >= 0 && yn < 3 && xn >= 0 && xn < 3) {  // make sure value is within constraints of array
            if (b[yn][xn] == search) {
                let [ya, xa] = [yn, xn];

                let [yan, xan] = [ya + item[0], xa + item[1]]
                if (yan >= 0 && yan < 3 && xan >= 0 && xan < 3) {  // make sure value is within constraints of array
                    if (b[yan][xan] == search) count++;
                }


                [ya, xa] = [yn, xn]

                [yan, xan] = [ya - item[0], xa - item[1]]
                if (yan >= 0 && yan < 3 && xan >= 0 && xan < 3) {  // make sure value is within constraints of array
                    if (b[yan][xan] == search) count++;
                }
            }
        }

        if (count == 2) {  // win
            return true;
        }
    })
    if (result.length > 0) {
        return true
    }
}