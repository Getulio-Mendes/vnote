import React, {useEffect, useRef} from "react";
import d3Render from "./d3Logic";

const data = {
    nodes: [
        {name:"Note 0"},
        {name:"Note 1"},
        {name:"Note 3"},
        {name:"Note 4"},
        {name:"Note 5"}
    ]
}
function Map(props){

    const svgRef = useRef();
    
    useEffect(() => {
      d3Render(svgRef,data);
    })

    return (
        <svg ref={svgRef}></svg>
    )
}

export default Map;