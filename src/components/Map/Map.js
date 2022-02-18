import React, {useEffect, useRef} from "react";
import d3Render from "./d3Logic";
import svgPlanning from "./Planning.js"

function Map(props){

    const svgRef = useRef();
    
    useEffect(() => {
        let data = props.getMap();
        d3Render(svgRef, data, props.getNote);
        svgPlanning(svgRef);

    },[props.nodeCount])

    return (
        <svg ref={svgRef} viewBox="150 0 300 300"></svg>
    )
}

export default Map;