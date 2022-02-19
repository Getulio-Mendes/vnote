import React from "react";
import trash from "../../img/trash.svg";
import palette from "../../img/palette.svg";

function Options(props){
  
    function deleteNode(){
        if(props.folder == false){
            props.deleteNote(props.id);
        }
        else{
            props.deleteFolder(props.id);
        }
        props.displayModal(false)
    }
  
    return (
        <div id="optionsModal">
            <>
                <button className="optionBtn" onClick={deleteNode} >
                    <img src={trash}/>
                    <br/>
                    Delete
                </button>

                <button className="optionBtn" onClick={() => props.updateColor("#f33",props.id)}>
                    <img src={palette}></img>
                    <br/>
                    Change color
                </button>
            </>
        </div>
    )
}

export default Options;