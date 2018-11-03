const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/feed', feedRoutes);

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(8080, () => console.log('Server running on http://localhost:8080'));
  })
  .catch(err => console.log(err));
