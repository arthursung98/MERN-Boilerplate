const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

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

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword waspo0810
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    // Using jsonwebtoken, create a token.
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token

    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchema.methods.findByToken = function(token, cb) {
    var user = this;

    // Decode token.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // decoded at this point is basically the userId. Now access the DB with userId,
        // and see if the token in the DB matches the token from Client.

        user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
            if(err) return cb(err)

            return cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User } // Allows the model 'User' to be able to used in other files.