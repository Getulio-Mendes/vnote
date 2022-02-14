function d3Render(svgRef,data,getNote){

    const height = 300;
    const width = window.innerWidth - 20;

    // Select the svg and set the dimentions
    const svg = d3.select(svgRef.current).style("background-color","white")
                                         .attr("width",width)
                                         .attr("height",height);

    // Select the elements and match to data 
    const text = svg.append("g")
                    .selectAll("text")
                    .data(data.nodes)
                    .enter()
                    .append("text").text(node => node.title)
                        .attr("font-size", 15)
                        .attr("dx", node => -1 *(node.title.length / 2 + 18))
                        .attr("dy", 25)

    const links = svg.append('g')
                            .selectAll("line")
                            .data(data.links)
                            .enter().append('line')
                            .attr("stroke-width", 2)
                            .attr("stroke", "#000")

    const nodes = svg.append('g')
                     .selectAll('circle')
                     .data(data.nodes)
                     .enter().append("circle")
                             .attr("r", 10)
                             .attr("fill", "#000")
                             .attr("id",(node) => node.id);

    // create the link force based on the id of the nodes
    const linkForce = d3.forceLink().id(link => link.id).strength(0.1);
    // define the force simulation 
    const simulation = d3.forceSimulation()
                        .force("link",linkForce)
                        .force("charge", d3.forceManyBody())
                        .force("center", d3.forceCenter(width/2,height/2))

    // set the simalation to the data
    simulation.nodes(data.nodes).on("tick",ticked);
    simulation.force("link").links(data.links);

    // change the selected svg node to match the simulated data
    function ticked(){
        nodes.attr("cx",d => d.x)
             .attr("cy",d => d.y);

        text.attr("x",d => d.x)
            .attr("y",d => d.y);

        links
            .attr('x1', link => link.source.x)
            .attr('y1', link => link.source.y)
            .attr('x2', link => link.target.x)
            .attr('y2', link => link.target.y)
    }

    function selectedColors(e) {
        nodes.attr("fill", (n) => {
            if (n.index == e.target.__data__.index){
                return "#aa7";
            }
            else{
                return "#000";
            }
        });
    }
    function normalColors(){
        nodes.attr("fill","#000");
        text.attr('fill', "#000")
    }

    nodes.on('mouseover', selectedColors);
    nodes.on('mouseout', normalColors);
    nodes.on('click', (e) => {getNote(e.target.__data__.id)});
}

export default d3Render;