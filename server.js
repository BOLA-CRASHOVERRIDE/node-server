const express = require("express")
const app = express()
const morgan = require("morgan")
const helmet = require("helmet")
require ("dotenv").config()

//app level middleware
app.use(morgan('common'))
app.use(express.json())
app.use(morgan())
app.use(express.urlencoded({extended: true}))

//webhooks
const handleInbound = require('./webhooks/inbound')
const handleStatus = require('./webhooks/status')
app.use('/webhooks', handleInbound)
app.use('/webhooks', handleStatus)

//literal listener
const port = process.env.PORT || 3000

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`server up on port ${port}`)
    }
})