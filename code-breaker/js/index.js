import CodeBreaker from "./code-breaker.js";
import generateProblem from "./problem-generator.js";

const app = new CodeBreaker(
    generateProblem()
)

//  number button press events
Array.from(document.getElementById('numbers').children).forEach((item, index) => {
    item.addEventListener('click', () => {
        if (!app.terminal) {
            app.input(index)
        }
    })
})

//  backspace press event
document.getElementById('num-back').addEventListener('click', () => {
    if (!app.terminal) {
        app.backspace()
    }
})

//  enter press event
document.getElementById('num-enter').addEventListener('click', () => {
    if (!app.terminal) {
        app.check()
    }
})