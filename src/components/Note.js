import React from "react";
import trash from "../img/trash.svg";
import options from "../img/more-horizontal.svg";

function Note(props){
    
    function deleteNote(e){
        e.stopPropagation();
        props.deleteNote(props.id);
    }

    let clickHandler;
    let className;
    if (props.folder) {
        clickHandler = () => props.getDir(props.id);
        className = "folder"
    }
    else {
        clickHandler = () => props.getNote(props.id);
        className = "note"
    }

    return (
        <div className={className} onClick={clickHandler}>
            <img src={options} className="icon" onClick={() => console.log("Option")}></img>

            <span>{props.title}</span>

            <img src={trash} className="icon" onClick={deleteNote}></img>
        </div>
    )
}

export default Note;