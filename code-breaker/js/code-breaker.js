export default class CodeBreaker {
    constructor(json) {
        this.hints = json.hints;
        this.answer = json.answer;
        this.guesses = 0;
        this.guess = []

        this.canCheck = false;
        /*
        export example

        code breaker #1 - 3/3
        🟩🟨⬛️⬛️
        🟩🟩🟨⬛️
        🟩🟩🟩🟩
        
        */
        this.export = '';

        this.drawHints();
    }

    //  displays hints to screen on call
    drawHints() {
        document.getElementById("hints").innerHTML = `
        <div class="hint" id="hint-1">
            <div class="box">${this.hints[0].content[0]}</div>
            <div class="box">${this.hints[0].content[1]}</div>
            <div class="box">${this.hints[0].content[2]}</div>
            <div class="box">${this.hints[0].content[3]}</div>
            <div class="box hint-double-correct">${this.hints[0].doubleCorrect}</div>
            <div class="box hint-correct">${this.hints[0].correct}</div>

        </div>
        <div class="hint" id="hint-2">
            <div class="box">${this.hints[1].content[0]}</div>
            <div class="box">${this.hints[1].content[1]}</div>
            <div class="box">${this.hints[1].content[2]}</div>
            <div class="box">${this.hints[1].content[3]}</div>
            <div class="box hint-double-correct">${this.hints[1].doubleCorrect}</div>
            <div class="box hint-correct">${this.hints[1].correct}</div>
        </div>
        <div class="hint" id="hint-3">
            <div class="box">${this.hints[2].content[0]}</div>
            <div class="box">${this.hints[2].content[1]}</div>
            <div class="box">${this.hints[2].content[2]}</div>
            <div class="box">${this.hints[2].content[3]}</div>
            <div class="box hint-double-correct">${this.hints[2].doubleCorrect}</div>
            <div class="box hint-correct">${this.hints[2].correct}</div>
        </div>
        <div class="hint" id="hint-4">
            <div class="box">${this.hints[3].content[0]}</div>
            <div class="box">${this.hints[3].content[1]}</div>
            <div class="box">${this.hints[3].content[2]}</div>
            <div class="box">${this.hints[3].content[3]}</div>
            <div class="box hint-double-correct">${this.hints[3].doubleCorrect}</div>
            <div class="box hint-correct">${this.hints[3].correct}</div>
        </div>
        `
    }

    //  updates current cell to whatever character is provided
    updateCurrentCell(what) {
        document.querySelector(`#field-${this.guesses+1} > :nth-child(${this.guess.length})`).innerText = what;
    }

    //  updates whether the guess can be checked
    updateCheck() {
        const e = document.getElementById('num-enter');

        if(this.guess.length==4) {
            this.canCheck = true
            e.classList.remove('close')
        }
        else {
            this.canCheck = false
            e.classList.add('close')
        }    
    }

    /*
     * inputs numbers into next open box
     * @param number - number which is inputted into the next open box
     */
    input(number) {
        if(this.guess.length<4) this.guess.push(number)
        this.updateCheck()
        this.updateCurrentCell(number)        
    }

    //  removes number from closest open box
    backspace() {
        if(this.guess.length>0) {
            this.updateCurrentCell('')
            this.guess.pop()
            this.updateCheck()
        }
    }
}