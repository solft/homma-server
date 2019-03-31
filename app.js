// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// DB 연결
const mongoose = require('mongoose');

// ROUTES
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => { console.log('Database is connected') })
  .catch((e) => { console.error(e) });


// 라우터
app.use('/api/posts', posts);


app.listen(port, () => {
  console.log(`listening on ${port}`)
})