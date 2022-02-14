function d3Render(svgRef,data){

    const height = 500;
    const width = 500;

    // Select the svg and set the dimentions
    const svg = d3.select(svgRef.current).style("background-color","white")
                                         .attr("width",width)
                                         .attr("height",height);

    // Select the nodes and match to data 
    const nodes = svg.append('g')
                     .selectAll('circle')
                     .data(data.nodes)
                     .enter().append("circle")
                             .attr("r", 10)
                             .attr("fill", "#000");

    // define the force simulation simulation
    const simulation = d3.forceSimulation()
                        .force("charge", d3.forceManyBody())
                        .force("center", d3.forceCenter(width/2,height/2))

    // set the simalation to the data
    simulation.nodes(data.nodes).on("tick",ticked);

    // change the selected svg node to match the simulated data
    function ticked(){
        nodes.attr("cx",d => d.x)
             .attr("cy",d => d.y);
    }

}

export default d3Render;