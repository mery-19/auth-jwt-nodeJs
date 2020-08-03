const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.use(express.json());

router.post('/register',(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        pasword:req.body.password
    });

    User.create(req.body).then(user=>{
        res.send(user);
    }).catch(err=> res.status(400).send(err));

});

module.exports = router;