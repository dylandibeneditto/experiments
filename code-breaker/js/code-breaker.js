export default class CodeBreaker {
    constructor(json) {
        this.hints = json.hints;
        this.answer = json.answer;
        this.guesses = 0;
        this.guess = []

        this.canCheck = false;
        /*  export example

        code breaker #1 - 3/3
        🟩🟨⬛️⬛️
        🟩🟩🟨⬛️
        🟩🟩🟩🟩
        
        */
        this.history = [];

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
        document.querySelector(`#field-${this.guesses + 1} > :nth-child(${this.guess.length})`).innerText = what;
    }

    //  updates whether the guess can be checked
    updateCheck() {
        const e = document.getElementById('num-enter');

        if (this.guess.length == 4) {
            this.canCheck = true
            e.classList.remove('close')
        }
        else {
            this.canCheck = false
            e.classList.add('close')
        }
    }

    //  inputs numbers into next open box
    input(number) {
        if (this.guess.length < 4) this.guess.push(number)
        this.updateCheck()
        this.updateCurrentCell(number)
    }

    //  removes number from closest open box
    backspace() {
        if (this.guess.length > 0) {
            this.updateCurrentCell('')
            this.guess.pop()
            this.updateCheck()
        }
    }

    //  function to check and submit current guess (if possible)
    check() {
        if (this.canCheck) {
            //  win condition
            if (this.guess.join('') == this.answer) {
                this.history.push({dc:[0,1,2,3],c:[]})
                this.exprt();
                alert('win');
                return 0;
            }

            //  loss condition
            if (this.guesses == 3) {
                this.exprt();
                alert('fail');
                return 0;
            }

            //  continue
            this.guesses++;
            this.history.push(this.getFeedback(this.guess))
            this.guess = [];
        }
    }

    //  finds solutions for list of numbers
    getFeedback(list) {
        let result = {
            dc: [],
            c: []
        }

        //  find character frequency in answer string
        let answerFreq = {};
        this.answer.split('').forEach(function (s) {
            answerFreq[s] ? answerFreq[s]++ : answerFreq[s] = 1;
        });

        list.forEach((item, index) => {
            //  if double correct
            if (item == this.answer.charAt(index)) {
                result.dc.push(index);
                answerFreq[item.toString()]--;
            }
        })

        list.forEach((item, index) => {
            //  if correct
            if (answerFreq[item.toString()] > 0) {
                result.c.push(index);
                answerFreq[item.toString()]--;
            }
        })

        return result;
    }

    //  export function to send results to others
    exprt() {
        let e = `code breaker #1 - ${this.guesses + 1}/3`

        this.history.forEach(item => {
            let er = ''
            for (let i = 0; i < 4; i++) {
                let skip = false;
                item.dc.forEach(it => {
                    if(it==i) {
                        er+='🟩'
                        skip = true;
                    }
                })
                if(!skip) {
                    item.c.forEach(it => {
                        if(it==i) {
                            er+='🟨'
                            skip = true;
                        }
                    })
                }
                if(!skip) {
                    er+='⬛️'
                }
            }
            e += `\n` + er;
        })

        console.log(e);
    }
}