import { color } from "d3";
import React from "react";
import options from "../img/more-horizontal.svg";
import "./Note.css";

function Note(props){
    
    let clickHandler;
    let className;
    let color;
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
        color = {
            borderColor: `${props.color}`
        };
    }

    return (
        <>
        {props.separator == true
            ? <div className="separator"></div>
            : <div className={className} onClick={clickHandler} style={color}>
                <img src={options} className="icon" onClick={(e) => {
                    e.stopPropagation();
                    props.displayModal("options", props.id, props.folder)
                }}
                />

                <span>{props.title}</span>
              </div>
        }
       </>
    )
}

export default Note;