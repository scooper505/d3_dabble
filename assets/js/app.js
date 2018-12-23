//define SVG area

var svgWidth = 960;
var svgHeight = 600;

// define chart margins as an object

var chartMargins = {
	top: 20,
	bottom: 40,
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



//Import data form csv
d3.csv("assets/data/data.csv")
	.then(function(data) {
	console.log(data)

		data.forEach(function(data) {
			data.healthcare = +data.healthcare;
			data.income = +data.income;
			data.age = +data.age;
		});

		// Create Scale functions
		var xLinearScale = d3.scaleLinear()
			.domain([20, d3.max(data, d => d.income)])
			.range([0, chartWidth]);

		var yLinearScale = d3.scaleLinear()
      		.domain([0, d3.max(data, d => d.age)])
      		.range([chartHeight, 0]);

      	
      	// create axis functions
      	var bottomAxis = d3.axisBottom(xLinearScale);
    	var leftAxis = d3.axisLeft(yLinearScale);

    	// append axes to chart
    	chartGroup.append("g")
    		.attr("transform", `translate(0, ${chartHeight})`)
    		.call(bottomAxis);

    	chartGroup.append("g")
    		.call(leftAxis);



    	// Create circles
    	var circlesGroup = chartGroup.selectAll("circle")
    		.data(data)
    		.enter()
    			.append("circle")
    		.attr("cx", d => xLinearScale(d.income))
    		.attr("cy", d => yLinearScale(d.age))
    		.attr("r", "15")
    		.attr("fill", "green")
    		.attr("opacity", ".5");


    	// Create axes labels
    	chartGroup.append("text")
    		.attr("transform", "rotate(-90)")
    		.attr("y", 0 - chartMargins.left +40)
    		.attr("x", 0 - (chartHeight/2))
    		.attr("dy", "1em")
    		.attr("class", "axisText")
    		.text("axis lable side")


    	chartGroup.append("text")
      		.attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargins.top + 30})`)
      		.attr("class", "axisText")
      		.text("Axis lable top")
	});
	

	

