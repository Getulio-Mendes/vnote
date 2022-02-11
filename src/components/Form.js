import React,{useEffect, useRef, useState} from "react";


function Form(props) {
    var [text,setText] = useState("New note");
    const timer = useRef(0);

    useEffect(() => {
        setText(props.title);

    },[props.title])

    function handleChange(e){
        setText(e.target.value);

        if (timer.current != -1) {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                props.updateTitle(e.target.value, props.id);
            }, 500) 
        }
    }

    return (
        <>
            <input onChange={handleChange} value={text}></input>
        </>
    )
}

export default Form;