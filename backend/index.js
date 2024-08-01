const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/item.js')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json())
app.get('/', async (req, res) => {
    const response = await itemModel.find()
    return res.json({items: response})
})

connectDB()

app.post('/login', (req,res) => {
    const {email,password} = req.body
    itemModel.findOne({email: email})
    .then(user => {
        if(user) {
        if(user.password === password) {
            res.json('Success')
        }
        else {
            res.json("the password is incorrect")
        }
    }
    else {
        res.json('No such account exists');
    }
    })
})

app.post('/SignUp',(req,res) => {
    const{name,email,password} = req.body
    itemModel.findOne({email:email})
    .then(user => {
        if(user) {
            res.json('exists')
        }
        else {
            itemModel.create(req.body)
            return res.json('does not exist')
        }
    })
})

app.listen(3001, () => {
    console.log('app is running');
})