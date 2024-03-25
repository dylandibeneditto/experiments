const s = {
    player: 0,
    ai: 1,
    lookup: ['', 'x', 'o']
}

let move = 0;

let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

//  board display given board and id
function display(b, id) {
    const el = document.getElementById(id);
    //  i could optimize this but i don't want to
    el.innerHTML = `
    <div class="trow">
        <div id="00">${s.lookup[b[0][0]]}</div>
        <div id="01">${s.lookup[b[0][1]]}</div>
        <div id="02">${s.lookup[b[0][2]]}</div>
    </div>
    <div class="trow">
        <div id="10">${s.lookup[b[1][0]]}</div>
        <div id="11">${s.lookup[b[1][1]]}</div>
        <div id="12">${s.lookup[b[1][2]]}</div>
    </div>
    <div class="trow">
        <div id="20">${s.lookup[b[2][0]]}</div>
        <div id="21">${s.lookup[b[2][1]]}</div>
        <div id="22">${s.lookup[b[2][2]]}</div>
    </div>
    `
}

function alterDisplay(val, index, id) {
    document.querySelector(`#${id} > * > #\\3${index.join(' ')}`).innerHTML = s.lookup[val]
}

display(board, 'playBoard')

//  event listeners for click
Array.from(document.querySelectorAll('#playBoard > * > *')).forEach(item => {
    item.addEventListener('click', () => {
        const coord = item.id.split('')
        if (board[parseInt(coord[0])][parseInt(coord[1])] == 0 && move == s.player) {
            board[parseInt(coord[0])][parseInt(coord[1])] = s.player + 1;
            alterDisplay(s.player + 1, [parseInt(coord[0]), parseInt(coord[1])], 'playBoard')
            move = 1 - move;
        }
    })
})