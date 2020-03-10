async function drawLineChart() {
  const dataset = await d3.csv("./../data/climate-G1-annual.csv")
  console.table(dataset[0]);
  const yAccessor = d => d.TMEANF;
  const dateParser = d3.timeParse("%Y");
  const xAccessor = d => dateParser(d.YEAR);
  console.log(xAccessor(dataset[0]));

  let dimensions = {
    width: window.innerWidth * 0.3,
    height: 250,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  }

  dimensions.boundedWidth = dimensions.width -
    dimensions.margin.left -
    dimensions.margin.right
  dimensions.boundedHeight = dimensions.height -
    dimensions.margin.top -
    dimensions.margin.bottom

  // Draw canvas

  const wrapper = d3.select("#wrapper2")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
    .style("transform", `translate(${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px)`)

  // Create scales

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

  const line = bounds.append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "#c8c8c8")
    .attr("stroke-width", 1)

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)

  // Add label to Y axis
  yAxis.append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", -35)
    .attr("x", -95)
    .attr("text-anchor", "middle")
    .html("Temperature (&#8239;&#8457;&#8239;)");

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${
        dimensions.boundedHeight
      }px)`)

  // Add label to X axis
  xAxis.append("text")
    .attr("fill", "#000")
    .attr("x", 165)
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .text("Year");


};

drawLineChart()