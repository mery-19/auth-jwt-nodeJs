const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {registerValidation,loginValidation} = require('../validate');
const bcrypt = require('bcrypt');
router.use(express.json());
dotenv.config();

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

router.post('/login', (req,res)=>{
     // validate
     const validation = loginValidation(req.body);
     if(validation.error){ 
         var error ='';
         for(var err in validation.error.details)
         {
             error += validation.error.details[err].message + '.\n'
         }
         res.status(400).send(error);
     }

    User.findOne({email: req.body.email})
    .then(async (user) => {
        if(!user)
        {
            res.status(400).send("email or password incorrect")
        } else {
            const compare = await bcrypt.compare(req.body.password, user.password);
            if(compare)
            {
                // create and aign token
                const token = jwt.sign({_id:user._id},process.env.SECRET_KEY);
                res.header('auth-token',token).send(token);
            } else {
                res.status(400).send("login failed");
            }
       
        }
    })
    .catch(err => res.send(err));
})


module.exports = router;