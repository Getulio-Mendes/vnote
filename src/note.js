import React from "react";

class Note extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="note">
                {this.props.text}
                <span onClick={() => this.props.deleteNote(this.props.id)}>D</span>
            </div>
        )
    }
}

export default Note;