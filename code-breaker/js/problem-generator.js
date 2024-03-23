export default function generateProblem(duplicates = false) {

    const getAnswer = () => {
        let result = [];
        for (let i = 0; i < 4; i++) {
            let r = Math.round(Math.random() * 9);
            if (!duplicates) {
                while (result.includes(r)) {
                    r = Math.round(Math.random() * 9);
                }
            }
            result.push(r);
        }
        return result.join('');
    }

    return {
        hints: [

        ],
        answer: getAnswer()
    }
}