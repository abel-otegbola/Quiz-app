//set variables to communicate with the DOM
let pos = 0, test, category, difficulty, options, testStatus, button, choices, choice, correct, score = 0;
            testStatus = document.querySelector("#test_status");
            category = "science";
            difficulty = "easy";
            question = document.querySelector("#question");
            options = document.querySelectorAll("aside #optionbar label");
            button = document.querySelector("#test #optionbar button");
            scoreBoard = document.querySelector("aside #scoreboard");

let apiAddress = `https://the-trivia-api.com/api/questions?categories=${category}&limit=10&difficulty=${difficulty}`;
let loading = false;
let questionsArray = []


//Get array containing questions,options and answer from the api
async function getQuestions() {

    loading = true;

    await fetch(apiAddress)
    .then(res => res.json())
    .then(data => {
        questionsArray = data;
        loading = false;
        loadQuestion()
    })
    .catch(err => {
        questionsArray = [{question: "Couldn't load questions, please check your connection", incorrectAnswers:["option", "option", "option"], correctAnswer:"Answer"}]
        console.log(err)
        loadQuestion()
    })

}
//Get initial questions from api
window.addEventListener("load", getQuestions(), false)


//function to load the questions into the ui
function loadQuestion() {
    question.textContent = questionsArray[pos].question;

    //Fix answer into a random option
    let randomPosition = Math.floor(Math.random()*4);
    let optionsArray = [];
    for(let i=0; i<3; i++) {
        optionsArray.push(questionsArray[pos].incorrectAnswers[i])
    }
    optionsArray.push(optionsArray[randomPosition])
    optionsArray[randomPosition] = questionsArray[pos].correctAnswer;

    //save answer into a variable
    correct = questionsArray[pos].correctAnswer;

    console.log(optionsArray)

    for(let i=0; i<options.length; i++) {
        options[i].innerHTML = `<input type="radio" name="option" value="${optionsArray[i]}" class="options" id="option${i}" /> ${optionsArray[i]}`
    }
}

//After the user submits
     button.onclick = function() {
         choices = document.getElementsByName("option");
         for(let i=0; i<choices.length; i++) {
             if(choices[i].checked) {

                //check if the option checked is equal to the answer
                if(choices[i].value === correct) {
                    console.log(correct, "correct")
                    score++;
                } else {
                    console.log(choices[i].value, "incorrect")
                }
             }
               
         }  //go to next question
        pos++;
        setTimeout(function() {
            //delays the next question to show the color change to darkgreen or darkred
            if(pos === 10) {
                window.alert(score)
            }
            else {
                loadQuestion()
            }
        }, 300);   
        
     }
     //retrieves the players and scores upon loading of page
     highScores =  JSON.parse(window.localStorage.getItem("scores"))

     scoreBoard.innerHTML = `<p class="highScore">${highScores} </p>`

    

function clearScores() {
    window.localStorage.removeItem('scores');
    scoreBoard.innerHTML = '';
}
