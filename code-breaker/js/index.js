import CodeBreaker from "./code-breaker.js";

const app = new CodeBreaker({
    hints: [
        { content: [1, 2, 3, 4], doubleCorrect: 4, correct: 0 },
        { content: [1, 2, 3, 4], doubleCorrect: 4, correct: 0 },
        { content: [1, 2, 3, 4], doubleCorrect: 4, correct: 0 },
        { content: [1, 2, 3, 4], doubleCorrect: 4, correct: 0 },
    ],
    answer: '1234'
})

//  number button press events
Array.from(document.getElementById('numbers').children).forEach((item, index) => {
    item.addEventListener('click', () => {
        if(!app.terminal) {
            app.input(index)
        }
    })
})

//  backspace press event
document.getElementById('num-back').addEventListener('click', () => {
    if(!app.terminal) {
        app.backspace()
    }
})

//  enter press event
document.getElementById('num-enter').addEventListener('click', ()=> {
    if(!app.terminal) {
        app.check()
    }
})