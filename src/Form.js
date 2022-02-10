import React,{useEffect, useState} from "react";

var timer = 0;

function Form(props) {
    var [text,setText] = useState("New note");

    useEffect(() => {
        setText(props.title);
    },[props.title])

    function handleChange(e){
        setText(e.target.value);
        if (timer != -1) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                props.updateTitle(text, props.id);
            }, 500) 
        }
    }

    return (
        <>
            <button onClick={props.createNote}>Create Note</button>
            <input onChange={handleChange} value={text}></input>
        </>
    )
}

export default Form;