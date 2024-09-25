const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const responseSchema = new mongoose.Schema({
    responses: Array,
    timestamp: Date
});

const Response = mongoose.model('Response', responseSchema);

app.post('/submit', (req, res) => {
    const newResponse = new Response(req.body);
    newResponse.save().then(() => res.status(200).send('Form submitted successfully'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});