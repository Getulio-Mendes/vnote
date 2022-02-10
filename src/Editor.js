import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

var timer = 0;

function Editor(props) {
  const [value, setValue] = useState(props.text);

  useEffect(() => {
    setValue(props.text);
  },[props.text])

  function handleChange(content){
    setValue(content);

    // only update when last key is pressed
    if(timer != -1){
      clearTimeout(timer);
      timer = setTimeout(() => {
        props.updateNote(content);
      },500) 
    }
  }

  return (
    <ReactQuill theme="snow" value={value} onChange={handleChange}/>
  );
}

export default Editor;