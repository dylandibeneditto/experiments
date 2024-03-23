import CodeBreaker from "./code-breaker.js";
import generateProblem from "./problem-generator.js";

const app = new CodeBreaker(
    generateProblem()
)

//  number button press events
Array.from(document.getElementById('numbers').children).forEach((item, index) => {
    item.addEventListener('click', () => {
        if (!app.terminal && !app.canCheck) {
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

//  markup on press events
Array.from(document.querySelectorAll('.box:not(.hint-double-correct,.hint-correct)')).forEach(item => {
    item.addEventListener('click',  () => {
        console.log({item})
        if(!app.terminal && !item.closest('.active') && item.innerHTML) {
            let num = item.getAttribute('markup') ? parseInt(item.getAttribute('markup')) : 0;
            item.setAttribute("markup", (num+1)%4)
        }
    })
})