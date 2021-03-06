//requires
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const tasks = require('./modules/routes/tasks.router');
//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));
//routes
app.use('/tasks', tasks);
//globals
const port = process.env.PORT || 5000;
//server up
app.listen(port, ()=>{
    console.log( 'server up on:', port );
})