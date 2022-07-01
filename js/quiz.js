import FinalScreen from "./final.js";
import Question from "./question.js";

class Quiz{
    constructor(allQuestions){
        this.quizBodyDom = document.querySelector(".quizBody");
        this.settingsDom = document.querySelector(".settings");
        this.finalScreenDom = document.querySelector(".finalScreen");
        this.quizBodyDom.style.display = "flex";
        this.settingsDom.style.display = "none";
        this.finalScreenDom.style.display = "none";
        this.nextButtonDom = document.querySelector("#nextButton");
        this.questionNumbersDom = document.querySelector(".quizBody .questionNumbers");
        this.allQuestions = allQuestions;
        this.allRealQuestion = [];
        this.answeredTable = [];
        this.indexQuestion = 0;
        this.numberOfCorrect = 0;
        this.currentQuestion;
        this.curNumberQ = 0;
        this.preNumberQ;
        this.numAnswered = 0;
        this.converteToRealQuestions();
        this.showQuestionNumbers();
        this.getNextQuestion();
        this.nextButtonDom.addEventListener("click",this.checkAndNext);
    }

    

    checkCurrent(){
        let res= this.currentQuestion.checkQuestionAnswer();   
        if(res != null){
            let curNumberQuestion =document.querySelector(`span[id=questionNumber${this.curNumberQ}]`);
            curNumberQuestion.style.backgroundColor = "green";
            this.answeredTable[this.curNumberQ] = '1';
        }      
    }


    getNextQuestion(){
        this.currentQuestion = this.allRealQuestion[this.indexQuestion];
        this.currentQuestion.renderQuestion();
        let curNumberQuestion =document.querySelector(`span[id=questionNumber${this.curNumberQ}]`);
        curNumberQuestion.style.border = "2px solid brown";
        if(this.preNumberQ != null){
            let preNumberQuestion =document.querySelector(`span[id=questionNumber${this.preNumberQ}]`);
            preNumberQuestion.style.border = "none";
        }
    }


    checkAndNext=()=>{
        this.checkCurrent();
        if(this.indexQuestion < (this.allQuestions.length-1)){
            this.preNumberQ = this.indexQuestion;
            this.indexQuestion++;
            this.curNumberQ = this.indexQuestion;
            this.getNextQuestion();
        }else{
            this.numAnswered = this.answeredTable.filter(function(item){return item == '1';}).length;
            console.log(this.numAnswered);
            if(this.numAnswered == this.allRealQuestion.length){
                this.countCorrectAnswer();
                new FinalScreen(this.numberOfCorrect,this.allQuestions.length);
            }    
        }   
        
    }


    showQuestionNumbers(){
        let content = "";
        for(let i=0; i<this.allRealQuestion.length; i++){
            content +=`<span id="questionNumber${i}">${i+1}</span>`;
        }
        this.questionNumbersDom.innerHTML = content;
        
        for(let i=0; i<this.allRealQuestion.length; i++){
            document.querySelector(`span[id=questionNumber${i}]`).onclick = () => {this.jumpQuestion(i)};
            // doc.addEventListener("click", () => {this.jumpQuestion(i)});
            
        }
    }
    jumpQuestion =(position) =>{
            this.checkCurrent();
            this.preNumberQ = this.indexQuestion;
            this.indexQuestion = position;
            this.curNumberQ = this.indexQuestion;
            this.getNextQuestion();      
    }

    converteToRealQuestions(){
        for(let item of this.allQuestions){
            this.allRealQuestion.push(new Question(item));
        }
    }

    countCorrectAnswer(){
        for(let item of this.allRealQuestion){
            if(item.isCorrectAnswered)
                this.numberOfCorrect++;
        }
    }
}
export default Quiz;