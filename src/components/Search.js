import React, { useRef, useState } from "react";
import search from "../img/search.svg";
import "./Search.css";

function Search(props){

    var [query,setQuery] = useState('');
    var [up,setUp] = useState(false)

    const timer = useRef(0);
    const queryResult = useRef(0);

    function handleChange(e){
        setQuery(e.target.value);

        if (timer.current != -1) {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                if(e.target.value != ""){
                    queryResult.current = props.search(e.target.value);
                    setUp(true);
                }
                else{
                    setUp(false);
                }
            }, 500)
        }
    }

    function handleClick(id){
        props.getNote(id);
        setUp(false);
    }


    return (
        <>
        <div id="searchBar">
            <img src={search} id="search"></img>
            <input value={query} onChange={handleChange} id="searchField" placeholder="Seach a note..."></input>
        </div>
        <div id="searchContainer">
        {up && queryResult.current.map((item, i) => {
                    return <div key={i} className="searchResult" onClick={() => handleClick(item.id)}>
                            {item.title}
                            </div>
                })}
        </div>
        </>
    )
}

export default Search;