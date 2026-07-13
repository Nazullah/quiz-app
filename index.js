// 
let category = document.querySelector("#category");
function getAPI(){
    return `https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=easy&type=multiple`;
}

let display = document.querySelector(".display");
let answerBox = document.querySelector(".answers");
let nextBtn = document.querySelector("#next");
let restartBtn = document.querySelector("#restart");
let showAnswersBtn = document.querySelector("#showAnswers");
let userAnswers = [];
let score = 0;
let data = [];
let count = 0;
let correctAnswers = [];


// API se questions lena
async function getData() {

    display.innerHTML = "<h3>Loading Questions...</h3>";
    answerBox.innerHTML = "";

    try {

        let response = await fetch(getAPI());
        let result = await response.json();

        data = result.results;

        count = 0;

        showQuestion();

    } catch(error){

        display.innerHTML = "<h3>Questions load nahi huye!</h3>";

    }
}


// Question aur answers show karna
function showQuestion(){

    let question = data[count];

    display.innerHTML = `
        <p>${count + 1}. ${question.question}</p>
    `;


    let options = [
        ...question.incorrect_answers,
        question.correct_answer
    ];


    // answers shuffle
    options.sort(()=>Math.random()-0.5);


    answerBox.innerHTML = "";


    options.forEach((option)=>{

        answerBox.innerHTML += `
        <p>
        <input type="radio" name="answer" value="${option}">
        ${option}
        </p>
        `;

    });


    correctAnswers[count] = question.correct_answer;

}

    getData();


// Next button
nextBtn.addEventListener("click",()=>{

    let selected = document.querySelector("input[name='answer']:checked");

    if(selected){
        userAnswers[count] = selected.value;
    }else{
        userAnswers[count] = null;
    }


    if(count < data.length - 1){

        count++;
        showQuestion();

    }else{

        showResult();

    }

});


// Restart
restartBtn.addEventListener("click",()=>{

    data = [];
    count = 0;
    score = 0;
    userAnswers = [];
    correctAnswers = [];

    getData();


});


// All correct answers show
showAnswersBtn.addEventListener("click",()=>{

    answerBox.classList.add('answerShow');
    display.innerHTML = "<h2>Correct Answers</h2>";


    answerBox.innerHTML = "";


    correctAnswers.forEach((answer,index)=>{

        answerBox.innerHTML += `
        <p>
        ${index+1}. ${answer}
        </p>
        `;

    });


});
function showResult(){

    score = 0;

    data.forEach((question,index)=>{

        if(userAnswers[index] === question.correct_answer){
            score++;
        }

    });


    display.innerHTML = `
        <h2>Quiz Completed!</h2>
        <h3>Your Score: ${score}/${data.length}</h3>
    `;


    answerBox.innerHTML = `
        <p>Correct Answers: ${score}</p>
        <p>Wrong Answers: ${data.length - score}</p>
    `;

}
category.addEventListener("change", ()=>{

    data = [];
    count = 0;
    userAnswers = [];
    correctAnswers = [];

    getData();

});