import React, { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import "./Editor.css";


function Editor(props) {
  const [value, setValue] = useState(props.content);
  const timer = useRef(0);

  const modules = {
    toolbar: [
      [{ 'header': 1 }],[{ 'header': 2 }],
      ['bold', 'italic', 'blockquote'],
      [{ 'list': 'bullet' }],
      ['link'],
    ]
  }

  useEffect(() => {
    setValue(props.content);
  }, [props.content])

  function handleChange(content){
    setValue(content);

    // only update when last key is pressed
    if(timer.current != -1){
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        props.updateContent(content,props.id);
      },500) 
    }
  }

  return (
    <ReactQuill theme="bubble" value={value} onChange={handleChange} modules={modules} />
  );
}

export default Editor;