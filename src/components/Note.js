import React from "react";
import options from "../img/more-horizontal.svg";
import "./Note.css";

function Note(props){
    
    let clickHandler;
    let className;
    if (props.folder) {
        clickHandler = () => props.getDir(props.id,props.title);
        className = "folder"
    }
    else {
        clickHandler = () => props.getNote(props.id);
        className = "note"
    }

    return (
        <div className={className} onClick={clickHandler}>
            <img src={options} className="icon" onClick={(e) => {
                    e.stopPropagation();
                    props.displayModal("options",props.id,props.folder)
                }}
            />

            <span>{props.title}</span>
        </div>
    )
}

export default Note;