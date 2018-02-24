//console.log("I am included");
/*
var winner = document.getElementById("browsers");
//console.log(winner);

//winner.innerHTML = options;
d3.csv('/js/winnerList.csv', function(error,input){
  input.forEach(function(d){
    var options = document.createElement('option')
    options.text = d.Name;
    winner.appendChild(options);
  });
});
*/
window.onload = function() {
  var winner = document.getElementById("browsers");
  d3.csv('/js/winnerList.csv', function(error,input){
    input.forEach(function(d){
      var options = document.createElement('option')
      options.text = d.Name;
      winner.appendChild(options);
    });
  });
}
