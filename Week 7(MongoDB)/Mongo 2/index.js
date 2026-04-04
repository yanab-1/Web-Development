const bcrypt = require('bcrypt');
const express = require('express');
require('dotenv').config();
const app = express();
const jwt = require('jsonwebtoken');
const { UserModel, TodoModel } = require('./db');
const mongoose = require('mongoose');
const { auth, JWT_SECRET } = require('./auth');
app.use(express.json());
const { z } = require('zod');

mongoose.connect(process.env.Mongo_URL);

app.post("/signup", async function(req, res) {
    try {
        const requireBody = z.object({
            email: z.string().min(3).max(100).email(),
            name: z.string().min(3).max(100),
            password: z
                .string()
                .min(5)
                .max(50)
                .regex(/[A-Z]/, "password must contain upper case letter")
                .regex(/[a-z]/, "password must contain lower case letter")
                .regex(
                    /[!@#$%^&*()_<>?:]/,
                    "password must contain any special character"
                )
        });
        // const parsedDataWithSuccess = requireBody.Parse(req.body); It throws error if fails
        const parsedDataWithSuccess = requireBody.safeParse(req.body); // it gives an object

        if (!parsedDataWithSuccess.success) {
            return res.status(400).json({
                message: "Incorrect format",
                error: parsedDataWithSuccess.error
            });
        }

        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });

        res.json({
            message: "You are signed up"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error while signing up"            
        })
    }
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email : email
    })

    const passwordMatch = bcrypt.compare(password, response.password);

    console.log(response);

    if(response && passwordMatch){
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