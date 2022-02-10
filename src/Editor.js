import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import "./Editor.css";

var timer = 0;

function Editor(props) {
  const [value, setValue] = useState(props.content);

  useEffect(() => {
    setValue(props.content);
  },[props.content])

  var modules = {
    toolbar: [
      [{ 'header': 1 }],[{ 'header': 2 }],
      ['bold', 'italic', 'blockquote'],
      [{ 'list': 'bullet' }],
      ['link'],
    ]
  }

  function handleChange(content){
    setValue(content);

    // only update when last key is pressed
    if(timer != -1){
      clearTimeout(timer);
      timer = setTimeout(() => {
        props.updateContent(content,props.id);
      },500) 
    }
  }

  return (
    <ReactQuill theme="bubble" value={value} onChange={handleChange} modules={modules} />
  );
}

export default Editor;