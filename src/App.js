import React from "react";
import Note from "./components/Note"
import Form from "./components/Form";
import Editor from "./components/Editor";
import Search from "./components/Search";
import Map from "./components/Map/Map";
import Modal from "./components/Modal/Modal";
import Actions from "./components/Actions";
import './components/styles.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state= { 
            nodes: window.sqlite.getNumberOfNodes('0'),
            dir: "0",
            path: ":",
            content: "Note Content",
            id: 0,
            title: "New Note",
            map: false,
            modal: false
        };

        this.deleteNote = this.deleteNote.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this);
        this.createNote = this.createNote.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.createSeparator = this.createSeparator.bind(this);
        this.getNoteList = this.getNoteList.bind(this);
        this.getNote = this.getNote.bind(this);
        this.getDir = this.getDir.bind(this);
        this.getMap = this.getMap.bind(this);
        this.goBack = this.goBack.bind(this);
        this.search = this.search.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.moveNode = this.moveNode.bind(this);
        this.actvateMap = this.actvateMap.bind(this);
        this.displayModal = this.displayModal.bind(this);
    }

    actvateMap(){
        this.setState({map:!this.state.map});
    }

    displayModal(opt,id,folder){
        if(opt == false){
            this.setState({ modal: false, id:0 });
        }
        else{
            this.setState({ modal: { opt, id, folder } });
        }
    }

    createNote(title) {
        window.sqlite.createNote(title,this.state.dir,this.state.nodes);
        this.setState({ nodes: this.state.nodes + 1 });
    }
    createFolder(title) {
        window.sqlite.createFolder(title,this.state.dir,this.state.nodes);
        this.setState({ nodes: this.state.nodes + 1 });
    }
    createSeparator() {
        window.sqlite.createSeparator(this.state.nodes);
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
        let nodes = window.sqlite.getNumberOfNodes(newDir);
        this.setState({dir:newDir,path:newPath,nodes:nodes});
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
    updateColor(color,id){
        window.sqlite.updateColor(color,id);
        this.forceUpdate();
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

    moveNode(pos,id,oldPos){
       // account for placeholder
       if(pos < oldPos){
           window.sqlite.moveNode(pos, id, oldPos);
       }
       else{
           window.sqlite.moveNode(pos-1, id, oldPos);
       }
       this.forceUpdate();
    }

    getNoteList(list){
        let newList = [];

        for(let i=0; i < list.length;i++){
            for (let j=0; j < list.length; j++) {
                if (i == list[j].pos) {
                    let note = list[j];
                    newList.push(
                        <Note key={note.id} id={note.id} title={note.title} folder={note.folder} displayModal={this.displayModal}
                            getNote={this.getNote} getDir={this.getDir} moveNode={this.moveNode} color={note.color} separator={note.separator} />
                    )
                }
            }
        }
        return newList; 
    }

    render() {
        var list = window.sqlite.all("SELECT * FROM test WHERE dir = ?",this.state.dir);
        return (
            <>
                {this.state.modal && 
                    <Modal displayModal={this.displayModal} modalOpt={this.state.modal}
                    createNote={this.createNote} createFolder={this.createFolder} updateColor={this.updateColor}
                    deleteNote={this.deleteNote} deleteFolder={this.deleteFolder}/>
                }
                <Search search={this.search} getNote={this.getNote}/>
                <div id="Path">{this.state.path}</div>

                {!this.state.map &&
                <div className="noteList">
                  {this.getNoteList(list)}
                </div>
                }

                {this.state.map && 
                    <Map getNote={this.getNote} getMap={this.getMap} nodeCount={this.state.nodes}/>
                }

                <Actions displayModal={this.displayModal} createSeparator={this.createSeparator} actvateMap={this.actvateMap} goBack={this.goBack}/>

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