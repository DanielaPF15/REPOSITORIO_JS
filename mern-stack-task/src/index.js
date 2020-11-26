const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose }= require('./database') 

// Setting
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/task',require('./routes/task.routes'));

// Static files
app.use(express.static(path.join(__dirname,'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})