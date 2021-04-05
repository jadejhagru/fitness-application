//globally call userProfile as an object with empty attributes
var userProfile = {
    Age: "", 
    Weight: "",
    Height: ""
};

//globally stores currently selected exercise ID
var selectedExerciseId;
var dayVariable;
var exerciseName = "";
var selectedDay = "";

//show modal on profile button click
$("#profile-button").click(function() {
    $("#profile-modal").show();
});

//dismiss main modal when closed
$(".close-btn").click(function() {
    $("#profile-modal").hide();
});

//send user stats to userProfile object
$("#submit-button").click(function() {
    var userAge = $("input[id='age'").val();
    var userWeight = $("input[id='weight'").val();
    var userHeight = $("input[id='height'").val();
    userProfile.Age = userAge;
    userProfile.Weight = userWeight;
    userProfile.Height = userHeight;
    saveProfile(userProfile);
});

//save the user's profile to localstorage
var saveProfile = function(userProfile) {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
};

$(".close-btn").click(function() {
  $("#exercise-modal").hide();
  $("#category").empty();
});

//add exercise
$("span.add").click(function() {
  
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
  $(".category-btn").click(function() {
    showExercises($(this)[0].attributes.id.value);
  })
};

var showExercises = function(category) {
  var apiUrl = "https://wger.de/api/v2/exercise/?format=json&limit=1000" + "&category=" + category + "&equipment=7";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        $("#category").empty();
        for (i = 0; i < data.results.length; i++) {
          var exerciseEl = document.createElement("button");
          exerciseEl.classList.add("exercise-btn");
          exerciseEl.textContent = data.results[i].name;
          exerciseName = data.results[i].name;
          exerciseEl.setAttribute("id", data.results[i].id);
          selectedExerciseId = data.results[i].id;
          $("#category").append(exerciseEl);
        }

        $(".exercise-btn").click(function (event) {

          createExerciseButton($(this).text());

          $("#category").empty();
        });
      })
    }
  })
};

var createExerciseButton = function (exerciseName) {
  console.log(exerciseName+ " "+dayVariable);
  console.log("exercise button: "+selectedDay);

  debugger;
  var exerciseDayButtonCard = $("#"+dayVariable).append("<div></div>"); // id=\""+dayVariable+"\" class=\"card-body\"

  exerciseDayButtonCard.addClass("card exercise-card "+exerciseName+"").attr("id",exerciseName);

  //Card name
  exerciseDayButtonCard.find(".card-body").append("<p>");
  exerciseDayButtonCard.find(".card-body p").addClass("card-title exercise-name "+exerciseName+" "+selectedDay+"");

  //Creates set,rep count and rep time selection button---
  var buttonName = ["set","rep-count","rep-group"];
  for (var i = 0; i < 3; i++)
  {
    exerciseDayButtonCard.append("<div class=\"btn-group\" id=\""+buttonName[i]+"-button\">");

    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group").append("<div class=\"btn-group\" role=\"group\" id=\""+buttonName[i]+"-button\">");

    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").append("<button id=\""+buttonName[i]+"-button\">");

    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").addClass("btn btn-secondary btn-sm dropdown-toggle");
    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("type","button");
    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("data-toggle","dropdown");
    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("aria-haspopup","true");
    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("aria-expanded","false");

    var buttonText; // button menu name

    if (i === 0)
    {
      buttonText="Sets";
    }
    else if (i === 1)
    {
      buttonText="Rep Count";
    }
    else if(i === 2)
    { 
      buttonText="Rep Time";
    }
    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").text(buttonText);
    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").append("<label class=selected-value></label>");

    //creates menu options
    exerciseDayButtonCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").append("<div id=\""+buttonName[i]+"-options\">")
      exerciseDayButtonCard.find("#"+buttonName[i]+"-options").addClass("dropdown-menu exercise-set-rep dropdown-menu-right").attr("x-placement","bottom-start");

      if (i === 0) //Note: &#35 is to show the # character in the HTML href attribute
      {
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">3</a>");
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">4</a>");
      }
      else if (i === 1)
      {
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">5-8</a>");
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">8-10</a>");
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">10-12</a>");
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">12-15</a>");
      }
      else if(i === 2)
      { 
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">15</a>");
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">30</a>");
        exerciseDayButtonCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">60</a>");
      }

  }
}

//event listenser to assign set and rep button values
$(".exercise-card").on("click","a",function()
{
  event.preventDefault();
  var text = $(this).text().trim();

  $(this).parent().parent().parent().find(".selected-value").text(text);
});

// //ANDRE'S OLD STUFF - Keep this commented

//using this to check the api list of exercises in the console log
fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
}).then(function(response) {console.log(response);})

// //Old
// //Holds all exercises
// var exerciseList = {
//   arms: ['bicepCurls','hammerCurls','tricepDip','tricepExtension'],
//   shoulders: ['lateralRaises','shoulderPressDumbbells','lateralFrontRaises','shoulderShrug'],
  
//   chest: ['benchPress','inclineDumbbellPress','pushups'],
//   abs: [absCrunches,'legRaises','plank','sideCrunch'],
//   back: ['bentoverDumbbellRows','pullUps','hipRaiseLying','longPulleyRow'],
  
//   legs: ['romanianDeadlift','squats','dumbbellLungesStanding'],
//   calves: ['calfRaises','legCurl','legExtenstion']
// }

// //Abs-Crunches
// var absCrunches = function (dayRowId,exerciseName) { fetch(
//   'https://wger.de/api/v2/exercise/?format=json&limit=1000'
// )
// .then(function(response) {
//   return response.json();
// })
// .then(function(response) {
//   $(".exercise-name."+exerciseName+"").text(response.results[82].name);
//   $(".exercise-graphic."+exerciseName+"").attr('alt',response.results[82].name);
//   $(".exercise-description."+exerciseName+"").append(response.results[82].description);
//   $(".exercise-group."+exerciseName+"").text('Muscle group: Abs');
// });

// fetch(
//   'https://api.giphy.com/v1/gifs/OgJiGwuIlVvgs?api_key=pEDYeIUt9R8XnZUzlutQsGdmtpuWCJqf'
// )
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(response) {

//     $(".exercise-graphic."+exerciseName+"").attr('src',response.data.images.downsized_large.url);

// })
// createExerciseCard("crunches",1);
// };
// //

// exerciseList.arms[0](2,"crunches");
// //

// var dynamicExercise = function (selectedExerciseId,exerciseName,dayId) { fetch(
//   'https://wger.de/api/v2/exercise/?format=json&limit=1000'
// )
// .then(function(response) {
//   return response.json();
// })
// .then(function(response) {

//   exerciseName.replace(" ","-");
//   exerciseName.replace(",","");
//   exerciseName = exerciseName.toLowerCase();

//   $(".exercise-name."+exerciseName+"").text(response.results[selectedExerciseId].name);
//   $(".exercise-graphic."+exerciseName+"").attr('alt',response.results[selectedExerciseId].name);
//   $(".exercise-description."+exerciseName+"").append(response.results[selectedExerciseId].description);
//   $(".exercise-group."+exerciseName+"").text('Muscle group: Abs');
// });

// //giphy fetch

// // fetch(
// //   'https://api.giphy.com/v1/gifs/OgJiGwuIlVvgs?api_key=pEDYeIUt9R8XnZUzlutQsGdmtpuWCJqf'
// // )
// //   .then(function(response) {
// //     return response.json();
// //   })
// //   .then(function(response) {

// //     $(".exercise-graphic."+exerciseName+"").attr('src',response.data.images.downsized_large.url);

// })

// createExerciseCard(exerciseName,dayId);
// )};


// dynamicExercise(selectedExerciseId,exerciseName,dayVariable);//add day id arguement variable


//Creates exercise card object - needs be to scoped to the exercise option selection loop
// var createExerciseCard = function(exerciseId,dayId) //dayId is the section it goes to in the day column
// {
  
//   //actual card code starts here 
//   $("#"+dayId+".card-body").append("<div class=\"card-body newdiv\" id="+dayId+"\"></div>");
//   var exerciseCard = $("#"+dayId+".card-body").find(".newdiv"); 

//   exerciseCard.addClass("card exercise-card "+exerciseId+"").attr("id",exerciseId);
  
//   //Card image/GIF
//   exerciseCard.append("<img>");
//   exerciseCard.find("img").addClass("card-img-top exercise-graphic "+exerciseId+" "+dayId+"");

//   //Card name
//   exerciseCard.append("<div class=\"card-body\">");
//   exerciseCard.find(".card-body").append("<h5>");
//   exerciseCard.find(".card-body h5").addClass("card-title exercise-name "+exerciseId+" "+dayId+"");

//   //Card description
//   exerciseCard.find(".card-body").append("<div class=\"card-text exercise-description "+exerciseId+" "+dayId+"\">");

//   //Card muscle group
//   exerciseCard.append("<ul class=\"list-group list-group-flush\">");
//   exerciseCard.find(".list-group").append("<li class=\"list-group-item exercise-group "+exerciseId+" "+dayId+"\">");

//   //Card rest tip
//   exerciseCard.find(".list-group").append("<li class=\"list-group-item helpful-tip "+exerciseId+" "+dayId+"\">")
//   exerciseCard.find(".list-group .helpful-tip").text("Remember to rest between every set for 40 secs to 1 min");



