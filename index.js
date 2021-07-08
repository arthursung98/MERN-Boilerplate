const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Connecting MongoDB using mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://arthursung98:wasp0810@reactproject.q4zeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err))  


app.get('/', (req, res) => {
    // This is the response that is sent to the client when the url is /, or route
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  // Recieve information from the client needed for Sign Up,
  // and add it to DB.

    const user = new User(req.body)

    // .save is a method from MongoDB, which inputs the data into the DB.
    user.save((err, doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({
        success:true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})