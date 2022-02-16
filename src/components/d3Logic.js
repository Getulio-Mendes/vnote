import { node } from "webpack";

var rendered = false;

function resize(svgRef){
    const width = document.getElementById("root").offsetWidth;

    d3.select(svgRef.current).attr("width",width);
}

function d3Render(svgRef,data,getNote){

    const height = 300;
    const width = document.getElementById("root").offsetWidth;

    window.addEventListener("resize",() => resize(svgRef));

    // Select the svg and set the dimentions
    const svg = d3.select(svgRef.current).style("background-color","white")
                                         .attr("width",width)
                                         .attr("height",height);
    // clear if rendered
    if(rendered == true){
        svg.selectAll('*').remove();
    }
    // Select the elements and match to data 
    const links = svg.append('g')
                            .selectAll("line")
                            .data(data.links)
                            .enter().append('line')
                            .attr("stroke-width", 2)
                            .attr("stroke", "#aaa");

    const text = svg.append("g")
                    .selectAll("text")
                    .data(data.nodes)
                    .enter()
                    .append("text").text(node => node.title)
                        .attr("font-size", 13)
                        .attr("font-family", "sans-serif")
                        .attr("text-anchor","middle")
                        .attr("dy",25);

    const nodes = svg.append('g')
                     .selectAll('circle')
                     .data(data.nodes)
                     .enter().append("circle")
                             .attr("class","node")
                             .attr("r", 10)
                             .attr("fill", "#000")
                             .attr("id",(node) => node.id);

    // create the link force based on the id of the nodes
    const linkForce = d3.forceLink().id(link => link.id).strength(0.05);
    // define the force simulation 
    const simulation = d3.forceSimulation()
                        .force("link",linkForce)
                        .force("collision",d3.forceCollide().radius((node) => node.r))
                        .force("charge", d3.forceManyBody().distanceMax(500).strength(-20))
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

    d3.drag().subject(nodes).on("start",started);
    function started(event) {
        const circle = d3.select(this).classed("dragging", true);

        event.on("drag", dragged).on("end", ended);

        function dragged(event, d) {
            circle.raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y);
        }

        function ended() {
            circle.classed("dragging", false);
        }
    }

    rendered = true;
}

export default d3Render;