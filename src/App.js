import React from "react";
import Note from "./Note"
import Form from "./Form";
import Editor from "./Editor";
import './styles.css';

class App extends React.Component{
    constructor(props){
        super(props);
        var nodesCount = window.sqlite.all("SELECT COUNT(id) FROM test");
        this.state= { 
            nodes: nodesCount,
            content: "Note Content",
            id: 0,
            title: "New Note"
        };

        this.deleteNote = this.deleteNote.bind(this);
        this.createNote = this.createNote.bind(this);
        this.getNote = this.getNote.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
    }
    createElements(list) {
        var newList = [];
        list.forEach((item, i) => {
            let node = <Note key={i} id={item.id} title={item.title}
                        deleteNote={this.deleteNote} getNote={this.getNote}/>
            newList.push(node);
        });
        return newList;
    }
    createNote() {
        window.sqlite.createNote("New Note");
        this.setState({ nodes: this.state.nodes + 1 });
    }
    getNote(id){
       let {text,title} = window.sqlite.getNote(id);

       if(this.state.text == text){
           // enforce editor update even whem the content is the same
           text = text + " "; 
       }
        this.setState({
            content: text,
            id: id,
            title: title
        }); 
    }
    updateContent(content,id){
        // prevent updating diferent note content
        if(id == this.state.id){
            window.sqlite.updateContent(content, this.state.id);
        }
    }
    updateTitle(title,id){
        if(id == this.state.id){
            window.sqlite.updateTitle(title, this.state.id);
        }
    }
    deleteNote(id){
        window.sqlite.deleteNote(id);
        this.setState({ nodes: this.state.nodes - 1 });
    }

    render() {
        var list = window.sqlite.all("SELECT * FROM test");
        var Nodes = this.createElements(list);
        return (
            <>
                <div className="noteList">{Nodes}</div>

                <Form createNote={this.createNote} title={this.state.title} id={this.state.id} updateTitle={this.updateTitle}></Form>
                <Editor content={this.state.content} id={this.state.id} updateContent={this.updateContent}></Editor>
            </>
        )
    }
    
}

export default App;