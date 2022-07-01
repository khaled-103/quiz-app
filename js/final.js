class FinalScreen{
    constructor(correct,total){
        this.quizBodyDom = document.querySelector(".quizBody");
        this.settingsDom = document.querySelector(".settings");
        this.finalScreenDom = document.querySelector(".finalScreen");
        

        this.quizBodyDom.style.display = "none";
        this.settingsDom.style.display = "none";
        this.finalScreenDom.style.display = "block";
        this.finalScreenDom.innerHTML=`
            <p>YOUR FINAL SCORE IS ${correct} OUT OF ${total}</p>
            <BUTton id="tryAgainBtn"> TRY AGAIN</BUTton>
        `;
        this.tryAgainBtnDom = document.querySelector("#tryAgainBtn");
        this.tryAgainBtnDom.addEventListener("click",this.tryagain);
        
    }
    tryagain(){
        location.reload();
    }
}
export default FinalScreen;