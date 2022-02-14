import React from "react";
import arrowLeft from "../img/arrow-left.svg";
import folderPlus from "../img/folder-plus.svg";
import filePlus from "../img/file-plus.svg";
import map from "../img/share-2.svg";

const styles = {
    img:{
        transform: "rotate(270deg)"
    }
}

function Actions(props){
    return (
        <div id="actions">
            <button onClick={props.createNote}>
                <img src={filePlus}></img>
            </button>
            <button onClick={props.createFolder}>
                <img src={folderPlus}></img>
            </button>
            <button onClick={props.goBack}>
                <img src={arrowLeft}></img>
            </button>
            <button onClick={props.actvateMap} >
                <img src={map} style={styles.img}></img>
            </button>
        </div>
    )
}

export default Actions;