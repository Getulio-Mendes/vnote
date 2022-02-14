import React from "react";
import Note from "./components/Note"
import Form from "./components/Form";
import Editor from "./components/Editor";
import Search from "./components/Search";
import Map from "./components/Map";
import Actions from "./components/Actions";
import './components/styles.css';

class App extends React.Component{
    constructor(props){
        super(props);
        var nodesCount = window.sqlite.all("SELECT COUNT(id) FROM test WHERE dir = ?",'0');
        this.state= { 
            nodes: nodesCount,
            dir: "0",
            path: ":",
            content: "Note Content",
            id: 0,
            title: "New Note",
            map: false
        };

        this.deleteNote = this.deleteNote.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this);
        this.createNote = this.createNote.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.getNote = this.getNote.bind(this);
        this.getDir = this.getDir.bind(this);
        this.getMap = this.getMap.bind(this);
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
        window.sqlite.createNote("New Note",this.state.dir);
        this.setState({ nodes: this.state.nodes + 1 });
    }
    createFolder() {
        window.sqlite.createFolder("New Folder",this.state.dir);
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
    getDir(id,title){
        let newDir = this.state.dir + `/${id}`;
        let newPath = this.state.path + `/${title}`;
        this.setState({dir:newDir,path:newPath});
    }
    getMap(){
        return window.sqlite.getMap();
    }
    goBack(){
        if(this.state.dir != '0'){
            let dirArray = this.state.dir.split('/');
            let pathArray = this.state.path.split('/');
            dirArray.pop();
            pathArray.pop();
            var newDir = dirArray.join('/')
            var newPath = pathArray.join('/')

            this.setState({ dir: newDir, path: newPath });
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
    deleteFolder(id){
        window.sqlite.deleteFolder(id);
        this.setState({ nodes: this.state.nodes - 1 });
    }
    search(query){
        let list = window.sqlite.search(query);
        return list;
    }

    render() {
        var list = window.sqlite.all("SELECT * FROM test WHERE dir = ?",this.state.dir);
        return (
            <>
                <Search search={this.search} getNote={this.getNote}/>
                <div id="Path">{this.state.path}</div>

                {!this.state.map &&
                <div className="noteList">
                    {list.map((note) => {
                       return <Note key={note.id} id={note.id} title={note.title} folder={note.folder}
                              deleteNote={this.deleteNote} deleteFolder={this.deleteFolder} getNote={this.getNote} getDir={this.getDir}/>
                    })}
                </div>
                }

                {this.state.map && 
                    <Map getNote={this.getNote} getMap={this.getMap}/>
                }

                <Actions createFolder={this.createFolder} createNote={this.createNote}
                         actvateMap={this.actvateMap} goBack={this.goBack}/>

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