//set variables to communicate with the DOM
let pos = 0, test, options, testStatus, button, choices, choice, correct, score = 0;

    //DOM elements to be manipulated
    testStatus = document.querySelector("#test_status");
    question = document.querySelector("#question");
    options = document.querySelectorAll("aside #optionbar label");
    button = document.querySelector("#test #optionbar button");
    scoreText = document.querySelectorAll(".score")
    highscoreBoard = document.querySelector("aside #highscoreboard table tbody");

let questionsArray = []
let player = "Unknown";
let category = "general";
let difficulty = "easy";


//Get filters set by the user
function getFilter(filter) {
    let select = document.getElementById(filter);
        select.addEventListener("change", (e) => {
            if (filter === "category") {
                category = select.value
            }
            else {
                difficulty = select.value
            }

            getQuestions()
            pos = 0
            score = 0;
            for(let i=0; i<scoreText.length; i++) {
                scoreText[i].textContent = score;
            }
        })
}
// Get the category selected
getFilter("category")
// Get the difficulty selected
getFilter("difficulty")


//Get array containing questions,options and answer from the api
async function getQuestions() {
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
        // Display error to the ui
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
                choices[i].parentElement.classList.add("correct");
                score++;
                for(let i=0; i<scoreText.length; i++) {
                    scoreText[i].textContent = score;
                }
            } else {
                choices[i].parentElement.classList.add("wrong");
            }
        }
        if(choices[i].value === correct) {
            choices[i].parentElement.classList.add("correct");
        }
        setTimeout(() => {
            choices[i].parentElement.classList.remove("correct");
            choices[i].parentElement.classList.remove("wrong");
        }, 2000)
    } 
    
    pos++;

    //If user completes the quiz
    if(pos > 9) {
        setTimeout(() => {
            document.querySelector("#scoreboard").style.display = "flex";
        }, 2000)
    }
    else {
    //go to next question
        setTimeout(() => {
            loadQuestion()
        },2000)
    } 

}
//retrieves the players and scores upon loading of page
highScores =  JSON.parse(window.localStorage.getItem("scores"))


// Complete the test and close scoreboard, setting other variables to their initial
function completeTest() {
    document.querySelector("#scoreboard").style.display = "none";
    pos = 0
    getQuestions()

    addScores()

    score = 0;
    for(let i=0; i<scoreText.length; i++) {
        scoreText[i].textContent = score;
    }

    // Show splash screen again
    document.querySelector("#splash").classList.remove("closed");
    document.querySelector("#splash").style.display = "block";
}

// Add the score to local storage
function addScores() {
    let scoreData = { player, category, date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`, score }
    let scoresArray = JSON.parse(localStorage.getItem("scores")) || [];

    scoresArray.push(scoreData);

    localStorage.setItem("scores", JSON.stringify(scoresArray))

    getScores();
}

// Get the scores from local storage
function getScores() {
    let scoresArray = JSON.parse(localStorage.getItem("scores")) || [];

    highscoreBoard.innerHTML = "";

    for(let i=0; i<scoresArray.length; i++) {
        let tr = document.createElement("tr")
        let td_name = document.createElement("td")
        let td_category = document.createElement("td")
        let td_date = document.createElement("td")
        let td_score = document.createElement("td")

        td_name.textContent = scoresArray[i].player;
        td_category.textContent = scoresArray[i].category;
        td_date.textContent = scoresArray[i].date;
        td_score.textContent = scoresArray[i].score;

        tr.appendChild(td_name)
        tr.appendChild(td_category)
        tr.appendChild(td_date)
        tr.appendChild(td_score)


        highscoreBoard.appendChild(tr);
    }
}

getScores();

// Clear the scores from the local storage
function clearScores() {
    window.localStorage.removeItem('scores');
    getScores();
    highscoreBoard.innerHTML = ""
}

// Get the player name from the splash screen input
let userinput = document.getElementById("playerInput");
userinput.addEventListener("change",(e) => {
    player = `${e.target.value}`
}) 

// Close the splash screen
function closeSplash() {
    document.querySelector("#splash").classList.add("closed");
    setTimeout(() => {
        document.querySelector("#splash").style.display = "none";
    }, 1000)
    document.getElementById("player").textContent = player;
}
