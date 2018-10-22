const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/anime');
let db = mongoose.connection;

db.on("error", () => {
  console.error("connection error")
});

db.once("open", (cb) => {
  console.log("Connection Succeeded");
});

app.get('/', (req, res) => {
  res.send('sinep');
});

app.listen(process.env.PORT || 8081);