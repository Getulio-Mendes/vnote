import React from "react";
import Note from "./components/Note"
import Form from "./components/Form";
import Editor from "./components/Editor";
import Search from "./components/Search";
import Map from "./components/Map";
import './components/styles.css';

class App extends React.Component{
    constructor(props){
        super(props);
        var nodesCount = window.sqlite.all("SELECT COUNT(id) FROM test WHERE dir = ?",'0');
        this.state= { 
            nodes: nodesCount,
            dir: "0",
            content: "Note Content",
            id: 0,
            title: "New Note",
            map: false
        };

        this.deleteNote = this.deleteNote.bind(this);
        this.createNote = this.createNote.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.getNote = this.getNote.bind(this);
        this.getDir = this.getDir.bind(this);
        this.goBack = this.goBack.bind(this);
        this.search = this.search.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.actvateMap = this.actvateMap.bind(this);
    }

    actvateMap(){
        this.setState({map:!this.state.map});
    }

    createNote() {
        let dir = this.state.dir.split('/');
        window.sqlite.createNote("New Note",dir[dir.length-1]);
        this.setState({ nodes: this.state.nodes + 1 });
    }
    createFolder() {
        let dir = this.state.dir.split('/');
        window.sqlite.createFolder("New Folder",dir[dir.length-1]);
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
    getDir(id){
        let newDir = this.state.dir + `/${id}`;
        this.setState({dir:newDir});
    }
    goBack(){
        if(this.state.dir != '0'){
            let dirArray = this.state.dir.split('/');
            dirArray.pop();
            this.setState({ dir: dirArray.join('/') });
        }
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
            this.setState({title});
        }
    }
    deleteNote(id){
        window.sqlite.deleteNote(id);
        this.setState({ nodes: this.state.nodes - 1 });
    }
    search(query){
        let list = window.sqlite.search(query);
        return list;
    }

    render() {
        let dir = this.state.dir.split('/');
        var list = window.sqlite.all("SELECT * FROM test WHERE dir = ?",dir[dir.length -1]);
        return (
            <>
                <Search search={this.search} getNote={this.getNote}/>
                {!this.state.map &&
                <div className="noteList">
                    {list.map((note) => {
                       return <Note key={note.id} id={note.id} title={note.title} folder={note.folder}
                              deleteNote={this.deleteNote} getNote={this.getNote} getDir={this.getDir}/>
                    })}
                </div>
                }

                {this.state.map && 
                    <Map getNote={this.getNote}/>
                }
                <div id="actions">
                    <button onClick={this.createNote}>Create Note</button>
                    <button onClick={this.createFolder}>Create Folder</button>
                    <button onClick={this.goBack}>Go back</button>
                    <button onClick={this.actvateMap}>Map</button>
                </div>
                {this.state.id != 0 && 
                    <>
                        <Form title={this.state.title} id={this.state.id} updateTitle={this.updateTitle}></Form>
                        <Editor content={this.state.content} id={this.state.id} updateContent={this.updateContent}></Editor>
                    </>
                }
            </>
        )
    }
    
}

export default App;