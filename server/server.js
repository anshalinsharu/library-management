
const express = require("express");
// const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "librarydb"
});

//register

app.post('/register',(req,res)=>{
    console.log(req.body);
    const sql="INSERT INTO registertable(name,email,password,role) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("ERROR");
        }
        return res.json(data);
    })

})

//login

app.post('/login',(req,res)=>{
    const sql="SELECT * FROM registertable WHERE email = ? AND password = ?";
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        let role=req.body.role;
        if(err){
            return res.json("ERROR");
        }
        if(role==="admin"){
            return res.json("ADMIN");
        }
        if(role==="normaluser"){
            return res.json("USER");
        }
        else{
            return res.json("login Failure");
        }
    })
})


app.post('/addbook',(req,res)=>{
    console.log(req.body.data);
    const sql="INSERT INTO libdata(title,author,subject,publishdate) VALUES (?)";
    const values=[
        req.body.title,
        req.body.author,
        req.body.subject,
        req.body.publishdate,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("ERROR IN INVENTORYDB");
        }
        return res.json(data);
    })
})


app.get('/displaybooks', (req, res) => {
    const sql = "SELECT * FROM libdata";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching inventory data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});


app.listen(8080, () => {
    console.log("listening in 8080");
});