//require your express
const express = require('express');
//read my env vars
require('dotenv').config();
const path = require('path');

const blogRoutes = require('./routes/api/blog.routes');
const appRoutes = require('./routes/app.routes');
//initialize your express app
const app = express();

//set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//global middlewars

//req data(forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static files
app.use('/', express.static(path.join(__dirname, 'public')));
//import app routes

//registering routes
app.use('/', appRoutes);
app.use('/api/v1', blogRoutes);
//create port or choose evn port
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`servers is runing http://localhost:${PORT}`);
});
