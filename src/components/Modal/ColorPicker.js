import React, { useEffect, useRef } from "react";
import DrawGradient from "./DrawGradient";

function ColorPicker(){

    const svgRef = useRef();
    const circleRef = useRef();

    function eventHandler(e){
        window.addEventListener("mousemove",mouseMove);
        // remove the event on mouseUp
        window.addEventListener("mouseup",() => {
            window.removeEventListener("mousemove",mouseMove);
        })

        let rect = svgRef.current.getBoundingClientRect();
        circleRef.current.setAttribute("cx",e.clientX - rect.left);
        circleRef.current.setAttribute("cy",e.clientY - rect.top);
    }
    function mouseMove(e){
        let rect = svgRef.current.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        circleRef.current.setAttribute("cx",x);
        circleRef.current.setAttribute("cy",y);
        getColor(x,y)
    }

    // convert the svg to a canvas and get the pixel information
    function getColor(x,y){
        var color;

        var xml = new XMLSerializer().serializeToString(svgRef.current);
        var svg64 = window.btoa(xml);
        var image64 = 'data:image/svg+xml;base64,' + svg64;

        let image = new Image();
        image.onload = () => {

            let canvas = document.createElement('canvas');
            let width = svgRef.current.clientWidth;
            let height = svgRef.current.clientHeight;
            canvas.widht = width;
            canvas.height = height; 

            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, width, height);
            color = context.getImageData(x,y,1,1).data;
        }
        image.src = image64;
        return color;
    }

    useEffect(() => {
       DrawGradient(svgRef);
    })

    return(
        <svg id="picker" ref={svgRef} width="200" height="200" onMouseDown={eventHandler}>
            <circle ref={circleRef} r="5" fill="none" stroke="black" cx="100" cy="100"></circle>
        </svg>
    )
}

export default ColorPicker;