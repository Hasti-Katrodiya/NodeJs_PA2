const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const FileStore = require('session-file-store')(session);

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: './Data' })
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        if (username == 'Hasti' && password == 'Hasti@123') {
            req.session.username = 'Hasti';
            return res.redirect('/Home');
        } else {
            res.send("Invalid Username and Password !!!");
        }
    } else {
        res.send("Enter details first !!!");
    }
});

app.get('/Home', (req, res) => {
    if (req.session.username) {
        res.send('Welcome ' + req.session.username + " !!!");
    }
});

app.listen(8010, () => console.log("server is listening !!"));