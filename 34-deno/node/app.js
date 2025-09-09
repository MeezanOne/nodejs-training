const bodyParser = require('body-parser');
const express = require('express');
const todoRoutes = require('./routes/todos')

const app = express();

app.use((req,res,next)=>{
    console.log('Some middleware!');
    next();
});

app.use(bodyParser.json());

app.use(todoRoutes)

app.listen(3000)