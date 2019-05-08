$(document).ready(function () {

  $("#reset").hide();

  var correct = 0;
  var wrong = 0;


  var questionsbank = [
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
      choice: ["Dr. Jonas Salk", "Louis Pasteur", "Alexander Fleming", "Alexander Graham Bell"],
      answer: 1,

    },
    {
      question: "Which is not an ingredient in a Harvey Wallbanger cocktail?",
      choice: ["Orange Juice", "Vodka", "Sour Mix", "Galliano"],
      answer: 2,

    },
    {
      question: "How many items are there in a Bakers' Dozen?",
      choice: ["12", "6", "24", "13"],
      answer: 3,

    },
    {
      question: "Name the seventh planet from the sun",
      choice: ["Earth", "Mars", "Neptune", "Uranus"],
      answer: 3,

    },
    {
      question: "What is the capital city of Spain?",
      choice: ["Adelaide", "London", "Madrid", "NewYork"],
      answer: 2,

    },
    {
      question: "Who played Neo in The Matrix?",
      choice: ["Tom Hanks", "Keanu Reeves", "Will Smith", "Tom Cruise"],
      answer: 1,

    }];



  var newArray = [];
  var qarray = [];



  $("#start").on("click", function () {
    $("#start").hide();
    next();

    for (var i = 0; i < questionsbank.length; i++) {
      qarray.push(questionsbank[i]);
    }
  })


  var newq;
  var index;
  function next() {

    index = Math.floor(Math.random() * questionsbank.length);
    newq = questionsbank[index];


    $("#questionblock").html("<h2>" + newq.question + "</h2>");


    for (var i = 0; i < newq.choice.length; i++) {
      var selection = $("<div>");
      selection.addClass("answerchoice");
      selection.html(newq.choice[i]);
      selection.attr("data-userdata", i);
      $("#answerblock").append(selection);

    }

    var selected = "";

    $(".answerchoice").on("click", function () {
      selected = parseInt($(this).attr("data-userdata"));


      if (selected === newq.answer) {
        stop();
        correct++;
        selected = "";
        $("#answerblock").html("<p>Correct!</p>");
        hidepicture();

      } else {
        stop();
        wrong++;
        selected = "";
        hidepicture();
      }
    })
  }


  function hidepicture() {

    newArray.push(newq);
    questionsbank.splice(index, 1);

    var hidpic = setTimeout(function () {
      $("#answerblock").empty();

      if ((wrong + correct) === questionsbank.length) {
        $("#questionblock").empty();
        $("#questionblock").html("<h2>Game Over!</h2>");
        $("#answerblock").append("<h4> Correct: " + correct + "</h4>");
        $("#answerblock").append("<h4> Incorrect: " + wrong + "</h4>");

        $("#reset").show();
        correct = 0;
        wrong= 0;
      } else {
        next();
      }
    }, 10);
  }

  $("#reset").on("click", function () {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for (var i = 0; i < qarray.length; i++) {
      questionsbank.push(qarray[i]);
    }
    next();
  })

})
