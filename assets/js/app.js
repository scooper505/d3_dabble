//define SVG area

var svgWidth = 960;
var svgHeight = 600;

// define chart margins as an object

var chartMargins = {
	top: 20,
	bottom: 60,
	right: 100,
	left: 100
};

// define dimensions of the chart

var chartWidth = svgWidth - chartMargins.left - chartMargins.right;
var chartHeight = svgHeight - chartMargins.top - chartMargins.bottom;




// select the body of the html to append SVG to

var svg = d3.select("#scatter")
	.append("svg")
	.attr("height", svgHeight)
	.attr("width", svgWidth);

var chartGroup = svg.append("g")
	.attr("transform", `translate(${chartMargins.left}, ${chartMargins.top})`);

// initial parameters
var chosenXAxis = "obesity";

var chosenYAxis = "smokes"

// create functions for updating the x and y scale
function xScale(censusData, chosenXAxis) {
	var xLinearScale = d3.scaleLinear()
	.domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
		d3.max(hairData, d => d[chosenXAxis]) * 1.2])
	.range([0, chartWidth]);

	return xLinearScale
};

function yScale(censusData, chosenYAxis) {
	var yLinearScale = d3.scaleLinear()
	.domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
		d3.max(censusData, d => d[chosenYAxis]) * 1.2])
	.range([chartHeight, 0])

	return yLinearScale
};


// function that will be used for updates Axis variables when axes are clicked
function renderXAxes(newXScale, xAxis) {
	var bottomAxis = d3.axisBottom(newXScale);

	xAxis.transition()
		.duration(1000)
		.call(bottomAxis);
}

function renderYAxes(newYScale, yAxis) {
	var bottomAxis = d3.axisLeft(newXScale);

	xAxis.transition()
		.duration(1000)
		.call(leftAxis);
}

// function for updating  the circle group with transistion to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
	circlesGroup.transistion()
		.duration(1000)
		.attr("cx", d => newXScale(d[chosenXAxis]));
		// .attr("cy", d => newYScale(d[chosenYAxis]));

	return circlesGroup;
}



//Import data form csv then execute the following functions
d3.csv("assets/data/data.csv")
	.then(function(censusData) {
	console.log(censusData)

		// parse data
		censusData.forEach(function(data) {
			data.poverty = +data.poverty;
			data.povertyMOE = +data.povertyMOE;
			data.age = +data.age;
			data.ageMOE = +data.ageMOE;
			data.income = +data.income;
			data.incomeMOE = +data.incomeMOE;
			data.healthcare = +data.healthcare;
			data.healthcareLow = +data.healthcareLow;
			data.healthcareHigh = +data.healthcareHigh;
			data.obesity = +data.obesity;
			data.obesityLow = +data.obesityLow;
			data.obesityHigh = +data.obesityHigh;
			data.smokes = +data.smokes;
			data.smokesHigh = +data.smokesHigh;
			data.smokesLow = +data.smokesLow;
		});



		// Create Scale functions
		var xLinearScale = xScale(censusData, chosenXAxis);
		

		var yLinearScale = yScale(censusData, chosenYAxis);


	
      	
      	// create axis functions
      	var bottomAxis = d3.axisBottom(xLinearScale);
    	var leftAxis = d3.axisLeft(yLinearScale);

    	// append x axis to chart
    	var xAxis = chartGroup.append("g")
    		.classed("x-axis", true)
    		.attr("transform", `translate(0, ${chartHeight})`)
    		.call(bottomAxis);

    	// append y axis to chart
    	var yAxis = chartGroup.append("g")
    		.classed("y-axis", true)
    		.call(leftAxis)




    	// Create circles and append initial circles
    	var circlesGroup = chartGroup.selectAll("circle")
    		.data()
    		.enter()
    		.append("circle")
    		.attr("cx", d => xLinearScale(d.obesity))
    		.attr("cy", d => yLinearScale(d.smokes))
    		.attr("r", "15")
    		.attr("fill", "green")
    		.attr("opacity", ".5");


    	// Create group for multiple y axes labels and append labels
    	var ylabelsgroup = chartGroup.append("g")

    	chartGroup.append("text")
    		.attr("transform", "rotate(-90)")
    		.attr("y", 0 - chartMargins.left +40)
    		.attr("x", 0 - (chartHeight/2))
    		.attr("dy", "1em")
    		.classed("axisText", true)
    		.text("Smokes")

		// Create group for multiple x axes labels and append

		var xlabelsGroup = chartGroup.append("g")
			.attr("transform", `translate(${width / 2}, ${chartHeight + chartMargin.top + 20})`);

    	var obesityLabel = xlabelsGroup.append("text")
      		.attr("x", 0)
      		.attr("y",20)
      		.attr("value", "obesity")
      		.classed("active", true)
      		.text("Obesity");

      	// event listener for x axis selection
     	// xlabelsGroup.selectAll("text")
     	// 	.on("click", function() {
     	// 		var value = d3.select(this).attr("value"):
     	// 		if (value != chhosenXAxis) {
     	// 			chosenXAxis = value;

     	// 			xLinearScale = xScale(date, chosenXAxis);

     	// 			xAxis = 

     	// 			circlesGroup = 

     	// 			if (chosenXAxis === "") {
     	// 				label
     	// 			else
     	// 			}
     	// 		}
     	// 	})


	});
	

	

