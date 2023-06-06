const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')
const conversationRoutes = require('./routes/conversation')
const bodyParser = require('body-parser')
const io = require('socket.io-client')
const socket = io('https://threezeroclubconnect.herokuapp.com')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})

const app = express()

app.use(fileUpload({
    useTempFiles: true
}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGO_INFO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

app.use('/user', userRoutes)
app.use('/conversation', conversationRoutes)
app.get('/status', (req, res) => {
    socket.emit('showUsers', null)
    res.send('done')
})



module.exports = app