const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yashlovecoding';
const app = express();
app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {

    const { username, password } = req.body;
    // Logic to handle user signup
    users.push({
        username : username,
        password : password
    });

    res.json({
        message : "You are signed in"
    })

    console.log(users);
});


app.post("/signin", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        const token = jwt.sign({
            username : user.username
        }, JWT_SECRET);
        res.json({
            token : token
        });
        console.log(users);
    }else{
        res.status(401).send({
            message : "Invalid Username or Password"
        });
    }
});


app.get('/me', (req, res) => {
    const token = req.headers.token; // jwt
    const decodedInformation = jwt.verify(token, JWT_SECRET);
    const username = decodedInformation.username;
    const user = users.find(u => u.username === username);
    if(user) {
        res.json({
            username : user.username,
            password : user.password
        });
    }
    else{
        res.json({
            message : "Invalid Token"
        })
    }
})


app.listen(8080, () => {
    console.log("Server connected at port : 8080");
});