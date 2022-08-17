//set variables to communicate with the DOM
let pos = 0, test, category, difficulty, options, testStatus, button, choices, choice, correct, score = 0;

    //DOM elements to be manipulated
    testStatus = document.querySelector("#test_status");
    difficulty = "easy";
    question = document.querySelector("#question");
    options = document.querySelectorAll("aside #optionbar label");
    button = document.querySelector("#test #optionbar button");
    scoreText = document.querySelectorAll(".score")
    highscoreBoard = document.querySelector("aside #highscoreboard");

let questionsArray = []


//Get category selected by the user
function getCategory() {
    let allCategories = document.querySelectorAll(".category span");
    for(let i=0; i<allCategories.length; i++) {
        allCategories[i].addEventListener("click", () => {
            for(let j=0; j<allCategories.length; j++) {
                allCategories[j].classList.remove("active")
            }
            allCategories[i].classList.add("active")
            category = allCategories[i].getAttribute("data-filter")
            pos = 0
            getQuestions(category)
            score = 0;
        })
        if(allCategories[i].classList.contains("active")) {
            category = allCategories[i].getAttribute("data-filter")
            getQuestions()
        }
    }
}
getCategory()

//Get difficulty selected by the user
function getDifficulty() {
    let allDifficulty = document.querySelectorAll(".difficulty span");
    for(let i=0; i<allDifficulty.length; i++) {
        allDifficulty[i].addEventListener("click", () => {
            for(let j=0; j<allDifficulty.length; j++) {
                allDifficulty[j].classList.remove("active")
            }
            allDifficulty[i].classList.add("active")
            difficulty = allDifficulty[i].getAttribute("data-level")
            pos = 0
            getQuestions()
            score = 0;
        })
        if(allDifficulty[i].classList.contains("active")) {
            difficulty = allDifficulty[i].getAttribute("data-level")
            getQuestions()
        }
    }
}
getDifficulty()

//Get array containing questions,options and answer from the api
async function getQuestions(category) {

    let apiAddress = `https://the-trivia-api.com/api/questions?categories=${category}&limit=10&difficulty=${difficulty}`;

    let loading = document.querySelector(".loading");
    loading.style.display = "flex"

    await fetch(apiAddress)
    .then(res => res.json())
    .then(data => {
        questionsArray = data;
        loading.style.display = "none"
        loadQuestion()
    })
    .catch(err => {
        questionsArray = [{question: "Couldn't load questions, please check your connection", incorrectAnswers:["option", "option", "option"], correctAnswer:"Answer"}]
        console.log(err)
        loading.style.display = "none"
        loadQuestion()
    })

}

//Load initial questions from api
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

    for(let i=0; i<options.length; i++) {
        options[i].innerHTML = `<input type="radio" name="option" value="${optionsArray[i]}" class="options" id="option${i}" /> ${optionsArray[i]}`
    }
    document.querySelector("#current").textContent = pos+1;
}

//After the user submits
     button.onclick = function() {
         choices = document.getElementsByName("option");
         for(let i=0; i<choices.length; i++) {
             if(choices[i].checked) {

                //check if the option checked is equal to the answer
                if(choices[i].value === correct) {
                    score++;
                    for(let i=0; i<scoreText.length; i++) {
                        scoreText[i].textContent = score;
                    }
                } else {
                    console.log(choices[i].value, "incorrect")
                }
             }
               
         }  
         
        //go to next question
        pos++;
        if(pos > 9) {
            document.querySelector("#scoreboard").style.display = "flex";
        }
        else {
            loadQuestion()
        } 
        
     }
     //retrieves the players and scores upon loading of page
     highScores =  JSON.parse(window.localStorage.getItem("scores"))

     highscoreBoard.innerHTML = `<p class="highScore">${highScores} </p>`

    
function completeTest() {
    document.querySelector("#scoreboard").style.display = "none";
    pos = 0
    getQuestions()
    score = 0;
    for(let i=0; i<scoreText.length; i++) {
        scoreText[i].textContent = score;
    }
}

function clearScores() {
    window.localStorage.removeItem('scores');
    scoreBoard.innerHTML = '';
}
