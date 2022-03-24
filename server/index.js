const express = require("express");
const db = require('./config/db')

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json())

app.use(cors());


app.get("/api/get", (req,res)=>{
    db.query("SELECT * FROM todo_task WHERE is_finished=0", (err, result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});

app.get("/api/get_ddl", (req,res)=>{
    db.query("SELECT * FROM ddl", (err, result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});


app.get("/api/get_finished", (req,res)=>{
    db.query("SELECT * FROM todo_task WHERE is_finished=1", (err, result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});


app.post("/api/insert", urlencodedParser, (req,res)=>{
    const data = req.body;
    db.query("INSERT INTO todo_task (title,text,date,time,tags,is_finished) VALUES (?,?,?,?,?,?)",
            [data.title, data.text, data.date, data.time, data.tags.join(" "), false],
            (err, result) => {
            if(err) {
                console.log(err)
            } 
            res.send(result)
        });   
});

app.post("/api/insert_ddl", urlencodedParser, (req,res)=>{
    const data = req.body;
    db.query("INSERT INTO ddl (title,date,timeHs,tags) VALUES (?,?,?,?)",
            [data.title, data.date, data.timeHs, data.tags.join(" ")],
            (err, result) => {
            if(err) {
                console.log(err)
            } 
            res.send(result)
        });   
});

app.post("/api/update", (req,res)=>{
    const data = req.body;
    db.query("UPDATE todo_task set title=?, text=?, date=?, time=?, tags=? WHERE id=?",
            [data.title, data.text, data.date, data.time, data.tags.join(" "), data.id],
            (err, result) => {
            if(err) {
                console.log(err)
            } 
            res.send(result)
        });   
});

app.post("/api/update_ddl", (req,res)=>{
    const data = req.body;
    db.query("UPDATE ddl set title=?, date=?, timeHs=?, tags=? WHERE id=?",
            [data.title, data.date, data.timeHs, data.tags.join(" "), data.id],
            (err, result) => {
            if(err) {
                console.log(err)
            } 
            res.send(result)
        });   
});

app.post("/api/delete", (req,res)=>{
    db.query("DELETE FROM todo_task WHERE id=?", [req.body.id],
            (err, result) => {
            if(err) {
                console.log(err)
            } 
            res.send(result)
        });   
});

app.post("/api/delete_ddl", (req,res)=>{
    db.query("DELETE FROM ddl WHERE id=?", [req.body.id],
            (err, result) => {
            if(err) {
                console.log(err)
            } 
            res.send(result)
        });   
});


app.post("/api/setIsFinished", (req, res) => {
    db.query("UPDATE todo_task set is_finished=1 WHERE id=?", [req.body.id],
        (err, result) => {
            if(err) {
                console.log(err)
            } 
            res.send(result)
        });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


