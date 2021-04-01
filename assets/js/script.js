$("button").click(function() {
    debugger;
    $('#profile-modal').show();
});



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