const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { UserModel, TodoModel } = require('./db');
const mongoose = require('mongoose');
const { auth, JWT_SECRET } = require('./auth');
app.use(express.json());

mongoose.connect("mongodb+srv://yashbansal2099_db_user:bhllahcBzDbvvuhW@cluster0.j42oqfd.mongodb.net/todo-yashbansal");

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    await UserModel.create({
        name : name,
        email : email,
        password : password
    })

    res.json({
        message: "You are signed up"
    })
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email : email,
        password : password
    })

    console.log(response);

    if(response){
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);
        res.json({
            token : token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: userId
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({userId : userId});

    res.json({
        todos
    })
});

app.listen(8080, (req, res) => {
    console.log("port is connected");
});