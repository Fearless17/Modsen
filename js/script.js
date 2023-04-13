const quiz = document.querySelector(".quiz");
const next_btn = quiz.querySelector(".next_btn");





let count_que = 0;
let numb_que = 1;


next_btn.onclick = () => {
    if(count_que < questions.length - 1){
        count_que++;
        numb_que++;
        showQuestions(count_que);
        queCounter(numb_que);
    }
    else console.log("Вопросы закончились");    
}
function showQuestions(index){
    const question_text = document.querySelector(".question_text");
    const option_list = document.querySelector(".option_list");
    let que_tag = '<span>' + questions[index].question + '</span>';
    let option_tag =   '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
                    +  '<div class="option"><span>' + questions[index].options[1] + '</span></div>' 
                    +  '<div class="option"><span>' + questions[index].options[2] + '</span></div>';
    question_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
}

showQuestions(0);
queCounter(1);
function queCounter(index){
    const number_text = quiz.querySelector(".number_text");
    let totalQueTag = '<span>Question<p>' + index + '</p>/<p>' + questions.length + '</p></span>'
    number_text.innerHTML = totalQueTag;
}