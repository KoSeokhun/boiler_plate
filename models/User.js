const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
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
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    //비밀번호를 암호화 시키는 과정
    var user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }

})

userSchema.methods.comparePassword = function (planePassword, cb) {
    //plainPassword: abcd1234, 암호화된 password: $2b$10$ScWIF2A4SeAwEqogeG2imuJqQ36nskHnOchANmSspaMNIfd0YueEe
    bcrypt.compare(planePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    //jsonwebtoken을 이용해서 token을 생성하기
    var user = this
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token
    //->
    //'secretToken' -> user._id
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err);
            cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {
    User
}