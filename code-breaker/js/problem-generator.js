export default function generateProblem(duplicates = false) {

    const getAnswer = () => {
        let result = [];
        for (let i = 0; i < 4; i++) {
            let r = Math.round(Math.random() * 9);
            if (!duplicates) {
                //  reroll until unique
                while (result.includes(r)) {
                    r = Math.round(Math.random() * 9);
                }
            }
            result.push(r);
        }
        return result;
    }

    const answer = getAnswer();

    const getHints = (a) => {
        let result = []
        let order = [1,2,3,4].sort(() => Math.random() - 0.5)
        console.log(order)
        for(let i = 0; i < 4; i++) {
            let ar = []
            for(let j = 0; j < 4; j++) {
                if(order[i]==j) {
                    ar.push(a[j])
                } else {
                    let r = Math.round(Math.random() * 9);
                    if (!duplicates) {
                        //  reroll until unique
                        while (ar.includes(r)) {
                            r = Math.round(Math.random() * 9);
                        }
                    }
                    ar.push(r);
                }
            }
            result.push(ar)
        }

        return result;
    }

    const hints = getHints(answer);

    return {
        hints: hints,
        answer: answer.join('')
    }
}