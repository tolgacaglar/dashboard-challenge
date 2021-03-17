

// Read data from the json file
d3.json("data/sample.json").then(data => {
    var names = data["names"];
    // Add names to the selection dropbox
    d3.select("#selDataset")
      .selectAll("option")
      .data(names)
      .enter()
      .append("option")
      .attr("value", name => name)
      .text(name => name);
});

function optionChanged(value) {
  
  d3.json("data/sample.json").then(data => {
    var samples = data["samples"]
    
    console.log(samples)
    // Filter the values
    var filteredSample = samples.filter(sample => sample.id === value)[0];
    // Barchart trace
    var traceBar = {
      x: filteredSample.sample_values.slice(0,10),   // Already sorted data
      y: filteredSample.otu_ids.slice(0,10)
                               .map(id => `OTU ${id}`),
      type: "bar",
      orientation: "h",
      text: filteredSample.otu_labels
    };

    // Barchart data
    var dataBar = [traceBar]

    // Plot the barchart using Plotly on #id
    Plotly.newPlot("bar", dataBar)
    console.log(filteredSample)


    // Bubble chart
    var traceBubble = {
      x: filteredSample.otu_ids,
      y: filteredSample.sample_values,
      mode: "markers",
      marker: {
        size: filteredSample.sample_values,
        color: filteredSample.otu_ids
      },
      text: filteredSample.otu_labels
    };

    //Bubble chart data
    var dataBubble = [traceBubble];

    // Plot the bubble chart using Plotly on #id
    Plotly.newPlot("bubble", dataBubble)


    // Gauge chart

    // Add table to the demographic area
    var metadata = data["metadata"];
    // Filter metadata
    var filteredMetadata = metadata.filter(d => d.id === +value)[0];
    // Clear
    d3.select("#sample-metadata").html("")
    d3.select("#sample-metadata")
      .selectAll("span")
      .data(Object.entries(filteredMetadata))
      .enter()
      .append("span")
      .text(([key, value]) => `${key}: ${value}`)
      .append("br");      
  });
  }
    // odu_ids.push(data.names)
    // //  Create the Traces
    // var trace1 = {
    //   x: data.organ,
    //   y: data.survival.map(val => Math.sqrt(val)),
    //   type: "box",
    //   name: "Cancer Survival",
    //   boxpoints: "all"
    // };
  
    // // Create the data array for the plot
    // var data = [trace1];
  
    // // Define the plot layout
    // var layout = {
    //   title: "Square Root of Cancer Survival by Organ",
    //   xaxis: { title: "Organ" },
    //   yaxis: { title: "Square Root of Survival" }
    // };
  
    // // Plot the chart to a div tag with id "plot"
    // Plotly.newPlot("plot", data, layout);
//   });
  