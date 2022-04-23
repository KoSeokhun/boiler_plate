const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

const bodyParser = require('body-parser')
const {
  User
} = require("./models/User")

const cookieParser = require('cookie-parser')

//application/x-www-form-urlencorded
app.use(bodyParser.urlencoded({
  extended: true
}))

//application/json
app.use(bodyParser.json())

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요! 반갑습니다.')
})

app.post('/register', (req, res) => {
  //회원가입시 Client가 입력한 데이터들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({
      success: false,
      err
    })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {
  //로그인시 Client가 입력한 email이 DB에 있는지 확인한다.
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력한 이메일에 해당하는 회원이 없습니다."
      })
    }

    //DB에 존재한다면 Client가 입력한 password가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀립니다."
        })
      //password가 일치한다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)
        //토큰을 cookie에 저장한다.
        res.cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id
          })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})