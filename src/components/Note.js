import React from "react";
import trash from "../img/trash.svg";
import options from "../img/more-horizontal.svg";

function Note(props){
    
    function deleteNote(e){
        e.stopPropagation();
        props.deleteNote(props.id);
    }

    let clickHandler;
    if (props.folder == true) {
        clickHandler = () => props.getDir(props.id);
    }
    else {
        clickHandler = () => props.getNote(props.id);
    }

    return (
        <div className="note" onClick={clickHandler}>
            <img src={options} className="icon" onClick={() => console.log("Option")}></img>

            <span>{props.title}</span>

            <img src={trash} className="icon" onClick={deleteNote}></img>
        </div>
    )
}

export default Note;