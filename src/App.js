import React from "react";
import Note from "./Note"
import Form from "./Form";
import Editor from "./Quill";
import './styles.css';

class App extends React.Component{
    constructor(props){
        super(props);
        var nodes = window.sqlite.all("SELECT COUNT(id) FROM test");
        this.state= { 
            nodes: nodes,
            text: "Note Content"
        };

        this.deleteNote = this.deleteNote.bind(this);
        this.createNote = this.createNote.bind(this);
        this.getText = this.getText.bind(this);
    }
    createElements(list) {
        var newList = [];
        list.forEach((item, i) => {
            let node = <Note key={i} id={item.id} title={item.title}
                        deleteNote={this.deleteNote} getText={this.getText}/>
            newList.push(node);
        });
        return newList;
    }
    createNote(title) {
        if(title != undefined && title != null){
            window.sqlite.run("INSERT INTO test (title) VALUES (?)",title);
            this.setState({ nodes: this.state.nodes + 1 });
        }else{
            console.error("Invalid title");
        }
    }
    getText(id){
       let text = window.sqlite.get("SELECT text FROM test WHERE id = ?",id);
       if(this.state.text == text.text){
           // enforce editor update even whem the content is the same
           this.setState({ text: text.text + ' ' }); 
       }
       else{
           this.setState({ text: text.text}); 
       }
    }
    deleteNote(id){
        window.sqlite.run(`DELETE FROM test WHERE id = ${id}`);
        this.setState({ nodes: this.state.nodes - 1 });
    }
    
    render() {
        var list = window.sqlite.all("SELECT * FROM test");
        console.log(list);
        var Nodes = this.createElements(list);
        return (
            <>
                <h3>Current Notes:</h3>
                <div className="noteList">{Nodes}</div>
                <Form createNote={this.createNote}></Form>
                <Editor text={this.state.text}></Editor>
            </>
        )
    }
    
}

export default App;