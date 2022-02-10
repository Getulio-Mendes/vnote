const { contextBridge } = require('electron');
const sqlite = require('better-sqlite3');

const db = new sqlite("test.db",{ verbose: console.log });
var stmt = db.prepare(`CREATE TABLE IF NOT EXISTS test 
                     (id INTEGER PRIMARY KEY NOT NULL,
                      title TEXT NOT NULL DEFAULT 'New Note',
                      text TEXT DEFAULT 'Note Content',
                      date DATE DEFAULT (DATETIME('now','localtime'))
                      )`)
stmt.run();


contextBridge.exposeInMainWorld('sqlite',{
  all(str,value){
    let stmt = db.prepare(str);

    if(value != null){
      return stmt.all(value);
    }
    else{
      return stmt.all();
    }
  },
  run(str,value1){
    let stmt = db.prepare(str);

    if (value1 != null) {
      return stmt.run(value1);
    }
    else{
      return stmt.run();
    }
  },
  get(str, value) {
    let stmt = db.prepare(str);

    if (value != null) {
      return stmt.get(value);
    }
    else{
      return stmt.get();
    }
  },
  update(str,content,id){
    let stmt = db.prepare(str);

    if (content != null && id != null) {
      return stmt.run(content,id);
    }
    else{
      return stmt.run();
    }
  },
});
