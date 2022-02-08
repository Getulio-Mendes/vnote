import React from "react";
import Note from "./note"
import './styles.css';

class App extends React.Component{
    constructor(props){
        super(props);
        var nodes = window.sqlite.all("SELECT COUNT(id) FROM test");
        this.state= { 
            nodes: nodes
        };

        this.deleteNote = this.deleteNote.bind(this);
    }
    createElements(list) {
        var newList = [];
        list.forEach((item, i) => {
            let node = <Note key={i} id={item.id} text={item.text} deleteNote={this.deleteNote} />
            newList.push(node);
        });
        return newList;
    }
    createNote() {
        window.sqlite.run(`INSERT INTO test (text) VALUES ('New node')`);
        this.setState({ nodes: this.state.nodes + 1 });
    }
    deleteNote(id){
        window.sqlite.run(`DELETE FROM test WHERE id = ${id}`);
        this.setState({ nodes: this.state.nodes - 1 });
    }
    
    render() {
        var list = window.sqlite.all("SELECT * FROM test");
        var Nodes = this.createElements(list);
        return (
            <>
                <h3>Current Notes:</h3>
                <div className="noteList">{Nodes}</div>
                <button onClick={() => this.createNote()}>Create Note</button>
            </>
        )
    }
    
}

export default App;