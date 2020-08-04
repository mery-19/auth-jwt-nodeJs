const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {registerValidation} = require('../validate');
const bcrypt = require('bcrypt');
router.use(express.json());

router.post('/register',(req,res)=>{

    // validate
    const validation = registerValidation(req.body);
    if(validation.error){ 
        var error ='';
        for(var err in validation.error.details)
        {
            error += validation.error.details[err].message + '.\n'
        }
        res.status(400).send(error);
    }

    // check if the user is already in database
    User.findOne({email: req.body.email})
    .then(async (user) => {
        if(user)
        {
            res.status(400).send("already exist")
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password,salt);
            console.log(salt);
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            };
            User.create(newUser).then(user=>{
                res.send(user);
            }).catch(err=> res.status(400).send(err));
        }
    })
    .catch(err => res.send(err));
});


module.exports = router;