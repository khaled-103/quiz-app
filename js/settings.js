import Quiz from "./quiz.js";

class Settings{
    constructor(){
        this.quizBodyDom = document.querySelector(".quizBody");
        this.settingsDom = document.querySelector(".settings");
        this.finalScreenDom = document.querySelector(".finalScreen");
        this.quizBodyDom.style.display = "none";
        this.finalScreenDom.style.display = "none";
        this.settingsDom.style.display = "block";
        this.numQuestionsDom = document.querySelector("#numQuestions");
        this.selectCategoryDom = document.querySelector("#selectCategory");
        this.selectDifficultyDom = document.querySelector("#selectDifficulty");
        this.startExamBtnDom = document.querySelector("#startExamBtn");
        this.numQuestions;
        this.difficulty;
        this.category;
        this.allQuestions;
        this.startExamBtnDom.addEventListener("click",this.startExam);
    }
    
    startExam=async()=>{
        this.numQuestions = this.numQuestionsDom.value;
        this.difficulty = this.selectDifficultyDom.options[this.selectDifficultyDom.selectedIndex].value;
        this.category = this.selectCategoryDom.options[this.selectCategoryDom.selectedIndex].value; 
        if(this.numQuestions && this.difficulty && this.category){
            console.log(this.numQuestions + " " + this.difficulty + " " + this.category);
            let url = 
            `https://opentdb.com/api.php?amount=${this.numQuestions}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`;
            await this.getAllQuestions(url);
            new Quiz(this.allQuestions);
        }   
        else{
            alert("Not Completed Settings");
        }
    }
    async getAllQuestions(url){
        let response = await fetch(url);
        let result = await response.json();
        this.allQuestions = result.results;
    }
}
export default Settings;