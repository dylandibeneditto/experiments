const s = {
    player: 0,
    ai: 1,
    lookup: ['','x','o']
}

const board = [
    [0, 1, 0],
    [0, 2, 0],
    [0, 0, 0],
]

function display(b, id) {
    const el = document.getElementById(id);
    //  i could optimize this but i don't want to
    el.innerHTML = `
    <div class="trow">
        <div id="t1,1">${s.lookup[b[0][0]]}</div>
        <div id="t2,1">${s.lookup[b[0][1]]}</div>
        <div id="t3,1">${s.lookup[b[0][2]]}</div>
    </div>
    <div class="trow">
        <div id="t1,2">${s.lookup[b[1][0]]}</div>
        <div id="t2,2">${s.lookup[b[1][1]]}</div>
        <div id="t3,2">${s.lookup[b[1][2]]}</div>
    </div>
    <div class="trow">
        <div id="t1,3">${s.lookup[b[2][0]]}</div>
        <div id="t2,3">${s.lookup[b[2][1]]}</div>
        <div id="t3,3">${s.lookup[b[2][2]]}</div>
    </div>
    `
}

display(board, 'playBoard')