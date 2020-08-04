// validation model
const joi = require('@hapi/joi');

const registerValidation = (data)=>{

    const schema = joi.object({
        name : joi.string().min(6).required(),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(data,{ abortEarly: false });
}

const loginValidation = (data)=>{

    const schema = joi.object({
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(data,{ abortEarly: false });
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;