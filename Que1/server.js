const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8010;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});

app.post('/register', upload.array('profileImage', 3), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.send('Registration Done✅ successfully!!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
