const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        min: 6
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;
