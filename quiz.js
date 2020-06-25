//set variables to communicate with the DOM
let pos = 0, test, options, testStatus, button, choices, choice, correct = 0;
            testStatus = document.querySelector("h1 p");
            test = document.querySelector("#test #question");
            options = document.querySelectorAll("#test #optionbar .options");
            button = document.querySelector("#test #optionbar button");
            scoreBoard = document.querySelector("#test #scoreboard");
        
//create class to house the questions array and function to render questions
     class Question {
         //array containing questions,options and answer
         questions = [
             ["Who founded facebook","Otegbola Abel", "Mark Zukerberg", "Jeff Bezos", "Abraham Lincoln", "2"],
             ["What is the full name of the founder of the automobile company 'ferrari'", "Enzo Ferrari", "Feruccio Ferrari", "Moses Ferrari", "Emzy Ferrari", "1"],
             ["In greek mythology, who is the god of war", "Zeus", "Poseidon", "Ares", "Hercules", "3"],
             ["What is the capital of brazil", "Rio de jenaro", "Bounes Ares", "Baghdad", "Brasilia", "4"],
             ["What year did world war I started", "1914", "1903", "1915", "1913", "1"],
             ["In which country is the highest building located", "USA", "UAE", "Canada", "Egypt", "2"],
             ["What sound does a cow make", "Meow", "Moo", "Hiss", "Caw", "2"],
             ["Which is the largest ocean in the world", "Atlantic", "Indian", "Antartic", "Pacific", "4"],
             ["Which musical instrument was played by the famous jimi hendrix", "Saxophone", "Piano", "Guitar", "Trumpet", "3"],
             ["Which of the following is not a proffessional football player", "Lionel Messi", "Raphael Nadal", "Sergio Ramos", "Christiano Ronaldo", "2"]
         ]

         //function to render questions
         render() {
            //if test finishes
            if(pos == "10") {
                let player = prompt("you scored "+correct+" out of " +this.questions.length + " please enter your name....");
                scoreBoard.innerHTML += player + " " + correct + " " + "</br>";
                correct = 0;
                pos = 0;
                //saves the players and scores to local storage
                window.localStorage.setItem("scores", JSON.stringify(scoreBoard.textContent));
 
            }
            //render questions to the page
            testStatus.textContent = "Question " + (pos+1) + " of " +this.questions.length;
            test.textContent = (pos+1) + ". "+ this.questions[pos][0];
            for(let i=0; i<options.length; i++) {
                options[i].innerHTML = `<input type='radio' name='options' value="${i+1}"> ${this.questions[pos][i+1]}`;
                options[i].style.background = "#222";
            }
         }

     };
      
     let show = new Question();
            show.render();
     
//After the user submits
     button.onclick = function() {
         choices = document.getElementsByName("options");
         for(let i=0; i<choices.length; i++) {
             if(choices[i].checked) {
                //check if the option checked is equal to the answer
                if(choices[i].value == show.questions[pos][5]) {
                    //changes the background to darkgreen if option is correct
                    choices[i].parentElement.style.background = "darkgreen";
                     correct++;
                } else {
                    //changes the background to darkred if option is wrong
                    choices[i].parentElement.style.background = "darkred";
                }
             }
               
         }  //go to next question
           pos++;
            setTimeout(function() {
                //delays the next question to show the color change to darkgreen or darkred
                show.render();
            }, 300);   
        
     }
     //retrieves the players and scores upon loading of page
     scoreBoard.innerHTML =  JSON.parse(window.localStorage.getItem("scores"))

    

 