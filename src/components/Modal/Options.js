import React, { useState } from "react";
import ColorPicker from "./ColorPicker.js";
import trash from "../../img/trash.svg";
import palette from "../../img/palette.svg";

function Options(props){

    var [picker,setPicker] = useState();
  
    function deleteNode(){
        if(props.folder == false){
            props.deleteNote(props.id);
        }
        else{
            props.deleteFolder(props.id);
        }
        props.displayModal(false)
    }

    function displayPicker(){
        if(picker == null){
            setPicker(true);
        }
        else{
            setPicker();
        }
    }
  
    return (
        <div id="optionsModal">
            <>
                <button className="optionBtn" onClick={deleteNode} >
                    <img src={trash}/>
                    <br/>
                    Delete
                </button>

                <button className="optionBtn" onClick={displayPicker}>
                    <img src={palette}></img>
                    <br/>
                    Change color
                </button>

                {picker &&
                <ColorPicker updateColor={props.updateColor} id={props.id} displayModal={props.displayModal}/>
                }
            </>
        </div>
    )
}

export default Options;