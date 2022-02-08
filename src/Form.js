import React,{useState} from "react";

function Form(props) {
    var [text,setText] = useState("New note");

    function handleChange(e){
        setText(e.target.value);
    }

    return (
        <>
        <input onChange={handleChange} value={text} placeholder="Note Title"></input>
        <button onClick={() => props.createNote(text)}>Create Note</button>
        </>
    )
}

export default Form;