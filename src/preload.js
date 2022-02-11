const { contextBridge } = require('electron');
const sqlite = require('better-sqlite3');

const db = new sqlite("test.db",{ verbose: console.log });
var stmt = db.prepare(`CREATE TABLE IF NOT EXISTS test( 
                      id INTEGER PRIMARY KEY NOT NULL,
                      title TEXT NOT NULL DEFAULT 'New Note',
                      text TEXT DEFAULT 'Note Content',
                      date DATE DEFAULT (DATETIME('now','localtime')),
                      dir INTEGER DEFAULT 0,
                      folder BOOLEAN DEFAULT false
                      )`)
stmt.run();

contextBridge.exposeInMainWorld('sqlite',{
  all(str,dir){
    let stmt = db.prepare(str);
    return stmt.all(dir);
  },
  createNote(title,dir) {
    let stmt = db.prepare("INSERT INTO test (title,dir) VALUES (?,?)");
    return stmt.run(title,dir);
  },
  createFolder(title,dir) {
    let stmt = db.prepare("INSERT INTO test (title,dir,folder) VALUES (?,?,true)");
    return stmt.run(title,dir);
  },
  getNote(id) {
    let stmt = db.prepare("SELECT text,title FROM test WHERE id = ?");
    return stmt.get(id);
  },
  deleteNote(id){
    let stmt = db.prepare("DELETE FROM test WHERE id=?");
    return stmt.run(id);
  },
  updateContent(content,id){
    let stmt = db.prepare("UPDATE test SET text = ? WHERE id=?");
    return stmt.run(content, id);
  },
  updateTitle(title,id){
    let stmt = db.prepare("UPDATE test SET title = ? WHERE id=?");
    return stmt.run(title, id);
  }
});
