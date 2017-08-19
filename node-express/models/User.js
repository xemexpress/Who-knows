var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../config').secret

var UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    image: String,
    hash: String,
    salt: String
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
}

UserSchema.methods.generateJWT = function(){
    var today = new Date()
    var exp = new Date(today)
    exp.setDate(today.getDate() + 60)
    
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, secret)
}

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        image: this.image || 'https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg',
        token: this.generateJWT()
    }
}

UserSchema.methods.toProfileJSONFor = function(){
    return {
        username: this.username,
        image: this.image || 'https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg'
    }
}

mongoose.model('User', UserSchema)