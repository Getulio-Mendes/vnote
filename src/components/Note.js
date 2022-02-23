import { color } from "d3";
import React, { useRef, useState } from "react";
import options from "../img/more-horizontal.svg";
import "./Note.css";

function Note(props){

    const noteRef = useRef();
    var [drag,setDrag] = useState();
    let clickHandler;
    let className;
    let color;
    let placeholder;

    function downHandler(e){
        window.addEventListener("mousemove",moveHandler)
        // initialize moviment
        noteRef.current.setAttribute("class","note dragged");
        noteRef.current.style.top = `calc(${e.clientY}px - 1rem)`;
        noteRef.current.style.left = `calc(${e.clientX}px - 4rem)`;
        setDrag(true);

        // remove all the handler at the end
        let removeEvent = (e) => {
            e.stopImmediatePropagation();
            window.removeEventListener("mousemove", moveHandler)
            window.removeEventListener("mouseup",removeEvent);
            noteRef.current.setAttribute("class", "note");
            setDrag(false);
        }
        window.addEventListener("mouseup",removeEvent)
    }

    function moveHandler(e){
        noteRef.current.style.top = `calc(${e.clientY}px - 1rem)`;
        noteRef.current.style.left = `calc(${e.clientX}px - 4rem)`;

        let nodes = document.querySelector(".noteList").childNodes;
        // find old position
        let pos;
        nodes.forEach((node,i) => {
            if(node == noteRef.current){
                pos = i;
            }
        })
        
        // detect collisions
        for(let i=0; i < nodes.length;i++){
            if(nodes[i].className != "placeholder" && i != pos){
                let rect = nodes[i].getBoundingClientRect();
                let { x, y } = rect;
                rect = noteRef.current.getBoundingClientRect();
                let nx = rect.x;
                let ny = rect.y;

                if (nx + noteRef.current.clientWidth >= x && nx <= x + nodes[i].clientWidth) {
                    if (y + nodes[i].clientHeight >= ny && y <= ny + noteRef.current.clientHeight) {
                        props.moveNode(i, props.id,pos);
                        window.removeEventListener("mousemove", moveHandler)
                        break;
                    }
                }
            }
        }
    }

    function optionHandler (e){
        e.stopPropagation();
        props.displayModal("options", props.id)
    }

    if (props.folder) {
        clickHandler = () => props.getDir(props.id,props.title);
        className = "folder";
        color = {
            boxShadow: `3px 4px 4px ${props.color}`
        };
    }
    else {
        clickHandler = () => props.getNote(props.id);
        className = "note";
        if(props.separator){
            color = {
                backgroundColor: `${props.color}`
            }
        }
        else{
            color = {
                borderColor: `${props.color}`
            };
        }
    }
    if(drag){
        placeholder = <div className="placeholder"></div>
    }

    return (
        <>
        {props.separator == true
            ? <div className="separator" onClick={optionHandler} style={color} onMouseDown={downHandler} ref={noteRef}></div>
            : <div className={className} onClick={clickHandler} onMouseDown={downHandler} style={color} ref={noteRef}>
                <img src={options} className="icon" onClick={optionHandler} onMouseDown={(e) => e.stopPropagation()}/>

                <span>{props.title}</span>
                <div className="icon"></div>
              </div>
        }
        {placeholder}
       </>
    )
}

export default Note;