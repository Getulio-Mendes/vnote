import React from "react";

var list = window.sqlite.all("SELECT * FROM test");

class App extends React.Component {
    render(){
        return (
            <div>Hello World</div>
            )
    }
}

export default App;