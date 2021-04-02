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
// var exerciseList = {
    
//     arms:
//     {
//         name:  ,
//         description: '' , //fetch from weger
//         image:'', //fetch from weger
//         gif:'' //fetch from giphy
//     }
// }

//Abs-Crunches
fetch(
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
});
//


//Creates exercise card object - needs be to scoped to the exercise option selection loop
var createExerciseCard = function()
{
  //is the base class for the exercise cards to append to the body
  $(".exercise-card-section").append("<div>");

  //actual card code starts here - must have a pre-existing div
  var exerciseCard = $(".exercise-card-section div");
  exerciseCard.addClass("card exercise-card");
  
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
    //need to add an id to the button groups
    exerciseCard.append("<div class=\"btn-group\""+buttonName[i]+">")
    exerciseCard.find(".btn-group").append("<div class=\"btn-group "+buttonName[i]+"-button role=\"group\">");
    exerciseCard.find(".btn-group ."+buttonName[i]+"-button").append("<button>");
    exerciseCard.find(".btn-group .btn-group button").addClass("btn btn-secondary btn-sm dropdown-toggle");
    exerciseCard.find(".btn-group .btn-group button").attr("type","button");
    exerciseCard.find(".btn-group .btn-group button").attr("data-toggle","dropdown");
    exerciseCard.find(".btn-group .btn-group button").attr("aria-haspopup","true");
    exerciseCard.find(".btn-group .btn-group button").attr("aria-expanded","false");

    var buttonText;
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
    exerciseCard.find(".btn-group .btn-group button").text(buttonText);
  }
}

//createExerciseCard();
/////////////////////////////////////////////////////////////////////////////////////////////////