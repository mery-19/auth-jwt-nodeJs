const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect( process.env.DB_CONNECT
,{useNewUrlParser: true},
()=>console.log("connect successfully to db"));

const authRouter = require('./routes/auth');

//app midlware
app.use('/api/user',authRouter);

app.listen(3000, ()=>{
console.log("server runing on http://localhost:3000/");
})