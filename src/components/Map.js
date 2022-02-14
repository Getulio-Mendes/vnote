import React, {useEffect, useRef} from "react";
import d3Render from "./d3Logic";

function Map(props){

    const svgRef = useRef();
    
    useEffect(() => {
       let data = props.getMap();
        d3Render(svgRef, data, props.getNote);
    })

    return (
        <svg ref={svgRef}></svg>
    )
}

export default Map;