const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require("./models/User")
const { auth } = require("./middleware/auth")

const config = require('./config/key')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

// Connecting MongoDB using mongoose
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err))  


app.get('/', (req, res) => {
    // This is the response that is sent to the client when the url is /, or route
  res.send('Hello World!\nTesting NodeMon!')
})

app.post('/api/users/register', (req, res) => {
  // Recieve information from the client needed for Sign Up,
  // and add it to DB.

    const user = new User(req.body)
    
    // .save is a method from MongoDB, which inputs the data into the DB.
    // Returns whether failed or not.
    user.save((err, doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({success:true})
    })
})

app.post('/api/users/login', (req, res) => {
  // 1. Need to find the email address from the DB
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess : false,
        message : "Failed to find email."
      })
    }

    // 2. If the email exists, check if password matches
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({
          loginSuccess : false,
          message : "Wrong password"
        })
      }

      // 3. If credentials match, create token.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err)

        // Save the token to where? Cookie, or local storage. Still debated in industry.
        // We are basically saving the user.token as the name "x_auth"
        res.cookie("x_auth", user.token).status(200)
        .json({loginSuccess:true, userId: user._id, token: user.token})
      })

    })
  })
})

app.get('/api/users/auth', auth ,(req, res) => {
  // auth, the second parameter, deals with all the business logic. So if the code reaches
  // this point, that means that authentification has been successful.

  res.status(200).json({
    _id: req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email: req.user_email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth , (req, res) => {
  // Find the user thats trying to logout from the database, and delete the token.
  // Why? Because during register, the user wasn't given a token. Only when logging in
  // was the token created, so if the just delete that token, then login is now live.

  User.findOneAndUpdate({_id : req.user._id}, {token:""}, (err, user) => {
    if(err) return res.json({success: false, err})

    return res.json({success: true})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})