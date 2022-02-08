import React from "react";
import trash from "./img/trash.svg";
import options from "./img/more-horizontal.svg";

class Note extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="note" onClick={() => this.props.getText(this.props.id)}>
                <img src={options} className="icon" onClick={() => console.log("Option")}></img>
                {this.props.title}
                <img src={trash} className="icon" onClick={() => this.props.deleteNote(this.props.id)}></img>
            </div>
        )
    }
}

export default Note;