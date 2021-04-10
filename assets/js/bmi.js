var bmiFinal = "";
var h = "";
var w = "";

function BMI() {
   // if (!h && !w) {
        h =$('#h').val().trim();
        w = $('#w').val().trim();
   // } else {
        var bmi = w / (h / 100 * h / 100);
        var bmio = (bmi.toFixed(2));

        document.getElementById("result").innerHTML = "Your BMI is " + bmio;
        bmiFinal = bmio;
        saveBmi(bmiFinal);
 //   }
};

var saveBmi = function (bmiFinal) {
    localStorage.setItem("bmi", bmiFinal);
};