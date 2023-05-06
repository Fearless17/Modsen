const start_btn = document.querySelector(".start_btn");
const quiz = document.querySelector(".quiz");
const next_btn = quiz.querySelector(".next_btn");
const option_list = document.querySelector(".option_list");
const result = document.querySelector(".result");
const restart_btn = result.querySelector(".restart .restart_btn");
const time_count = quiz.querySelector(".time .time_sec");


start_btn.onclick = () => {
    quiz.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}

restart_btn.onclick = () => {
    window.location.reload();
}
let timeValue = 15;
let count_que = 0;
let numb_que = 1;
let score = 0;
let counter;

next_btn.onclick = () => {
    if(count_que < questions.length - 1){
        count_que++;
        numb_que++;
        showQuestions(count_que);
        queCounter(numb_que);
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = "none";
    }
    else {
        console.log("Вопросы закончились");  
        showResult();  
    }
}
function showQuestions(index){
    const question_text = document.querySelector(".question_text");
    const multiple_answers = document.querySelector(".multiple_answers");
    let que_tag;
    let multiple_answersTag;
    if(questions[index].answer.length > 1){
        que_tag = '<span>' + questions[index].question + '</span>';
        multiple_answersTag = '<span> Multiple answer options </span>';
        multiple_answers.innerHTML = multiple_answersTag;
     }
    else {
        
        que_tag = '<span>' + questions[index].question + '</span>';
        multiple_answersTag = '<span></span>';
        multiple_answers.innerHTML = multiple_answersTag;
    }
        let option_tag =   '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
                        +  '<div class="option"><span>' + questions[index].options[1] + '</span></div>' 
                        +  '<div class="option"><span>' + questions[index].options[2] + '</span></div>';
        question_text.innerHTML = que_tag;
        option_list.innerHTML = option_tag;
        
        
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
        
    }
}

function optionSelected(answer){
    clearInterval(counter);
    let userAns = answer.textContent; 
    let correctAns = questions[count_que].answer;
    let allOptions = option_list.children.length;
   
    if(correctAns.includes(userAns)){
        score++;
        answer.classList.add("correct");
        answer.classList.add("disabled");
        //console.log("correct");

    }
    else {
        answer.classList.add("incorrect");
        answer.classList.add("disabled");
        //console.log("wrong");
        for (let i = 0; i < allOptions; i++) {
            if(correctAns.includes(option_list.children[i].textContent)){
                option_list.children[i].setAttribute("class", "option correct-unelected");
                next_btn.style.display = "block";
            }
           
        }
    }
    console.log(score);
    let correct_count = document.querySelectorAll('.correct').length;
    let incorrect_count = document.querySelectorAll('.incorrect').length;
    let userAns_count = correct_count + incorrect_count;
    let totalAnsCount = questions[count_que].answer.length;
    if(userAns_count == totalAnsCount){
        correct_count = 0;
        incorrect_count = 0;
        userAns_count = 0;
        for(let i = 0; i < allOptions; i++){
			option_list.children[i].classList.add("disabled");
		}
			next_btn.style.display = "block";
    }
    if(totalAnsCount==1 && incorrect_count==1){
        for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }
    }
    if(correct_count == 1 && totalAnsCount == 2){
        score--;
    }
    //next_btn.style.display = "block";
}   

function showResult(){
    quiz.classList.remove("activeQuiz");
    result.classList.add("activeResult");
    const score_text = result.querySelector(".score_text");
    let scoreTag = '<span>Your result is <p>' + score + '</p>out of<p>' + questions.length + '</p></span>';
    score_text.innerHTML = scoreTag;
}
function queCounter(index){
    const number_text = quiz.querySelector(".number_text");
    let totalQueTag = '<span>Question<p>' + index + '</p>/<p>' + questions.length + '</p></span>'
    number_text.innerHTML = totalQueTag;
}



function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        time_count.textContent = time;
        time--;
        if(time < 0){
            
            clearInterval(counter);
            let correctAns = questions[count_que].answer;
            let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
                if(correctAns.includes(option_list.children[i].textContent)){
                    option_list.children[i].setAttribute("class", "option correct-unelected");
                   
                }
               
            }
            for(let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
                next_btn.style.display = "block";
        }
    }
    
}