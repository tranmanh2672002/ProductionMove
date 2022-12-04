const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const route = require('./routes');


app.use(cors());
app.use(express.json());

const PORT = 5001;

try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
} catch (err) {
    console.log(err);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

route(app)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})