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

fetch(
  'https://wger.de/api/v2/exercise/?format=json'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);

  // Create a variable that will select the <div> where the GIF will be displayed
  var responseContainerEl = document.querySelector('#response-container');

  //   // Empty out the <div> before we append a GIF to it
  //   responseContainerEl.innerHTML = '';

  //   var gifImg = document.createElement('img');
  //   gifImg.setAttribute('src', response.data[0].images.fixed_height.url);

  //   // Append 'gifImg' to the <div>
  //   responseContainerEl.appendChild(gifImg);
  });

/////////////////////////////////////////////////////////////////////////////////////////////////