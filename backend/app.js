const express=require('express');
require('dotenv').config();
const cors=require('cors');
const dbConnection = require('./config/dbConnection');
//init app
const app=express();
const port=process.env.PORT || 5000;
//Middlewares
app.use(express.json());
app.use(cors());
//Routes
app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/posts',require('./routes/post.routes'));
app.use('/api/comments',require('./routes/comment.routes'));
app.use('/api/category',require('./routes/category.routes'));

//Connection to database
dbConnection();
//Running the server
app.listen(port,()=>console.log(`http://localhost:${port}`))

//
app.get('/',(req,res)=>{
    res.send("The brave coders")
}) 