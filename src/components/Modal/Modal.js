import React, { useState } from "react";
import Options from "./Options";
import "./Modal.css";

const styles = {
    cancel : {
        borderRight: "1px solid bisque",
        backgroundColor: "#6B0504"
    },
    accept: {
        backgroundColor: "#748E54"
    }
}

function Modal(props){
    
    var [text,setText] = useState("");

    return (
        <div id="modal" onClick={(e) => {
            if (e.target.id == "modal") {
                props.displayModal(false)
            }
        }}>
            {props.modalOpt.opt == "options"
                ? <Options deleteNote={props.deleteNote} deleteFolder={props.deleteFolder}
                    displayModal={props.displayModal} id={props.modalOpt.id}></Options>

                : <div id="modalContent">
                    <h3>Create Node</h3>
                    <input type="text" value={text} placeholder="Title" onChange={(e) => setText(e.target.value)}></input>
                    <div className="modalBtns">
                        
                    <button className="modalBtn" style={styles.cancel} onClick={() => props.displayModal(false)}>Cancel</button>
                    <button className="modalBtn" style={styles.accept} onClick={
                        props.modalOpt.folder ? () => {props.createFolder(text)
                                                      props.displayModal(false)}
                                              : () => {props.createNote(text)
                                                      props.displayModal(false)}
                    }>Create</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal;