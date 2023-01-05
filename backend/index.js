const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'yottol-task'
})

app.post('/register', (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    db.query('INSERT INTO users (name,email) VALUES (?,?)',[username, email],(err,result)=>{
        console.log(err);
    });
})

app.post('/login', (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    console.log(username, email);
    db.query('SELECT * FROM users WHERE name = ? AND email = ?',[username, email],(err,result)=>{
        if(err){
        console.log(err);
        }

        if(result){
            res.send(result)
        }
        else{
            res.send({message: 'Please register first.'})
        }
    });
})

app.get('/', (req,res)=>{
    res.send('Yottol task server running');
})

app.listen(port, ()=>{
    console.log('Server running on port', port);
})
