//globally clal userProfile as an object with empty attributes
var userProfile = {
    Age: "", 
    Weight: "",
    Height: ""
};

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

///ANDRE'S STUFF - FEEL FREE TO COMMENT OUT - SHOULD NOT IMPACT ANYTHING ///////////////////////////////

fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
}).then(function(response) {console.log(response);})

//Abs-Crunches
var absCrunches = function () { fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
})
.then(function(response) {
  $(".exercise-name").text(response.results[82].name);
  $(".exercise-graphic").attr('alt',response.results[82].name);
  $(".exercise-description").append(response.results[82].description);
  $(".exercise-group").text('Musclue group: Abs');
});

fetch(
  'https://api.giphy.com/v1/gifs/OgJiGwuIlVvgs?api_key=pEDYeIUt9R8XnZUzlutQsGdmtpuWCJqf'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    $(".exercise-graphic").attr('src',response.data.images.downsized_large.url);
})
createExerciseCard("abs-crunches");
};
//

var absCrunches = function () { fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
})
.then(function(response) {
  $(".exercise-name").text(response.results[82].name);
  $(".exercise-graphic").attr('alt',response.results[82].name);
  $(".exercise-description").append(response.results[82].description);
  $(".exercise-group").text('Musclue group: Abs');
});

fetch(
  'https://api.giphy.com/v1/gifs/OgJiGwuIlVvgs?api_key=pEDYeIUt9R8XnZUzlutQsGdmtpuWCJqf'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    $(".exercise-graphic").attr('src',response.data.images.downsized_large.url);
})
createExerciseCard("abs-crunches");
};
//


//Creates exercise card object - needs be to scoped to the exercise option selection loop
var createExerciseCard = function(exerciseId)
{
  //is the base class for the exercise cards to append to the body
  $(".exercise-card-section").append("<div>");

  //actual card code starts here - must have a pre-existing div
  var exerciseCard = $(".exercise-card-section div"); //will be the day box
  exerciseCard.addClass("card exercise-card");
  exerciseCard.attr("id",exerciseId); //will hold the exercise name,day and day slot
  
  //Card image/GIF
  exerciseCard.append("<img>");
  exerciseCard.find("img").addClass("card-img-top exercise-graphic");

  //Card name
  exerciseCard.append("<div class=\"card-body\">");
  exerciseCard.find(".card-body").append("<h5>");
  exerciseCard.find(".card-body h5").addClass("card-title exercise-name");

  //Card description
  exerciseCard.find(".card-body").append("<div class=\"card-text exercise-description\">");

  //Card muscle group
  exerciseCard.append("<ul class=\"list-group list-group-flush\">");
  exerciseCard.find(".list-group").append("<li class=\"list-group-item exercise-group\">");

  //Card rest tip
  exerciseCard.find(".list-group").append("<li class=\"list-group-item helpful-tip\">")
  exerciseCard.find(".list-group .helpful-tip").text("Remember to rest between every set for 40 secs to 1 min");

  //Creates set,rep count and rep time selection button---
  var buttonName = ["set","rep-count","rep-group"];
  for (var i = 0; i < 3; i++)
  {
    exerciseCard.append("<div class=\"btn-group\" id=\""+buttonName[i]+"-button\">");

    exerciseCard.find("#"+buttonName[i]+"-button.btn-group").append("<div class=\"btn-group\" role=\"group\" id=\""+buttonName[i]+"-button\">");

    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").append("<button id=\""+buttonName[i]+"-button\">");

    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").addClass("btn btn-secondary btn-sm dropdown-toggle");
    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("type","button");
    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("data-toggle","dropdown");
    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("aria-haspopup","true");
    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").attr("aria-expanded","false");

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
    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").find("button").text(buttonText);
    exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").append("<label class=selected-value></label>");

    //creates menu options
      exerciseCard.find("#"+buttonName[i]+"-button.btn-group[role=group]").append("<div id=\""+buttonName[i]+"-options\">")
      exerciseCard.find("#"+buttonName[i]+"-options").addClass("dropdown-menu exercise-set-rep dropdown-menu-right").attr("x-placement","bottom-start");

      if (i === 0) //Note: &#35 is to show the # character in the HTML href attribute
      {
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">3</a>");
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">4</a>");
      }
      else if (i === 1)
      {
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">5-8</a>");
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">8-10</a>");
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">10-12</a>");
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">12-15</a>");
      }
      else if(i === 2)
      { 
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">15</a>");
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">30</a>");
        exerciseCard.find("#"+buttonName[i]+"-options").append("<a class=\"dropdown-item\" href=\"&#35\">60</a>");
      }

  }
}

//Holds all exercises
var exerciseList = {
  arms: ['bicepCurls','','','',''],
  legs: ['','','','',''],
  abs: [absCrunches,''],
  chest: ['','','','',''],
  back: ['','','','',''],
  shoulders: ['','','','',''],
  calves: ['','','','','']
}

//exerciseList.abs[0](); // this syntax ->calls abs crunches

//event listenser to assign set and rep button values
$(".exercise-card").on("click","a",function()
{
  event.preventDefault();
  var text = $(this).text().trim();

  $(this).parent().parent().parent().find(".selected-value").text(text);
});
/////////////////////////////////////////////////////////////////////////////////////////////////
