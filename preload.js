const { contextBridge } = require('electron');
const sqlite = require('better-sqlite3');
const db = new sqlite(":memory:",{ verbose: console.log });

var stmt = db.prepare("CREATE TABLE test (id INTEGER PRIMARY_KEY,msg TEXT)")
stmt.run();

stmt = db.prepare("INSERT INTO test VALUES (?,?),(?,?)");
stmt.run(1,"Hello",2,"World");

stmt = db.prepare("SELECT * FROM test");
const queryResult = stmt.all()
console.log("Result: ",queryResult);

contextBridge.exposeInMainWorld('sqlite',{
  all(str){
    let stmt = db.prepare(str);
    return stmt.all();
  }
});

window.addEventListener('DOMContentLoaded', () => {
})
