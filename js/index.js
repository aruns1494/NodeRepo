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
  var winner = document.getElementById("winners");
  var loser = document.getElementById("losers");
  document.getElementById("myForm").reset();
  d3.csv('/js/winnerList.csv', function(error,input){
    input.forEach(function(d){
      var options = document.createElement('option')
      options.text = d.Name;
      winner.appendChild(options);
    });
  });

  d3.csv('/js/loserList.csv', function(error,input){
    input.forEach(function(d){
      var options = document.createElement('option')
      options.text = d.Name;
      loser.appendChild(options);
    });
  });

  d3.csv('/js/10yearAUSOpenMatches.csv', function(error,input){
    input.forEach(function(d){
      console.log(d.year+" "+d.round+" "+d.player1+" VS "+d.player2);
    })
  })
}
