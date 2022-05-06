const Joi  = require('joi');

const registerationValidation =(data)=>{
    const schema = Joi.object({
        username:Joi.string().min(2).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
        number:Joi.number().min(10).required()
    })
    return schema.validate(data); 
}

const loginValidation = (data)=>{
    const schema = Joi.object({
    number:Joi.number().min(10).required()
    });
    return schema.validate(data);
}

module.exports = {registerationValidation,loginValidation}