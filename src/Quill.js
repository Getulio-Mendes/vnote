import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor(props) {
  const [value, setValue] = useState(props.text);

  useEffect(() => {
    setValue(props.text);
  },[props.text])

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
  );
}

export default Editor;