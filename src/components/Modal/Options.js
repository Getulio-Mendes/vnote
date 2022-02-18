import React from "react";
import trash from "../../img/trash.svg";

function Options(props){
    var modalContent;

    if (props.folder == false) {
        modalContent = <img src={trash} onClick={() => {
            props.deleteNote(props.id)
            props.displayModal(false)
        }}/>
    }
    else {
        modalContent = <img src={trash} onClick={() => {
            props.deleteFolder(props.id)
            props.displayModal(false)
        }}/>
    }
    return (
        <div id="modalContent">{modalContent}</div>
    )
}

export default Options;