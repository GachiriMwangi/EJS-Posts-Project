//Create a user model. 
//Name, email password, confirm password, timestamps. 

const mongoose = require('mongoose') 

//Create a schema 

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please insert your name.']
    }, 
    email: {
        type: String, 
        required: [true, 'Please input an email.'], 
    }, 
    password: {
        type: String, 
        required: [true, 'Please insert a password.']
    }, 
    password2: {
        type: String, 
        required: [true, 'Please insert a confirmation password.']
    }
},
    {
       timestamps: true 
    }
)

module.exports = mongoose.model('users', userSchema)