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

var saveProfile = function(userProfile) {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
};

////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////