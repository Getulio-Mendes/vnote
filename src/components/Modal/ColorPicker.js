import React, { useEffect, useRef } from "react";
import DrawGradient from "./DrawGradient";
import './ColorPicker.css';

function ColorPicker(props){

    const svgRef = useRef();
    const circleRef = useRef();
    var timer = useRef();
    var color = useRef();

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
        if(x <= 200 && y <= 200){
            if(x >= 0 && y >= 0){
                circleRef.current.setAttribute("cx", x);
                circleRef.current.setAttribute("cy", y);
            }
        }
        
        clearTimeout(timer.current);
        timer.current = setTimeout(() => getColor(x,y),200);
    }

    // convert the svg to a canvas and get the pixel information
    function getColor(x,y){

        var xml = new XMLSerializer().serializeToString(svgRef.current);
        var image64 = 'data:image/svg+xml;base64,' + window.btoa(xml);

        let image = new Image();
        image.onload = () => {

            let canvas = document.createElement('canvas');
            let width = svgRef.current.clientWidth;
            let height = svgRef.current.clientHeight;
            canvas.widht = width;
            canvas.height = height; 

            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, width, height);
            color.current = context.getImageData(x,y,1,1).data;
        }
        image.src = image64;
    }

    useEffect(() => {
       DrawGradient(svgRef);
    })

    return(
        <div className="modal">
        <div id="colorPicker">
            <svg id="picker" ref={svgRef} width="200" height="200" onMouseDown={eventHandler}>
                <circle ref={circleRef} r="5" fill="none" stroke="black" cx="100" cy="100"></circle>
            </svg>
            <button onClick={
                () => {
                    props.updateColor(color.current,props.id);
                    props.displayModal(false);
                }
            }>Select Color</button>
        </div>
        </div>
    )
}

export default ColorPicker;