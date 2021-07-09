const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength : 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role : {
        type: Number,
        default : 0
    },
    image : String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    // Encrypting the password
    var user = this;

    // Only when changing the password!
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            // Generating the salt
            if(err) return next(err)
    
            // With the generated salt, create a hash which is the encrypted password
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Replace the current password with hash, and send
                // to next.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User } // Allows the model 'User' to be able to used in other files.