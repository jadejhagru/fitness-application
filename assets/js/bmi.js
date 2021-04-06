var bmiFinal = "";
var h = "";
var w = "";

function BMI() {
    if (!h && !w) {
        h =$('#h').val().trim();
        w = $('#w').val().trim();
    } else {
        var bmi = w / (h / 100 * h / 100);
        var bmio = (bmi.toFixed(2));

        document.getElementById("result").innerHTML = "Your BMI is " + bmio;
        bmiFinal = bmio;
        saveBmi(bmiFinal);
    }
};

var loadProfile = function () {
    debugger;
    var loadedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (loadedProfile) {
        h = loadedProfile.Height;
        w = loadedProfile.Weight;
        document.getElementById("h").setAttribute("placeholder", loadedProfile.Height);
        document.getElementById("w").setAttribute("placeholder", loadedProfile.Weight);
    }
    else {
        return;
    }
};

var saveBmi = function (bmiFinal) {
    localStorage.setItem("bmi", bmiFinal);
};

loadProfile();