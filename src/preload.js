const { contextBridge } = require('electron');
const sqlite = require('better-sqlite3');

const db = new sqlite("test.db",{ verbose: console.log });
var stmt = db.prepare("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL,msg TEXT)")
stmt.run();


contextBridge.exposeInMainWorld('sqlite',{
  all(str){
    let stmt = db.prepare(str);
    return stmt.all();
  },
  run(str){
    let stmt = db.prepare(str);
    return stmt.run();
  }
});
