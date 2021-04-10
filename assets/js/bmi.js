var bmiFinal = "";
var h = "";
var w = "";

function BMI() {

        h =$('#h').val().trim();
        w = $('#w').val().trim();

        var bmi = w / (h / 100 * h / 100);
        var bmio = (bmi.toFixed(2));

        document.getElementById("result").innerHTML = "Your BMI is " + bmio;
        bmiFinal = bmio;
        saveBmi(bmiFinal);

        document.getElementById("profile-button").outerHTML ="<a href= \'./workout.html \' ><button type=\"button\" id=\"profile-button\"\">Go To Workout</button></a>";
};

var saveBmi = function (bmiFinal) {
    localStorage.setItem("bmi", bmiFinal);
};