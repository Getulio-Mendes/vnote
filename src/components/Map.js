import React, {useEffect, useRef} from "react";
import d3Render from "./d3Logic";

const data = {
    nodes: [
        {name:"Note 0",id:0},
        {name:"Note 1",id:1},
        {name:"Note 3",id:2},
        {name:"Note 4",id:3},
        {name:"Note 5",id:4},
        {name:"Note 6",id:5}
    ],
    links: [
        {source:0,target:3},
        {source:1,target:4},
    ]
}
function Map(props){

    const svgRef = useRef();
    
    useEffect(() => {
      d3Render(svgRef,data,props.getNote);
    })

    return (
        <svg ref={svgRef}></svg>
    )
}

export default Map;