require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

const api = require('./routes/api')

//DB Config
const db = process.env.DB_URI

// Internal error mongoose
mongoose.set('useCreateIndex', true);

(async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true })
        console.log('MongoDB connected')
    } catch(err) {
        console.log(err)
    }
})();

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//User Routes
app.use('/api', api);

app.get('/', (req,res) => {
    res.send({
        express: 'TEST RESPONSE'
    })
})

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})

