//globally clal userProfile as an object with empty attributes
var userProfile = {
    Age: "",
    Weight: "",
    Height: ""
};

//show modal on profile button click
$("#profile-button").click(function () {
    $("#profile-modal").show();
});

//dismiss main modal when closed
$(".close-btn").click(function () {
    $("#profile-modal").hide();
});

//send user stats to userProfile object
$("#submit-button").click(function () {
    var userAge = $("input[id='age'").val();
    var userWeight = $("input[id='weight'").val();
    var userHeight = $("input[id='height'").val();
    userProfile.Age = userAge;
    userProfile.Weight = userWeight;
    userProfile.Height = userHeight;
    saveProfile(userProfile);
});

//save the user's profile to localstorage
var saveProfile = function (userProfile) {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
};

<<<<<<< Updated upstream
//
=======
>>>>>>> Stashed changes
