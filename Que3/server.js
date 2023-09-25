const express = require('express');
const session = require('express-session');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient({
    host: 'localhost',
    port: 8080,
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));


app.get('/set-session', (req, res) => {
    req.session.username = 'user123';
    res.send('Session Done !!');
});

app.get('/get-session', (req, res) => {
    const username = req.session.username || 'Not set';
    res.send(`Session variable: ${username}`);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
