const express = require('express');
const app = express();

app.use(express.json());

const users = []; // In-memory user storage for demonstration purposes

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

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
        const token = generateToken();
        user.token = token;
        res.send(token);
        console.log(users);
    }else{
        res.status(401).send({
            message : "Invalid Username or Password"
        });
    }
});


app.get('/me', (req, res) => {
    const token = req.headers.token;

    const user = users.find(u => u.token === token);
    if(user) {
        res.json({
            username : user.username
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