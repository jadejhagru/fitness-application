var h = document.getElementById('h').value;
var w = document.getElementById('w').value;
var bmiFinal = "";

function BMI() {
    var bmi = w/(h/100*h/100);
    var bmio = (bmi.toFixed(2));

    document.getElementById("result").innerHTML = "Your BMI is " + bmio;
    bmiFinal = bmio;
    saveBmi(bmiFinal);
}

var loadProfile = function() {
    var loadedProfile = JSON.parse(localStorage.getItem("userProfile"));
    h = loadedProfile.Height;
    w = loadedProfile.Weight;
    document.getElementById("h").setAttribute("placeholder", loadedProfile.Height);
    document.getElementById("w").setAttribute("placeholder", loadedProfile.Weight);
    if (loadedProfile) {
        BMI();
    }
};

var saveBmi = function (bmiFinal) {
    localStorage.setItem("bmi", bmiFinal);
    console.log(localStorage.bmi);
};

loadProfile();
