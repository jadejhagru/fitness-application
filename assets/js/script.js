//storage variable 
var workout = {
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: []
};

//globally stores currently selected exercise ID
var selectedExerciseId;
var dayVariable;

//globally stores the selected day and exercise group
var selectedDay = "";
var exerciseGroup;

//filter exercises
var exerciseList = 
[345,91,544,303,125,238,176,95, /*abs*/
  344, 81, 82, 86, 771, 195, 279, 89, /*arms*/
  362, 803, 105, 340, 107, 278, 424, 548, /*back*/
  308, 776, 104, 103, 411, 102, /*calves*/
  307, 192, 354, 98, 260, 122, 210, 25, /*chest*/
  111, 300, 112, 408, 432, 810, 117, 177, /*legs*/
  123, 119, 319, 148, 233, 359, 311, 237, /*shoulders*/
];

//close exercise modal
$(".close-btn").click(function () {
  $("#exercise-modal").hide();
  $("#category").empty();
});

//add exercise to day card
$("span.add").click(function () {

  selectedDay = $(this).parent().siblings().text(); //used to append buttons

  dayVariable = $(this).parent()[0].attributes.id.value; //used to append buttons

  $("#exercise-modal").show();
  getExercises();
  $("#category").empty();
});

//get the exercise categories
var getExercises = function () {
  var apiUrl = "https://wger.de/api/v2/exercisecategory/?format=json&limit=1000"
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        showCategories(data.results);
      })
    }
  });
};

//show exercise categories on the page
var showCategories = function (exercisecategory) {
  for (i = 0; i < exercisecategory.length; i++) {
    var categoryEl = document.createElement("button");
    categoryEl.classList.add("category-btn");
    categoryEl.textContent = exercisecategory[i].name;
    categoryEl.setAttribute("id", exercisecategory[i].id);
    $("#category").append(categoryEl);
  }
  $(".category-btn").click(function () {
    showExercises($(this)[0].attributes.id.value);
    exerciseGroup = this.textContent;
  })
};

//show exercise list based on selected category
var showExercises = function (category) {

  var apiUrl = "https://wger.de/api/v2/exercise/?limit=55&category=" + category + "&language=2"

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {

        $("#category").empty();
        for (i = 0; i < data.results.length; i++) {

          if (exerciseList.includes(data.results[i].id)) {
            var exerciseEl = document.createElement("button");
            exerciseEl.classList.add("exercise-btn");
            exerciseEl.textContent = data.results[i].name;
            exerciseEl.setAttribute("id", data.results[i].id);
            $("#category").append(exerciseEl);
          }
        }

        $(".exercise-btn").click(function (event) {

          createExerciseButton($(this).text(), this.getAttribute("id"), dayVariable);
          selectedExerciseId = this.getAttribute("id");

          $("#category").empty();
          $("#exercise-modal").hide();
        });
      })
    }
  })
};

//if a workout is removed, remove it from localStorage
var removeFromSchedule = function (exerciseCard, exerciseId) {
  if (exerciseCard[0].id == "sunday") {
    delete workout.sunday[workout.sunday.indexOf(exerciseId)];
  } else if (exerciseCard[0].id == "monday") {
    delete workout.monday[workout.monday.indexOf(exerciseId)];
  } else if (exerciseCard[0].id == "tuesday") {
    delete workout.tuesday[workout.tuesday.indexOf(exerciseId)];
  } else if (exerciseCard[0].id == "wednesday") {
    delete workout.wednesday[workout.wednesday.indexOf(exerciseId)];
  } else if (exerciseCard[0].id == "thursday") {
    delete workout.thursday[workout.thursday.indexOf(exerciseId)];
  } else if (exerciseCard[0].id == "friday") {
    delete workout.friday[workout.friday.indexOf(exerciseId)];
  } else if (exerciseCard[0].id == "saturday") {
    delete workout.saturday[workout.saturday.indexOf(exerciseId)];
  }
};

//create exercise buttons in each day
var createExerciseButton = function (exerciseName, exerciseId, dayVar) {

  var exerciseCard = $("#" + dayVar);

  //ensures that exercises are not duplicated
  if (exerciseCard.find("button").prevObject[0].innerText.includes(exerciseName)) { return; }

  exerciseCard.find(".card-text").empty(); //removes rest
  exerciseCard.append("<button type=\"button\" id=\"" + exerciseId + "\" class=\"" + exerciseName + " workout-btn\">" + exerciseName + "</button>");

  exerciseName = exerciseName.replaceAll(" ", "-");
  exerciseName = exerciseName.replaceAll(",", "-");
  exerciseName = exerciseName.toLowerCase();
  exerciseCard.append("<button type=\"button\" class=\"removeButton " + exerciseName + "\">X</button>");

  //delete exercise  
  $(".removeButton").click(function () {
    $(this).parent().find("#" + exerciseId).remove();

    if (!($(this).parent().find("buttons")).prevObject[0].children[1].val) {
      $(this).parent().find(".card-text").append("<p class=\"card-text\">Rest<span stlye=\"color: white;\"><i class=\"fas fa-bed\" aria-hidden=\"true\"></i></span></p>");
    };

    removeFromSchedule(exerciseCard, exerciseId);
    $(this).remove();
  });

  //add information to the modal for selected exercise
  $("#" + exerciseId + ".workout-btn").click(function () {
    $("#workout-modal").show();
    addExerciseCardData(exerciseId);
  });

  //dismiss main modal when closed
  $(".close-btn").click(function () {
    $("#workout-modal").hide();
    $(".newdiv").remove();
  });

  //call save workout function
  saveSchedule(exerciseCard, exerciseId);
};

//save workout on button click
$(".save-button").click(function () {
  saveWorkout();
});

//load workout on button click
$(".load-button").click(function () {
  loadWorkout();
});

//filters exerciseId to stored day
var saveSchedule = function (exerciseCard, exerciseId) {
  if (exerciseCard[0].id == "sunday") {
    workout.sunday.push(exerciseId);
  } else if (exerciseCard[0].id == "monday") {
    workout.monday.push(exerciseId);
  } else if (exerciseCard[0].id == "tuesday") {
    workout.tuesday.push(exerciseId);
  } else if (exerciseCard[0].id == "wednesday") {
    workout.wednesday.push(exerciseId);
  } else if (exerciseCard[0].id == "thursday") {
    workout.thursday.push(exerciseId);
  } else if (exerciseCard[0].id == "friday") {
    workout.friday.push(exerciseId);
  } else if (exerciseCard[0].id == "saturday") {
    workout.saturday.push(exerciseId);
  }
};

//save workouts to local storage
var saveWorkout = function () {
  localStorage.setItem("workout", JSON.stringify(workout));
}

//find loaded exercise name
var getExerciseName = function (loadExerciseId, day) {
  fetch(
    "https://wger.de/api/v2/exerciseinfo/" + loadExerciseId
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      createExerciseButton(data.name, loadExerciseId, day);
    }
)};

//load the workout schedule
var loadWorkout = function () {

  var loadedWorkout = JSON.parse(localStorage.getItem("workout"));
  //loop through the object list to find the corresponding day
  for (i = 0; i < loadedWorkout.sunday.length; i++) {
    if (loadedWorkout.sunday[i]) {
      getExerciseName(loadedWorkout.sunday[i], "sunday");
    }
  }

  for (i = 0; i < loadedWorkout.monday.length; i++) {
    if (loadedWorkout.monday[i]) {
      getExerciseName(loadedWorkout.monday[i], "monday");
    }
  }

  for (i = 0; i < loadedWorkout.tuesday.length; i++) {
    if (loadedWorkout.tuesday[i]) {
      getExerciseName(loadedWorkout.tuesday[i], "tuesday");
    }
  }

  for (i = 0; i < loadedWorkout.wednesday.length; i++) {
    if (loadedWorkout.wednesday[i]) {
      getExerciseName(loadedWorkout.wednesday[i], "wednesday");
    }
  }

  for (i = 0; i < loadedWorkout.thursday.length; i++) {
    if (loadedWorkout.thursday[i]) {
      getExerciseName(loadedWorkout.thursday[i], "thursday");
    }
  }

  for (i = 0; i < loadedWorkout.friday.length; i++) {
    if (loadedWorkout.friday[i]) {
      getExerciseName(loadedWorkout.friday[i], "friday");
    }
  }

  for (i = 0; i < loadedWorkout.saturday.length; i++) {
    if (loadedWorkout.saturday[i]) {
      getExerciseName(loadedWorkout.saturday[i], "saturday");
    }
  }

};


//event listenser to assign set and rep button values
$(".exercise-card").on("click", "a", function () {
  event.preventDefault();
  var text = $(this).text().trim();

  $(this).parent().parent().parent().find(".selected-value").text(text);
});

//load the user's bmi
var loadBmi = function () {
  var loadedBmi = localStorage.getItem("bmi");
  document.getElementById("bmi").innerHTML = loadedBmi;
  if (!loadedBmi) {
    document.getElementById("bmi").innerHTML = "Please click the BMI button to calculate your BMI."
  }
};

//Creates exercise card element
var createExerciseCard = function () 
{
  
  $(".modal-body").append("<div class=\"newdiv\"></div>");

  //Card video
  $(".modal-body").find(".newdiv").append("<iframe class=\"exercise-graphic\"></iframe>");

  //Card name
  $(".modal-body").find(".newdiv").append("<h5 class=\"exercise-name\"></h5>");

  //Card description
  $(".modal-body").find(".newdiv").append("<div class=\"exercise-description\"></div>");

  //Card muscle group
  $(".modal-body").find(".newdiv").append("<li class=\"exercise-group \"></li>");

  //Card rest tip
  $(".modal-body").find(".newdiv").append("<li>Remember to rest between every set for 40 secs to 1 min</li>")
}

    //appends data content to modal card for exercises
    var addExerciseCardData = function (exerciseId) {
      fetch(
        "https://wger.de/api/v2/exerciseinfo/" + exerciseId
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {

          createExerciseCard();
      //search for YouTube videos and grab the first response
      fetch(
        'https://www.googleapis.com/youtube/v3/search/?q='+ data.name + '%20exercise&key=AIzaSyD_e2KrYBug3VBuxVAZzfTZGcghcrrLPdU'
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          //iframe API call to add iframe to page
          $(".exercise-graphic").attr("src",'https://www.youtube.com/embed/' + response.items[0].id.videoId) + '?enablejsapi=1';
      })

    //checks if exercise id is listed in the API
        $(".exercise-name").text(data.name);
        $(".exercise-graphic").attr('alt', data.name);
        $(".exercise-description").append(data.description);
        $(".exercise-group").text("Exercise Group:" + exerciseGroup);
  });
};

//load BMI on page load
loadBmi();