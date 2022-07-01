class Question{
    constructor(q){
        this.questionBody = q.question;
        this.correctAnswer = q.correct_answer;
        this.answers = [this.correctAnswer,...q.incorrect_answers];
        this.isCorrectAnswered;
        this.answersDom = document.querySelector(".question .answers");
        this.questionDom = document.querySelector(".questionBody");

        this.isAnswered=false;
        this.userAnswer;
        this.indexes = [0,1,2,3];
        this.shufleAnswers(this.indexes);
    }
    renderQuestion(){
        this.questionDom.innerHTML = `<p class="questionBody">${this.questionBody}</p>`;
       
        this.answersDom.innerHTML = `
                <label for="a1">
                    A
                    <input style="margin: 0 8px;" type="radio" id="a1" name="answers" value="${this.answers[this.indexes[0]]}">
                    <span> ${this.answers[this.indexes[0]]}</span>
                </label>
                <label for="a2">
                    A
                    <input style="margin: 0 8px;" type="radio" id="a2" name="answers" value="${this.answers[this.indexes[1]]}">
                    <span> ${this.answers[this.indexes[1]]}</span>
                </label>
                <label for="a3">
                    C
                    <input style="margin: 0 8px;" type="radio" id="a3" name="answers" value="${this.answers[this.indexes[2]]}">
                    <span> ${this.answers[this.indexes[2]]}</span>
                </label>
                <label for="a4">
                    D
                    <input style="margin: 0 8px;" type="radio" id="a4" name="answers" value="${this.answers[this.indexes[3]]}">
                    <span> ${this.answers[this.indexes[3]]}</span>
                </label>
        `;
        if(this.isAnswered){
            let obj = document.querySelector(`input[id=${this.userAnswer.id}]`);
            obj.checked = true;
        }
        
    }
    checkQuestionAnswer(){
        this.userAnswer = document.querySelector("input[name='answers']:checked");
        if(this.userAnswer){
            this.isAnswered = true;
            let checkedItemValue = this.userAnswer.value;
            this.isCorrectAnswered = checkedItemValue == this.correctAnswer;
            return this.isCorrectAnswered;
        }
    }

    shufleAnswers(arr){
        for(let i=0 ; i < arr.length ; i++){
            let tempIndex = parseInt(Math.random()*4);
            let temp = arr[i];
            arr[i] = arr[tempIndex];
            arr[tempIndex] = temp;
        }
        
    }
}

export default Question;