

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerEL = document.querySelector('#TimerDisplay')

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];



// if(classToApply === 'incorrect'){
//     secondsLeft -= 2 * 5 * 1;
// }


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

startGame = () => {
    questionCounter = 0;
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

         return window.location.assign('./end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

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

function timer(){
    var sec = 30;
    var timer = setInterval(function(){
        document.getElementById('TimerDisplay').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}


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

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()