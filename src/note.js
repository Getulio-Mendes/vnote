import React from "react";
import trash from "./img/trash.svg";
import options from "./img/more-horizontal.svg";

class Note extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="note">
                <img src={options} className="icon" onClick={() => console.log("Option")}></img>

                <span onClick={() => this.props.getText(this.props.id)}>{this.props.title}</span>

                <img src={trash} className="icon" onClick={() => this.props.deleteNote(this.props.id)}></img>
            </div>
        )
    }
}

export default Note;