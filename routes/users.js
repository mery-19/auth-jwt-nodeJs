const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {auth} = require('./verify');
router.use(express.json());

router.get('/',auth,(req,res)=>{
User.find({})
.then(users=>res.send(users))
.catch(err=>res.status(400).send(err))
})

module.exports = router;