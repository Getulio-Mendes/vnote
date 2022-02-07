import React from "react";
import './styles.css';

function createNodes(list) {
    var newList = [];
    list.forEach((item, i) => {
        let node = <p key={i}>{item.msg}</p>
        newList.push(node);
    });
    console.log(list);
    return newList;
}

class App extends React.Component{
    constructor(props){
        super(props);
        var nodes = window.sqlite.all("SELECT COUNT(id) FROM test");
        this.state= { 
            nodes: nodes
        };
    }
    createNote() {
        let id = Math.random() * 100;
        window.sqlite.run(`INSERT INTO test (msg) VALUES ('New node')`);
        this.setState({ nodes: this.state.nodes + 1 });
    }
    
    render() {
        var list = window.sqlite.all("SELECT * FROM test");
        var Nodes = createNodes(list);
        return (
            <>
                <h3>Current Notes:</h3>
                <div>{Nodes}</div>
                <button onClick={() => this.createNote()}>Create Note</button>
            </>
        )
    }
    
}

export default App;