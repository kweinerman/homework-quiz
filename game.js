

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


//Question set for the quiz
let questions = [
    {
        question: "Which is NOT a value type in JavaScript?",
        choice1: 'String',
        choice2: 'Letters',
        choice3: 'Value',
        choice4: 'Boolean',
        answer: 2,
    },
    {
        question: "What creates an arrow function?",
        choice1: "=>",
        choice2: "^^",
        choice3: "arrow()",
        choice4: "None of the Above",
        answer: 1,
    },
    {
        question: "How do you view something in the console?",
        choice1: 'function console',
        choice2: 'You can not',
        choice3: 'let console =',
        choice4: 'console.log',
        answer: 4,
    },
    {
        question: "What does DOM stand for?",
        choice1: "Domestic Obsecure Model",
        choice2: "Dumb Object Meaning",
        choice3: "Document Object Model",
        choice4: "Dinner on Me",
        answer: 3,
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;
//game start to pick a random question
startGame = () => {
    questionCounter = 0;
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
//Function to find a question that has not been asked yet
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
//bings the user to end screen
         return window.location.assign('./end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //rnadomizes the question
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
//determines is answer is correct and applies points
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

})

})
//timer lets 
let secondsLeft = 30;

const timeEl = document.querySelector('h2');

timeEl.innerHTML = `00:${secondsLeft}`;
const countDown = setInterval(() =>{
    secondsLeft--;
    displayTime(secondsLeft);
    if(secondsLeft <= 0 || secondsLeft < 1){
        clearInterval(countDown);
    }
},1000)
// display timer effect
function displayTime(second){
    const min = Math.floor(second/ 60);
    const sec =Math.floor(second % 60);
    timeEl.innerHTML= secondsLeft
    if (secondsLeft === 0)
    return window.location.assign('./end.html')
}

//keeps score of the game
incrementScore = num => {
    score += num
    scoreText.innerText = score
}
//runs game!
startGame()