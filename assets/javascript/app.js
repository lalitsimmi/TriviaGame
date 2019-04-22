$(document).ready(function () {
  var options = [
    {
      question: "Who was the legendary Benedictine monk who invented champagne?", 
      choice: ["Perignon", "Alexander Graham Bell", "Guglielmo Marconi", "Wright brothers"],
      answer: 0,
      
     },
     {
       question: "Name the largest freshwater lake in the world?", 
      choice: ["Great Salt Lake – Utah", "Lake Superior", "Lake Balkhash – Kazakstan", "Lake Eyre – Australia"],
      answer: 1,
      
     }, 
     {
       question: "Who invented the rabies vaccination?", 
      choice: ["Dr. Jonas Salk", "Louis Pasteur", "Alexander Fleming", "Alexander Graham Bell" ],
      answer: 1,
      
    }, 
    {
      question: "Which is not an ingredient in a Harvey Wallbanger cocktail?", 
      choice: ["Orange Juice", "Vodka", "Sour Mix", "Galliano" ],
      answer: 2,
      
    }, 
    {
      question: "How many items are there in a Bakers' Dozen?", 
      choice: ["12", "6", "24", "13" ],
      answer: 3,
     
    }, 
    {
      question: "Name the seventh planet from the sun", 
      choice: ["Earth", "Mars", "Neptune", "Uranus" ],
      answer: 3,
      
    }, 
    {
      question: "What is the capital city of Spain?", 
      choice: ["Adelaide", "London", "Madrid", "NewYork" ],
      answer: 2,
      
    }, 
    {
      question: "Who played Neo in The Matrix?", 
      choice: ["Tom Hanks", "Keanu Reeves", "Will Smith", "Tom Cruise" ],
      answer: 1,
      
    }];
  
  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess ="";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];
  
  
  
  $("#reset").hide();
  //click start button to start game
  $("#start").on("click", function () {
      $("#start").hide();
      displayQuestion();
      runTimer();
      for(var i = 0; i < options.length; i++) {
    holder.push(options[i]);
  }
    })
  //timer start
  function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
    }
  }
  //timer countdown
  function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
  
    //stop timer if reach 0
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      hidepicture();
    }	
  }
  
  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  //pick question 
  //display question 
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random()*options.length);
    pick = options[index];
  
   //check answer
      $("#questionblock").html("<h2>" + pick.question + "</h2>");
      for(var i = 0; i < pick.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.choice[i]);
        //assign array position to it so can check answer
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoice);
  //		}
  }
  
  
  
  //function for answer 
  $(".answerchoice").on("click", function () {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));
  
    //results
    if (userGuess === pick.answer) {
      stop();
      correctCount++;
      userGuess="";
      $("#answerblock").html("<p>Correct!</p>");
      hidepicture();
  
    } else {
      stop();
      wrongCount++;
      userGuess="";
      $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
      hidepicture();
    }
  })
  }
  
  
  function hidepicture () {
    $("#answerblock").append("Trivia Next");
    newArray.push(pick);
    options.splice(index,1);
  
    var hidpic = setTimeout(function() {
      $("#answerblock").empty();
      timer= 20;
  
    //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
      $("#questionblock").empty();
      $("#questionblock").html("<h2>Game Over!</h2>");
      $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
      $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
      $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
      $("#reset").show();
      correctCount = 0;
      wrongCount = 0;
      unanswerCount = 0;
  
    } else {
      runTimer();
      displayQuestion();
  
    }
    }, 3000);
  
  
  }
  
  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  
  })
  
  })