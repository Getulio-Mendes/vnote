import React from "react";
import trash from "./img/trash.svg";
import options from "./img/more-horizontal.svg";

class Note extends React.Component{
    constructor(props){
        super(props);
        this.deleteNote = this.deleteNote.bind(this);
    }
    deleteNote(e){
        e.stopPropagation();
        this.props.deleteNote(this.props.id)
    }
    render() {
        return (
            <div className="note" onClick={() => this.props.getNote(this.props.id)}>
                <img src={options} className="icon" onClick={() => console.log("Option")}></img>

                <span>{this.props.title}</span>

                <img src={trash} className="icon" onClick={this.deleteNote}></img>
            </div>
        )
    }
}

export default Note;