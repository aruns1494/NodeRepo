
window.onload = function() {
  var winner = document.getElementById("winners");
  var loser = document.getElementById("losers");
  document.getElementById("myForm").reset();
  var arrayOfObject = [];
  console.log(typeof(arrayOfObject));
  d3.csv('js/playerList.csv', function(error,input){
    input.forEach(function(d){
      var options = document.createElement('option')
      var options2 = document.createElement('option')
      options.text = d.Name;
      options2.text = d.Name;
      winner.appendChild(options);
      loser.appendChild(options2);
      arrayOfObject[d.Name] = d;
    });
  });


  document.getElementById("data").addEventListener("keyup",function(event){
    event.preventDefault();
    if(event.keyCode == 13){
      confirmPlayer(arrayOfObject);
    }
  })
}

function confirmPlayer(arrayOfObject){
    var p1 = document.getElementsByName("winnerList")[0].value;
    var p2 = document.getElementsByName("loserList")[0].value;

    document.getElementById("P1Details").innerHTML = "<br><center><h2> "+p1+"</h2></center>"
    document.getElementById("P2Details").innerHTML = "<br><center><h2> "+p2+"</h2></center>"
    var img1 = document.getElementById('image1');
    img1.setAttribute("src","res/"+p1+".png");

    var img2 = document.getElementById('image2');
    img2.setAttribute("src","res/"+p2+".png");

    var pl1 = arrayOfObject[p1];
    var pl2 = arrayOfObject[p2];

    var maxAce = Math.max(~~pl1.Aces,~~pl2.Aces);
    var minAce = Math.min(~~pl1.Aces,~~pl2.Aces);
    var maxWin = Math.max(~~pl1.Wins,~~pl2.Wins);
    var minWin = Math.min(~~pl1.Wins,~~pl2.Wins);
    var maxDF = Math.max(~~pl1.DoubleFault,~~pl2.DoubleFault);
    var minDF = Math.min(~~pl1.DoubleFault,~~pl2.DoubleFault);
    var maxTotalPts = Math.max(~~pl1.TotalPoints,~~pl2.TotalPoints);
    var minTotalPts = Math.min(~~pl1.TotalPoints,~~pl2.TotalPoints);
    var maxAvgSpeed = Math.max(~~pl1.TotalSpeed,~~pl2.TotalSpeed);
    var minAvgSpeed = Math.min(~~pl1.TotalSpeed,~~pl2.TotalSpeed);

    var AceRange = (Math.floor(maxAce/10)+1)*10;
    var WinRange = (Math.floor(maxWin/10)+1)*10;
    var DFRange = (Math.floor(maxDF/10)+1)*10;

    var PtsRange = (Math.floor(maxTotalPts/10)+1)*10;
    var SpdRange = (Math.floor(maxAvgSpeed/10)+1)*10;

    var width = 550;
    var height = 80;

    document.getElementById("map").innerHTML = "<br>";
    var aceGraph = d3.select('#map').append('svg')
        .attr('width',width)
        .attr('height',height);
    var aceTip = d3.tip()
        .attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d){
            return "<font color= \"orangered\"><strong>"+pl1.Name+" : "+pl1.Aces+" Aces </strong><br><strong>"+pl2.Name+" : "+pl2.Aces+" Aces</strong>";
        });
    aceGraph.call(aceTip);
    d3.select('#map').append("br");

    var winGraph = d3.select('#map').append('svg')
        .attr('width',width)
        .attr('height',height-2);
    var winTip = d3.tip()
        .attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d){
            return "<font color= \"orangered\"><strong>"+pl1.Name+" : "+pl1.Wins+" Wins </strong><br><strong>"+pl2.Name+" : "+pl2.Wins+" Wins</strong>";
        });
    winGraph.call(winTip);
    d3.select('#map').append("br");

    var dFaultGraph = d3.select('#map').append('svg')
        .attr('width',width)
        .attr('height',height-2);
    var dTip = d3.tip()
        .attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d){
            return "<font color= \"orangered\"><strong>"+pl1.Name+"\'s Avg Double Fault: "+(~~pl1.DoubleFault).toFixed(0)+ "</strong><br><strong>"+pl2.Name+"\'s Avg Double Fault: "+(~~pl2.DoubleFault).toFixed(0)+"</strong>";
        });
    dFaultGraph.call(dTip);
    d3.select('#map').append("br");

    var avgPtsGraph = d3.select('#map').append('svg')
        .attr('width',width)
        .attr('height',height-2);
    var pTip = d3.tip()
        .attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d){
            return "<font color= \"orangered\"><strong>"+pl1.Name+"\'s Avg Points Earned: "+(~~pl1.TotalPoints).toFixed(0)+ "</strong><br><strong>"+pl2.Name+"\'s Avg Points Earned: "+(~~pl2.TotalPoints).toFixed(0)+"</strong>";
        });
    avgPtsGraph.call(pTip);
    d3.select('#map').append("br");

    var avgSpGraph = d3.select('#map').append('svg')
        .attr('width',width)
        .attr('height',height-2);
    var sTip  = d3.tip()
        .attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d){
            return "<font color= \"orangered\"><strong>"+pl1.Name+"\'s Avg Serve Speed: "+(~~pl1.TotalSpeed).toFixed(0)+ "</strong><br><strong>"+pl2.Name+"\'s Avg Serve Speed: "+(~~pl2.TotalSpeed).toFixed(0)+"</strong>";
        });
    avgSpGraph.call(sTip);
    d3.select('#map').append("br");
//Name,MatchCount,Wins,Aces,TotalSpeed,DoubleFault,TotalPoints

    var CompiledData = [{
        "Name" : "P1",
        "Aces" : 0-~~pl1.Aces,
        "Wins" : 0-~~pl1.Wins,
        "DoubleFault" : 0-~~pl1.DoubleFault,
        "Avg_Points" : 0-~~pl1.TotalPoints,
        "Avg_Speed" : 0-~~pl1.TotalSpeed,
    },
    {
        "Name" : "P2",
        "Aces" : ~~pl2.Aces,
        "Wins" : ~~pl2.Wins,
        "DoubleFault" : ~~pl2.DoubleFault,
        "Avg_Points" : ~~pl2.TotalPoints,
        "Avg_Speed" : ~~pl2.TotalSpeed,
    }];

    var x_Ace = d3.scale.linear()
		.domain([0-AceRange, AceRange])
		.range([0,width]);

    var x_Win = d3.scale.linear()
        .domain([0-WinRange, WinRange])
        .range([0,width]);

    var x_Double = d3.scale.linear()
		.domain([0-DFRange, DFRange])
		.range([0,width]);

    var x_Pts = d3.scale.linear()
    	.domain([0-PtsRange, PtsRange])
    	.range([0,width]);

	var x_Speed = d3.scale.linear()
		.domain([0-SpdRange, SpdRange])
		.range([0,width]);

    var y = d3.scale.ordinal()
	    .domain(CompiledData.map(function(d) { return d.Name; }))
	    .rangeRoundBands([0, height], 0.1);

    var c1 = "#00FFA6"
    var c2 = "#fb00ff"

    aceGraph.append('rect')
        .attr("width",width)
        .attr("height",height)
        .style("stroke",'#FF00FF');

    aceGraph.selectAll(".bar").data(CompiledData)
        .enter().append("rect")
        .attr("class","bar")
    	.attr("x", function(d){ return x_Ace(Math.min(0, d.Aces));})
    	.attr("y", function(d){ return y(d.Name);})
    	.attr("width", function(d){ return Math.abs(x_Ace(d.Aces) - x_Ace(0));})
    	.attr("height", y.rangeBand())
    	.style("fill", function(d){ if(d.Name=="P1") return c1; else return c2;})
        .on("mouseover",aceTip.show)
        .on("mouseout",aceTip.hide)


    winGraph.append('rect')
        .attr("width",width)
        .attr("height",height)
        .style("stroke",'#FF00FF');

    winGraph.selectAll(".bar").data(CompiledData)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", function(d){ return x_Win(Math.min(0, d.Wins));})
        .attr("y", function(d){ return y(d.Name);})
        .attr("width", function(d){ return Math.abs(x_Win(d.Wins) - x_Win(0));})
        .attr("height", y.rangeBand())
        .style("fill", function(d){ if(d.Name=="P1") return c1; else return c2;})
        .on("mouseover",winTip.show)
        .on("mouseout",winTip.hide)


    dFaultGraph.append('rect')
        .attr("width",width)
        .attr("height",height)
        .style("stroke",'#FF00FF');

    dFaultGraph.selectAll(".bar").data(CompiledData)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", function(d){ return x_Double(Math.min(0, d.DoubleFault));})
        .attr("y", function(d){ return y(d.Name);})
        .attr("width", function(d){
            console.log("x_Double : "+x_Double(0));
             return Math.abs(x_Double(d.DoubleFault) - x_Double(0));})
        .attr("height", y.rangeBand())
        .style("fill", function(d){ if(d.Name=="P1") return c1; else return c2;})
        .on("mouseover",dTip.show)
        .on("mouseout",dTip.hide)

    avgPtsGraph.append('rect')
        .attr("width",width)
        .attr("height",height)
        .style("stroke",'#FF00FF');
    avgPtsGraph.selectAll(".bar").data(CompiledData)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", function(d){ return x_Pts(Math.min(0, d.Avg_Points));})
        .attr("y", function(d){ return y(d.Name);})
        .attr("width", function(d){ return Math.abs(x_Pts(d.Avg_Points) - x_Pts(0));})
        .attr("height", y.rangeBand())
        .style("fill", function(d){ if(d.Name=="P1") return c1; else return c2;})
        .on("mouseover",pTip.show)
        .on("mouseout",pTip.hide)

    avgSpGraph.append('rect')
        .attr("width",width)
        .attr("height",height)
        .style("stroke",'#FF00FF');
    avgSpGraph.selectAll(".bar").data(CompiledData)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", function(d){ return x_Speed(Math.min(0, d.Avg_Speed));})
        .attr("y", function(d){ return y(d.Name);})
        .attr("width", function(d){ return Math.abs(x_Speed(d.Avg_Speed) - x_Speed(0));})
        .attr("height", y.rangeBand())
        .style("fill", function(d){ if(d.Name=="P1") return c1; else return c2;})
        .on("mouseover",sTip.show)
        .on("mouseout",sTip.hide)
}
