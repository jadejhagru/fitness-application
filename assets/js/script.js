//globally call userProfile as an object with empty attributes
var userProfile = {
    Weight: "",
    Height: ""
};

//globally stores currently selected exercise ID
var selectedExerciseId;
var dayVariable;

var selectedDay = "";
var exerciseGroup;

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
    var userWeight = $("input[id='weight'").val();
    var userHeight = $("input[id='height'").val();
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
    exerciseGroup = this.textContent;
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
          exerciseEl.setAttribute("id", data.results[i].id);
          $("#category").append(exerciseEl);
        }

        $(".exercise-btn").click(function (event) {

          createExerciseButton($(this).text(),this.getAttribute("id"));
          selectedExerciseId = this.getAttribute("id");

          $("#category").empty();
          $("#exercise-modal").hide();
        });
      })
    }
  })
};


var createExerciseButton = function (exerciseName, exerciseId) {

    var exerciseCard = $("#"+dayVariable);
    
    //ensures that exercises are not duplicated
    if(exerciseCard.find("button").prevObject[0].innerText.includes(exerciseName))
    { return; }

    exerciseCard.find(".card-text").empty(); //removes rest
    exerciseCard.append("<button type=\"button\" id=\""+exerciseId+"\" class=\""+exerciseName+" workout-btn\">"+exerciseName+" place set and rep buttons here"+"</button>");

    exerciseName = exerciseName.replaceAll(" ","-");
    exerciseName = exerciseName.replaceAll(",","-");
    exerciseName = exerciseName.toLowerCase();
  
    //Creates set,rep count and rep time selection button---
    var buttonName = ["set","rep-count","rep-group"];
  for (var i = 0; i < 3; i++)
  {
    exerciseCard.append("<div class=\"dropdown\" id=\""+buttonName[i]+"-"+exerciseName+"-button\">");

    var buttonIdentifier = ("#"+buttonName[i]+"-"+exerciseName);

    exerciseCard.find(buttonIdentifier+"-button.dropdown").append("<button id=\""+buttonName[i]+"-"+exerciseName+"-buttons\"></button>");
    exerciseCard.find(buttonIdentifier+"-button.dropdown").find("button").addClass("btn btn-secondary dropdown-toggle");
    exerciseCard.find(buttonIdentifier+"-button.dropdown").find("button").attr("type","button");
    exerciseCard.find(buttonIdentifier+"-button.dropdown").find("button").attr("data-bs-toggle","dropdown");
    exerciseCard.find(buttonIdentifier+"-button.dropdown").find("button").attr("aria-expanded","false");

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

     exerciseCard.find(buttonIdentifier+"-button.dropdown").find("button").text(buttonText);

    //creates menu options
      exerciseCard.find(buttonIdentifier+"-button.dropdown").append("<ul id=\""+buttonName[i]+"-"+exerciseName+"-options\"></ul>")
      exerciseCard.find(buttonIdentifier+"-options").addClass("dropdown-menu").attr("aria-labelledby",buttonName[i]+"-"+exerciseName+"-buttons");

      if (i === 0) //Note: &#35 is to show the # character in the HTML href attribute
      {
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">3</a></li>");
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">4</a></li>");
      }
      else if (i === 1)
      {
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">5-8</a></li>");
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">8-10</a></li>");
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">10-12</a></li>");
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">12-15</a></li>");
      }
      else if(i === 2)
      { 
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">15</a></li>");
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">30</a></i>");
        exerciseCard.find(buttonIdentifier+"-options").append("<li><a class=\"dropdown-item\" href=\"&#35\">60</a></li>");
      }

      exerciseCard.find(buttonIdentifier+"-button.dropdown").append("<label class=selected-value></label>");
     } //end of for loop

     //JADE STUFF
      $(".workout-btn").click(function () {
      $("#workout-modal").show();

      //should only trigger one exercise button click
        addExerciseCardData(exerciseId);
      //
    });

      //dismiss main modal when closed
      $(".close-btn").click(function() {
      $("#workout-modal").hide();
      $(".newdiv").remove();
        });
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

//load the user's bmi
var loadBmi = function() {
  var loadedBmi = localStorage.getItem("bmi");
  document.getElementById("bmi").innerHTML = loadedBmi;
  if (!loadedBmi) {
    document.getElementById("bmi").innerHTML = "Please click the BMI button to calculate your BMI."
  }
};

loadBmi();

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

//Creates exercise card object - needs be to scoped to the exercise option selection loop
var createExerciseCard = function() //dayId is the section it goes to in the day column
{
  //actual card code starts here 
  //$("#workout-modal").remove();
  $(".modal-body").append("<div class=\"newdiv\"></div>");
  
  //Card image/GIF
  $(".modal-body").find(".newdiv").append("<img class=\"exercise-graphic\"></img>");

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
var addExerciseCardData = function (exerciseId) { fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
})
.then(function(data) {

  createExerciseCard();

  //checks if exercise id is listed in the API
  for (i = 0; i < data.results.length; i++ ){

    if (exerciseId == data.results[i].id){
      $(".exercise-name").text(data.results[i].name);
      $(".exercise-graphic").attr('alt',data.results[i].name);
      $(".exercise-description").append(data.results[i].description);
      $(".exercise-group").text("Exercise Group:"+exerciseGroup); }
  }
});

// //giphy fetch will go here
// fetch(
//   'https://api.giphy.com/v1/gifs/OgJiGwuIlVvgs?api_key=pEDYeIUt9R8XnZUzlutQsGdmtpuWCJqf'
// )
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(response) {

//     $(".exercise-graphic.").attr('src',response.data.images.downsized_large.url);
// })
};