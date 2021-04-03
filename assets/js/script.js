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

//using this to check the api list of exercises in the console log
fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
}).then(function(response) {console.log(response);})


//Abs-Crunches
var absCrunches = function (dayRowId,exerciseName) { fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
})
.then(function(response) {

  $(".exercise-name."+exerciseName+"").text(response.results[82].name);
  $(".exercise-graphic."+exerciseName+"").attr('alt',response.results[82].name);
  $(".exercise-description."+exerciseName+"").append(response.results[82].description);
  $(".exercise-group."+exerciseName+"").text('Musclue group: Abs');
});

fetch(
  'https://api.giphy.com/v1/gifs/OgJiGwuIlVvgs?api_key=pEDYeIUt9R8XnZUzlutQsGdmtpuWCJqf'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {

    $(".exercise-graphic."+exerciseName+"").attr('src',response.data.images.downsized_large.url);

})
createExerciseCard("crunches",1);
};
//

//Bicep-Curls
var bicepCurls = function (dayRowId,exerciseName) { fetch(
  'https://wger.de/api/v2/exercise/?format=json&limit=1000'
)
.then(function(response) {
  return response.json();
})
.then(function(response) {
  $(".exercise-name."+exerciseName+"").text(response.results[45].name);
  $(".exercise-graphic."+exerciseName+"").attr('alt',response.results[45].name);
  $(".exercise-description."+exerciseName+"").append(response.results[45].description);
  $(".exercise-group."+exerciseName+"").text('Musclue group: Arms');
});

fetch(
  'https://api.giphy.com/v1/gifs/HMzadBUQG3y53pYmOK?api_key=pEDYeIUt9R8XnZUzlutQsGdmtpuWCJqf'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    $(".exercise-graphic."+exerciseName+"").attr('src',response.data.images.downsized_large.url);
})
createExerciseCard("bicep-curls",2);
};
//


//Creates exercise card object - needs be to scoped to the exercise option selection loop
var createExerciseCard = function(exerciseId,num) //num is the section it goes to in the day column
{
  //is the base class for the exercise cards to append to the body and the class will point to the day box.
  $(".exercise-card-section"+num).append("<div>");

  //actual card code starts here - must have a pre-existing div
  var exerciseCard = $(".exercise-card-section"+num+" div");
  exerciseCard.addClass("card exercise-card "+exerciseId+"").attr("id",exerciseId);
  
  //Card image/GIF
  exerciseCard.append("<img>");
  exerciseCard.find("img").addClass("card-img-top exercise-graphic "+exerciseId+"");

  //Card name
  exerciseCard.append("<div class=\"card-body\">");
  exerciseCard.find(".card-body").append("<h5>");
  exerciseCard.find(".card-body h5").addClass("card-title exercise-name "+exerciseId+"");

  //Card description
  exerciseCard.find(".card-body").append("<div class=\"card-text exercise-description "+exerciseId+"\">");

  //Card muscle group
  exerciseCard.append("<ul class=\"list-group list-group-flush\">");
  exerciseCard.find(".list-group").append("<li class=\"list-group-item exercise-group "+exerciseId+"\">");

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
  arms: [bicepCurls,'hammerCurls','tricepDip','tricepExtension'],
  shoulders: ['lateralRaises','shoulderPressDumbbells','lateralFrontRaises','shoulderShrug'],
  
  chest: ['benchPress','inclineDumbbellPress','pushups'],
  abs: [absCrunches,'legRaises','plank','sideCrunch'],
  back: ['bentoverDumbbellRows','pullUps','hipRaiseLying','longPulleyRow'],
  
  legs: ['romanianDeadlift','squats','dumbbellLungesStanding'],
  calves: ['calfRaises','legCurl','legExtenstion']
}


//Uncomment this to run the cards
//exerciseList.abs[0](1,"bicep-curls"); // this syntax ->calls abs crunches //the number is the section it goes to in the day column
//exerciseList.arms[0](2,"crunches");

//event listenser to assign set and rep button values
$(".exercise-card").on("click","a",function()
{
  event.preventDefault();
  var text = $(this).text().trim();

  $(this).parent().parent().parent().find(".selected-value").text(text);
});
/////////////////////////////////////////////////////////////////////////////////////////////////
